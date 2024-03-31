import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { discordOAuthClient } from "@/helpers/oauth";
import { signJwt } from "@/helpers/jwt";
import { cookies } from "next/headers";
import { z } from "zod";

const _queryParamsSchema = z.object({
  code: z.string().nullable(),
  error: z.string().nullable(),
  redirect: z.string().nullable(),
});

export async function GET(req: NextRequest) {
  const {
    code,
    error,
    redirect: redirectUrl,
  } = await _queryParamsSchema.parseAsync({
    code: req.nextUrl.searchParams.get("code"),
    error: req.nextUrl.searchParams.get("error"),
    redirect: req.nextUrl.searchParams.get("redirect"),
  });

  if (typeof code !== "string") {
    if (error) {
      return redirect("/");
    } else {
      setSecureHttpOnlyCookie("OAUTH_REDIRECT", redirectUrl ?? "/");
      const oauthRedirect = await discordOAuthClient.createAuthorizationURL();
      return redirect(oauthRedirect.href);
    }
  }

  // TODO separate the rest of this in its own endpoint ? /callback ?
  const { success, user, access_token, refresh_token } =
    await exchangeAuthorizationCode(code);

  if (!success) return;

  const accessToken = await signJwt({ ...user, access_token, refresh_token });
  const idToken = await signJwt({ ...user });

  setSecureHttpOnlyCookie("OAUTH_TOKEN", accessToken);
  cookies().set("ID_TOKEN", idToken, {
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  console.log(
    "info  - " +
      `${user?.username ?? "Unknown User"} (${user?.id ?? "Unknown ID"})` +
      " logged-in on " +
      new Date().toUTCString(),
  );
  return redirect(cookies().get("OAUTH_REDIRECT")?.value!);
}

async function exchangeAuthorizationCode(code: string) {
  try {
    const { access_token, token_type, scope, refresh_token } =
      await discordOAuthClient.validateAuthorizationCode(code);

    if (!scope?.includes("identify"))
      return { success: false, error: "Identify scope is missing" };
    if (!scope?.includes("guilds"))
      return { success: false, error: "Guilds scope is missing" };

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    const { id, username, avatar, global_name } = await userResponse.json();

    if (scope.includes("guilds") && scope.includes("guilds.join")) {
      const guildsResponse = await fetch(
        "https://discord.com/api/users/@me/guilds",
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        },
      );

      const guilds = await guildsResponse.json();

      if (scope.includes("guilds.join") && guilds?.length <= 100) {
        await fetch(
          `https://discord.com/api/guilds/1009562516105461780/members/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_type} ${access_token}`,
            },
            body: JSON.stringify({
              access_token,
            }),
          },
        );
      }
    }

    return {
      success: true,
      access_token,
      refresh_token,
      user: { id, avatar, username, global_name },
    };
  } catch (error: unknown) {
    return { success: false, error: (error as any).message };
  }
}

function setSecureHttpOnlyCookie(name: string, value: string) {
  return cookies().set(name, value, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60,
  });
}
