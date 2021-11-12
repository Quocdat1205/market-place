import { CheckMail, Customers, connection } from "../entities";
import { getConnection } from "typeorm";

export async function CheckEmailExisting(email: string) {
  try {
    return await getConnection()
      .getRepository(CheckMail)
      .createQueryBuilder("check_mail")
      .where("check_mail.email = :email", {
        email: email,
      })
      .getOne();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function CheckUserExistingUseEmail(email: string) {
  try {
    return await connection
      .getRepository(Customers)
      .createQueryBuilder("user")
      .where("user.email = :email AND user.is_active", {
        email: email,
        is_active: true,
      })
      .getOne();
  } catch (error) {
    console.error(error);
    return false;
  }
}
