const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({

service : "gmail",
secure : "false",

    auth: {
      user: "sandip.bagale34@gmail.com",
      pass:"gitlzqrbzsrdcxtv"
    },
    tls: {
      rejectUnauthorized: false, // This line accepts self-signed certificates
    }
  });

  const mailOptions = {
    from: "sandip.bagale34@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;


