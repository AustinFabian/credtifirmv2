import "@babel/polyfill";
import { login } from "./login";
import { logOut } from "./login";
import { signup } from "./signup";
import { updateStatus } from "./transactions";
import { otpEmail } from "./transactions";
import { newTransaction } from "./transactions";
import { updateSettings } from "./updateSettings";
import { updateUserData } from "./updateSettings";
import { deActivateUser } from "./updateSettings";
import { activateUser } from "./updateSettings";
import { sendMail } from "./mail";
import { deleteTransaction } from "./transactions";
import { deleteClient } from "./updateSettings";
import { notifyClient } from "./notifications";
import { deleteNotification } from "./notifications";
// import {deactivateSelf} from './updateSettings'

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const logOutBtn = document.querySelectorAll(".nav__el--logout");
const transfer = document.querySelector(".form-transfer");
const userUpdateForm = document.querySelector(".form-user-update");
const errorMsg = document.querySelector(".alert-danger");
const alert = document.querySelector(".alert-danger");
const success = document.getElementById("popSuccess");
const userPasswordForm = document.getElementById("form-user-password");
const fundAccount = document.querySelector("#fund-account");
// -----------------------------------------------------
const support = document.querySelector(".contacts-form");

// DELEGATION

if (loginForm)
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loginName = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    login(loginName, password);
  });

if (signupForm)
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;
    const login = document.getElementById("login").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const pin = document.getElementById("pin").value;
    const select = document.getElementById("account-type");
    const accountType = select.options[select.selectedIndex].textContent;
    signup(
      firstName,
      lastName,
      login,
      phone,
      email,
      address,
      password,
      passwordConfirm,
      pin,
      accountType
    );
  });

if (logOutBtn) {
  logOutBtn.forEach((element) => {
    element.addEventListener("click", logOut);
  });
}

// ACTIVATE USER ACCOUNT
$(".activate").click(function () {
  var iD = $(this).attr("userId");

  var data = {
    accountStatus: "active",
  };

  activateUser(iD, data);
});

// DEACTIVATE USER ACCOUNT
$(".deactivate").click(function () {
  var iD = $(this).attr("userId");

  var data = {
    accountStatus: "unactive",
  };

  deActivateUser(iD, data);
});

// UPDATE USER
$(".updateUser").click(function () {
  var name = $(this).parent().siblings(".userName").find("input").val();
  var email = $(this).parent().siblings(".userEmail").find("input").val();
  var role = $(this)
    .parent()
    .siblings(".userRole")
    .find("input")
    .val()
    .toLowerCase();
  var password = $(this).parent().siblings(".userPassword").find("input").val();
  var userPin = $(this).parent().siblings(".pin").find("input").val();
  var balance = $(this).parent().siblings(".userBalance").find("input").val();
  var accNumber = $(this)
    .parent()
    .siblings(".accountNumber")
    .find("input")
    .val();
  var joined = $(this).parent().siblings(".joined").find("input").val();
  var trans = $(this).parent().siblings(".trans").find("input").val();
  var iD = $(this).attr("userId");

  var data = {
    login: name,
    email: email,
    password: password,
    passwordConfirm: password,
    pin: userPin,
    role: role,
    balance: balance,
    accountNumber: accNumber,
    dateJoined: joined,
    transactions: trans,
  };
  updateUserData(iD, data);
});

// NOTIFICATION
// .header-right .notification_dropdown .nav-link::before

$(".notification_dropdown").click(function () {
  $(".nav-link").addClass("nav-link-remove-dot");
});

// NOTIFY USER
$(".notify").click(function () {
  var id = $(this).attr("userId");
  var notification = $(this)
    .parent()
    .siblings(".notification")
    .find("textarea")
    .val();
  var img = $(this).attr("img");
  var login = $(this).attr("login");
  var data = {
    userId: id,
    createdAt: new Date().toUTCString(),
    notification: notification,
    userImg: img,
    userLogin: login,
  };

  notifyClient(data);
});

// DELETE NOTIFICATION
$(".delNot").click(function () {
  var iD = $(this).attr("mongoId");
  deleteNotification(iD);
});

// DELETE USER

$(".deleteUser").click(function () {
  var iD = $(this).attr("userId");
  deleteClient(iD);
});

// ALERTS
$(".alert-button").click(function () {
  if ($(this).parent().siblings().find("input").val("")) {
    alert.textContent = "Please Fill every input";
    alert.style.display = "flex";
    window.setTimeout(() => {
      alert.style.display = "none";
    }, 7000);
  } else {
    success.style.display = "block";
    window.setTimeout(() => {
      location.reload(true);
    }, 1000);
  }
});

// FOR CREATING NEW TRANSACTION

if (transfer)
  transfer.addEventListener("submit", function (e) {
    e.preventDefault();

    var generalPin = 1234;
    var balance = this.getAttribute("balance");

    var transId = this.getAttribute("transactionId");
    var userPin = this.getAttribute("userPin");
    var transType = this.getAttribute("transactionType");
    var transUser = this.getAttribute("user");
    var userImg = this.getAttribute("image");
    var email = this.getAttribute("email");
    var bankName = document.querySelector(".current").innerHTML;
    var optionalBankName = document.getElementById("optinalBankName").value;
    var recName = document.getElementById("recName").value;
    var sourceCode = document.getElementById("sourceCode").value;
    var amount = document.getElementById("amount").value;
    var pin = document.getElementById("pin").value;

    if (bankName.includes("Select Bank")) {
      if (optionalBankName !== "") {
        bankName = optionalBankName;
      } else {
        errorMsg.textContent = "Bank not selected";
        errorMsg.style.display = "flex";

        window.setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);

        return;
      }
    }

    if (bankName == "Select Biller") {
      errorMsg.textContent = "Biller not selected";
      errorMsg.style.display = "flex";
      window.setTimeout(() => {
        errorMsg.style.display = "none";
      }, 5000);
    } else {
      var data = {
        transactionId: transId,
        type: transType,
        userName: transUser,
        userImg: userImg,
        userEmail: email,
        bank: bankName,
        amount: amount,
        recipient: recName,
        sortCode: sourceCode,
      };

      if (parseInt(pin) == userPin) {
        if (parseInt(amount) < parseInt(balance) && parseInt(amount) !== 0) {
          var transId = this.getAttribute("transactionId");

          var data = {
            transactionId: transId,
          };

          // new screen
          $(".forOtp").css({ display: "flex" });
          otpEmail(data);
        } else {
          errorMsg.textContent = "Your Balance is lower than Amount";
          errorMsg.style.display = "flex";
          window.setTimeout(() => {
            errorMsg.style.display = "none";
          }, 5000);
        }
      } else {
        errorMsg.textContent = "Incorrect Pin";
        errorMsg.style.display = "flex";
        window.setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);
      }
    }

    $("#otpButton").click(function name() {
      var otp = 5096714;

      var otpInput = $(".otpInput").val();

      if (otpInput == otp) {
        var data = {
          transactionId: transId,
          type: transType,
          userName: transUser,
          userImg: userImg,
          userEmail: email,
          bank: bankName,
          amount: amount,
          recipient: recName,
          sortCode: sourceCode,
        };

        newTransaction(data);
      }else{
        errorMsg.textContent = "OTP Invalid";
        errorMsg.style.display = "flex";
        window.setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);
      }
    });
  });

// FOR RUND ACCOUNT
if (fundAccount) {
  fundAccount.addEventListener("submit", function (e) {
    e.preventDefault();

    var generalPin = 1234;

    var transId = this.getAttribute("transactionId");
    var transType = this.getAttribute("transactionType");
    var transUser = this.getAttribute("user");
    var userImg = this.getAttribute("image");
    var email = this.getAttribute("email");
    var amount = document.getElementById("amount").value;
    var pin = document.getElementById("pin").value;

    if (parseInt(pin) === generalPin) {
      var data = {
        transactionId: transId,
        type: transType,
        userName: transUser,
        userImg: userImg,
        userEmail: email,
        amount: amount,
      };
      newTransaction(data);
    } else {
      errorMsg.textContent = "Incorrect Pin";
      errorMsg.style.display = "flex";
      window.setTimeout(() => {
        errorMsg.style.display = "none";
      }, 5000);
    }
  });
}
// ***********************************

// CHANGE TRANSACTION STATUS
$(".status").click(function () {
  var id = $(this).attr("id");
  var state = $(this).text();
  updateStatus(id, state);
});

// DELETE TRANSACTION
$(".delete").click(function () {
  var id = $(this).attr("id");
  deleteTransaction(id);
  console.log(id);
});

if (userUpdateForm) {
  userUpdateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append("login", document.getElementById("login").value);
    form.append("email", document.getElementById("email").value);
    form.append("id", document.getElementById("userId").getAttribute("userId"));
    form.append("photo", document.querySelector(".photo").files[0]);
    updateSettings(form, "data");
  });
}

// SUPPORT
if (support) {
  support.addEventListener("submit", function (e) {
    e.preventDefault();
    var who = document.getElementById("sender").getAttribute("who");
    var email = document.getElementById("email").value;
    var topic = document.getElementById("topic").value;
    var message = document.getElementById("message").value;
    var captcha = document.getElementById("captcha").value;

    if (captcha === "2887") {
      sendMail({ email, topic, message }, who);
    }
  });
}

$(".hamburger2").click(function() {
  $(this).toggleClass("is-active")
  $("#main-wrapper").toggleClass("menu-toggle")
})

// // FOR UPDATE PASSWORD
if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".button--save-password").innerHTML = "UPDATING...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.querySelector(".password-confirm").value;
    const id = document.getElementById("userId").getAttribute("userId");
    updateSettings(
      { passwordCurrent, password, passwordConfirm, id },
      "password"
    );
  });
}
