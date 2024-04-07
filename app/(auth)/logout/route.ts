import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  cookies().delete("OAUTH_TOKEN");
  cookies().delete("ID_TOKEN");

  return redirect("/");
}
