import nodemailer from "nodemailer";

export const sendEmail = async (to: string, resetLink: string) => {
  // If no email credentials are provided, we'll use Ethereal for testing
  let testAccount;
  if (!process.env.EMAIL_USER) {
    testAccount = await nodemailer.createTestAccount();
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_USER ? "smtp.gmail.com" : "smtp.ethereal.email",
    port: process.env.EMAIL_USER ? 465 : 587,
    secure: !!process.env.EMAIL_USER, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || testAccount?.user,
      pass: process.env.EMAIL_PASS || testAccount?.pass,
    },
  });

  const mailOptions = {
    from: '"E-Commerce Support" <support@your-ecommerce.com>', // sender address
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

  const info = await transporter.sendMail(mailOptions);

  if (!process.env.EMAIL_USER) {
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};
