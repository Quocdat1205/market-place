import jwt, { VerifyErrors, verify } from "jsonwebtoken";
import constant from "../constant";

export function jwt_verify(token: string) {
  const Verify = verify(
    token,
    constant.SECRET_KEY,
    function (
      err: VerifyErrors | null,
      decode: { [key: string]: string | object | number } | undefined
    ): Object | undefined {
      if (err) {
        return;
      }
      return { decode, success: true };
    }
  );

  return Verify;
}

export function jwt_sign(info: any) {
  let token = jwt.sign(
    {
      payload: info,
    },
    constant.SECRET_KEY,
    { expiresIn: 60 * 3 }
  );
  return token;
}
