import nodemailer from "nodemailer";
import constant from "../constant";

const subject = "Hope all is well!";

console.log(constant.SMTP_MAIL, constant.SMTP_PW);

export default async function SendEmail(to: string, html: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: constant.SMTP_MAIL,
      pass: constant.SMTP_PW,
    },
    logger: true,
  });

  var mailOptions = {
    from: constant.SMTP_MAIL,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (err, _info) {
    if (err) {
      console.error("error send email", err);
      return false;
    }

    // console.log(info.response);
    return true;
  });
}
