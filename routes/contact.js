const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// @route   POST /add
// @desc    Add a new party by completing the form. The party info will be displayed in "All Parties" page.
// @access  Public
router.get("/", (req, res) => {
  res.render("contact");
});

// @route   POST /add
// @desc    Add a new party by completing the form. The party info will be displayed in "All Parties" page.
// @access  Public
router.post("/", async (req, res) => {
  const outputMessage = `
    <h3>You signed up for a party!</h3>
    <p>Your details:</p>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone Number: ${req.body.cell}</li>
    </ul>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a2a296f671d2b8",
      pass: "9601c5047d2513"
    }
  });

  let mailInfo = {
    from: '"College Party Life" <6bf9e1ca32-9db7a2@inbox.mailtrap.io>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "College Party Life-Confirmation", // Subject line
    text: "Hello", // plain text body
    html: outputMessage // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", {
      msg:
        "You signed up for this event! Please check your inbox for confirmantion"
    });
  });
});

module.exports = router;
