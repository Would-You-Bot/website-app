import { IdTokenJWT } from "@/helpers/hooks";
import { cookies } from "next/headers";
import { parseJWT } from "oslo/jwt";

export function getIdToken(): IdTokenJWT | null {
  const tokenString = cookies().get("ID_TOKEN")?.value;
  return tokenString ? (parseJWT(tokenString) as IdTokenJWT) : null;
}
