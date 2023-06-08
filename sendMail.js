const nodemailer = require("nodemailer");


const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kiarra46@ethereal.email',
            pass: '6qjv7RMqpWZXmRdrev'
        },
      });

      let info = await transporter.sendMail({
        from: "<imransutar200@gmail.com>",
        to: "sutarimran47@gmail.com", 
        subject: "Verification Mail", 
        text: "To continue please accept",
        html: ` <button>Accept</button> <br> <button>Reject</button> `, 
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("Mail sent")


}

module.exports = {
    sendMail
}