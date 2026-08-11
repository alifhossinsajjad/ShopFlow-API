"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    // If no email credentials are provided, we'll use Ethereal for testing
    let testAccount;
    if (!process.env.EMAIL_USER) {
        testAccount = yield nodemailer_1.default.createTestAccount();
    }
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_USER ? "smtp.gmail.com" : "smtp.ethereal.email",
        port: process.env.EMAIL_USER ? 465 : 587,
        secure: !!process.env.EMAIL_USER, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER || (testAccount === null || testAccount === void 0 ? void 0 : testAccount.user),
            pass: process.env.EMAIL_PASS || (testAccount === null || testAccount === void 0 ? void 0 : testAccount.pass),
        },
    });
    const mailOptions = {
        from: '"E-Commerce Support" <support@ecommerce.com>', // sender address
        to, // list of receivers
        subject: "Password Reset Link", // Subject line
        text: `You requested a password reset. Click the following link to reset your password: ${resetLink}. This link is valid for 15 minutes.`, // plain text body
        html: `
      <div>
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the button below to reset your password. This link is valid for 15 minutes.</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If the button doesn't work, copy and paste the following link into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      </div>
    `, // html body
    };
    const info = yield transporter.sendMail(mailOptions);
    if (!process.env.EMAIL_USER) {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    }
});
exports.sendEmail = sendEmail;
