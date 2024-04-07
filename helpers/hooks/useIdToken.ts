import { JWT, parseJWT } from "oslo/jwt";
import { useMemo } from "react";
import { useCookies } from "@/helpers/hooks";

export type IdTokenData = {
  id: string;
  avatar: string;
  username: string;
  global_name: string;
  exp: number;
};

export interface IdTokenJWT extends JWT {
  payload: IdTokenData;
}

export function useIdToken(defaultValue: IdTokenJWT | null): IdTokenJWT | null {
  const token = useCookies().get("ID_TOKEN");

  return useMemo(
    () => (token ? (parseJWT(token) as IdTokenJWT) : defaultValue),
    [defaultValue, token],
  );
}
