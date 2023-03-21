const dotenv = require("dotenv");
const pug = require("pug");
dotenv.config({ path: "./../config.env" });

const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(data, url) {
    this.to = data.email;
    this.user = data.user;
    this.from = "Credit-firm";
    this.url = url;
  }

  newTransport() {
    // gmail
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      user:this.user,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }

  async newAccountCreated() {
    await this.send("new-account-created", "New Account Created");
  }

  // async sendNewWithdrawal() {
  //   await this.send("withdrawalEmail", "New Withdrawal");
  // }
};
