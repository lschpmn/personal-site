'use strict';

const restify = /**@type {restify}*/ require('restify');
const nodemailer = require('nodemailer');
const server = restify.createServer();
const PORT = 5001;
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

server.use(restify.CORS());
server.use(restify.bodyParser());

server.post('/api/email', (req, res) => {
  console.log(req.body);

  const email = {
    to: process.env.to,
    subject: 'Email from Personal Site',
    text: `Message from Personal Site:\n\n\n ${req.body.email}`
  };

  transporter.sendMail(email, (err, info) => {
    if(err) {
      console.error('Error sending email');
      console.error(err.stack);
      return res.send(500);
    }

    console.log('Successfully sent Email');
    res.send(200);
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));