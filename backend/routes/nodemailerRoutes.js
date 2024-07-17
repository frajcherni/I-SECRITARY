const nodemailer = require("nodemailer");

const emailExistence = require('email-existence');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'dabbekramzi1994@gmail.com',
    pass: 'ahtw hsvr oqmp chmu' // App password, not the regular email password
  }
});

module.exports = (app) => {
  app.post("/api/sendmail", async (req, res) => {
    try {
      console.log(req.body);

      emailExistence.check(req.body.email,async (err, exists) => {
        console.log('Email exists:', exists);
        if (!exists) {
          console.log("Error verifying email:", err);
          return res.status(400).json({ message: "Error verifying email address", error: err });
        }

        else { const message = {
          from: 'dabbekramzi1994@gmail.com',
          to: req.body.email,
          subject: 'I Secretary Contact',
          text: `Hi Mr ${req.body.username},\n\nAfter you sent a message to our team website:\n\n${req.body.text}\n\nBest regards,\nTeam`
        };
        console.log(message);

        const info = await transporter.sendMail(message);
        console.log("Email sent:", info.messageId);
        res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
    
            
        
        }
      });
      // Validate email address before sending
      
        

       
    } catch (err) {
      console.log("Error sending email:", err);
      res.status(500).json({ message: "Error sending email", error: err.message });
    }
  });
};
