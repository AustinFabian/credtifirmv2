const dotenv = require("dotenv");
const pug = require("pug");
const htmlToText = require("html-to-text");
dotenv.config({ path: "./../config.env" });

const nodemailer = require("nodemailer");

module.exports = class UserEmail {
  constructor(user) {
    this.to = user.email;
    this.from = "credit-firm";
    this.login = user.login;
    this.account = user.accountType;
    this.accountNumber = user.accountNumber;
    this.amount = user.transactionAmount;
    this.type = user.transactionType;
    this.bank = user.sentTo;
    this.date = user.TransactionDate;
    this.status = user.TransactionStatus;
    this.sourceCode = user.sortCode;
    this.recipient = user.recipient;
    this.otp = user.otp;
  }

  newTransport() {
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

    var recieptDetails = {
      login: this.login,
      amount: this.amount,
      type: this.type,
      bank: this.bank,
      date: this.date,
      status: this.status,
      sortCode: this.sourceCode,
      recipient: this.recipient,
    };

    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      recieptDetails,
      login: this.login,
      accountNumber: this.accountNumber,
      account: this.account,
      otp: this.otp,
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
        console.log("sent");
      }
    });
  }

  async sendWelcome() {
    await this.send("welcome", "Account Creation Form Submitted");
  }

  async sendAccountActive() {
    await this.send("account-activated", "Account Activated");
  }

  async sendOtp() {
    await this.send("otp", "One Time password for current transaction");
  }

  async sendReciept() {
    await this.send("reciept", "Transaction Reciept");
  }
};
