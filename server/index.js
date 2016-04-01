'use strict';

const restify = /**@type {restify}*/ require('restify');
const nodemailer = require('nodemailer');
const Log = require('./util/Log');
const logger = new Log(__filename);
const server = restify.createServer();
const PORT = process.env.serverPort;
let transporter;

transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

server.use(restify.CORS());
server.use(restify.bodyParser());
server.use(restify.throttle({
  ip: true,
  rate: 1,
  burst: 1
}));

server.post('/api/email', (req, res) => {
  logger.info(req.body);

  const email = {
    to: process.env.to,
    from: process.env.user,
    subject: 'Email from Personal Site',
    text: `Message from Personal Site:\n\n\n ${req.body.email}`
  };

  transporter.sendMail(email, (err, info) => {
    if(err) {
      logger.error('Error sending email');
      logger.error(err.stack);
      return res.send(500);
    }

    logger.info('Successfully sent Email');
    res.send(200);
  });
});

server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));

//environment warnings
if(!process.env.user || !process.env.pass || !process.env.to) {
  if(!process.env.user) logger.error('Environment variable "user" not set!');
  if(!process.env.pass) logger.error('Environment variable "pass" not set!');
  if(!process.env.to) logger.error('Environment variable "to" not set!');
  if(!process.env.serverPort) logger.error('Environment variable "serverPort" not set!');
  process.exit(1);
}