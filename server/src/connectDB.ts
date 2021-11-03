import { createConnection, Connection } from "typeorm";
import constants from "./constant";
import "reflect-metadata";
import {
  Customers,
  AttachmentItem,
  AttachmentCustomer,
  Auction,
  Items,
  Label,
  Offer,
  Transaction,
  CheckMail,
} from "./entities/index";

let connection: Connection;

const ConnectionDb = async () => {
  if (constants.NODE_ENV === "production") {
    connection = await createConnection({
      type: "postgres",
      url: constants.DATABASE_URL,
      logging: true,
      synchronize: true,
    });
  } else {
    connection = await createConnection({
      name: "default",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: constants.USER_NAME,
      password: constants.PW,
      database: constants.DB_NAME,
      logging: true,
      synchronize: false,
      entities: [
        Customers,
        AttachmentItem,
        AttachmentCustomer,
        Auction,
        Items,
        Label,
        Offer,
        Transaction,
        CheckMail,
      ],
    });
  }
};

ConnectionDb()
  .then(() => console.log("Connect db success"))
  .catch((err) => console.error(err));

export { ConnectionDb, connection };
