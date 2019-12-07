const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Email = require('email-templates');
const path = require('path');

const sendVerifyEmail = (toEmail, name) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        	user: 'auburnhacks@gmail.com',
        	pass: process.env.EMAIL_PASS
        }
	});

	const token = jwt.sign(
		{
			email: toEmail
		},
		process.env.EMAIL_SECRET,
		{
			expiresIn: '1d'
		}
	);

	
	const url = 'http://192.168.1.4:19006/profile/login/' + token;

	const email = new Email({
		message: {
            from: '"AuburnHacks Staff" <auburnhacks@gmail.com>',
			to: toEmail,
			attachments: [
				{
					filename: 'logo.png',
					path: path.join(process.cwd(), './assets/logos/AuburnHacks-1.png'),
					cid: 'logo'
				}
			]
		},
		// uncomment below to send emails in development/test env:
		send: true,
		transport: transporter
    });
    

	email
		.send({
			template: path.join(process.cwd(), 'src/utils/emails/verify'),
			message: {
				to: toEmail
			},
			locals: {
				name,
				url
			}
		})
		.then(console.log)
		.catch(console.error);
};

module.exports = {
	sendVerifyEmail
};
