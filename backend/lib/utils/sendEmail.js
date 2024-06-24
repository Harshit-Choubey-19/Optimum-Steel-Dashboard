import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: subject,
      html: `<p>Hello <b>${user.fullName}</b></p><p>Please verify the email by clicking on this link.</p><p>The link will <b>expires in 1 hour.</b></p><p><a href=${text}>Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
