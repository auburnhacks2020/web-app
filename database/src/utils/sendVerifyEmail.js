const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Email = require('email-templates');
const path = require('path');

// const sendVerifyEmail = async email => {
// 	let testAccount = await nodemailer.createTestAccount();

// 	let html = '';
// 	fs.readFile(
// 		'./src/emailTemplates/test.html',
// 		'utf-8',
// 		(err, data) => {
// 			if (err) throw err;
// 			html = data;
// 			console.log(html);
// 		}
// 	);

// 	let transporter = nodemailer.createTransport({
// 		host: 'smtp.ethereal.email',
// 		port: 587,
// 		secure: false, // true for 465, false for other ports
// 		auth: {
// 			user: testAccount.user, // generated ethereal user
// 			pass: testAccount.pass // generated ethereal password
// 		}
// 		// service: 'gmail',
// 		// auth: {
// 		// 	user: 'auburnhacks@gmail.com', // generated ethereal user
// 		// 	pass: 'X^tpv7781!Gh' // generated ethereal password
// 		// }
// 	});

// 	let info = await transporter.sendMail({
// 		from: '"AuburnHacks Staff" <auburnhacks@email.com>',
// 		to: email,
// 		subject: 'Please verify your email for AuburnHacks',
// 		html: html
// 	});

// 	console.log('Email sent: %s', info.messageId);
// 	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// };

const sendVerifyEmail = async (toEmail, name) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass // generated ethereal password
        // }
        service: 'gmail',
        auth: {
        	user: 'auburnhacks@gmail.com', // generated ethereal user
        	pass: 'X^tpv7781!Gh' // generated ethereal password
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

	
	const url = 'http://192.168.1.8:19006/profile/login/' + token;

	const email = new Email({
		message: {
            from: '"AuburnHacks Staff" <auburnhacks@gmail.com>',
			to: toEmail,
			attachments: [
				{
					filename: 'logo.png',
					path: path.join(process.cwd(), '../assets/logos/AuburnHacks-1.png'),
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
