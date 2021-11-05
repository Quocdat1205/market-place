import * as dotenv from "dotenv";
dotenv.config();
const constant: { [key: string]: any } = {};

// System
define("HOST", process.env.HOST);
define("PORT", process.env.PORT);
define("PORT_AUTH", process.env.PORT_AUTH);
define("NODE_ENV", process.env.NODE_ENV);

// database
define("DB_NAME", process.env.DB_NAME);
define("PW", process.env.PW);
define("USER_NAME", process.env.USER_NAME);
define("DATABASE_URL", process.env.DATABASE_URL);
define("DIALECT", "postgres");
define("DB_USERNAME_SESSION", process.env.DB_USERNAME_SESSION);
define("DB_PW_SESSION", process.env.DB_PW_SESSION);

// Common
define("request_success", 200);
define("create_success", 201);
define("no_content", 204);
define("bad_request", 400);
define("unauthorized_code", 401);
define("forbiden", 403);
define("not_found", 404);
define("not_allow", 405);
define("request_timeout", 408);
define("token_invali", 408);
define("token_require", 409);
define("error_server", 500);
define("not_implement", 501);
define("algorithms", "HS256");
define("secret", "shhhh");
define("NODE_ENV", process.env.NODE_ENV);

// mail
define("SMTP_MAIL", process.env.SMTP_MAIL);
define("SMTP_PW", process.env.SMTP_PW);
define("SECRET_KEY", process.env.SECRET_KEY);
define("ALGORITHMS", process.env.ALGORITHMS);

function define(key: string, value: any) {
  Object.defineProperty(constant, key, {
    value: value,
    enumerable: true,
  });
}

export default constant;
