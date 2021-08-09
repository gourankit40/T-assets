var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gour.ankit40@gmail.com',
    pass: '8819801253'
  }
});

module.exports = transporter;
