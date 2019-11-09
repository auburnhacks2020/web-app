const nodemailer = require('nodemailer');
const fs = require('fs');

const sendVerifyEmail = async email => {

    let html = fs.readFile()

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    })

    let info = await transporter.sendMail({
        from: '"AuburnHacks Staff" <auburnhacks@gmail.com>',
        to: email,
        subject: 'Please verify your email for AuburnHacks',
        html: 
    })
}


module.exports = {
    sendVerifyEmail: () => console.log('sending email')
}