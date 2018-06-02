/**
* Copyright 2015 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: gmailEmail,
		pass: gmailPassword,
	},
});
// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Playalong Web';

// [START sendWelcomeEmail]
/**
* Sends a welcome email to new user.
*/
// [START onCreateTrigger]
export const onUserCreate = functions.auth.user().onCreate((user) => {
	console.log('Entering onUserCreate');
	console.log('Received user:', user);
	const { email, displayName } = user.providerData[0];
	return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
* Send an account deleted email confirmation to users who delete their accounts.
*/
// [START onDeleteTrigger]
export const onUserDelete = functions.auth.user().onDelete(user => {
	console.log('Entering onUserDelete');
	const { email, displayName } = user.providerData[0];
	return sendGoodbyeEmail(email, displayName);
});
	
// [END sendByeEmail]

// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
	const mailOptions = {
		from: `${APP_NAME} <contact@playalong.com>`,
		to: email,
		subject: `Welcome to ${APP_NAME}!`,
		text: `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`,
	};
	console.log('Entering sendWelcomeEmail');
	console.log('Data:', mailOptions);
	return mailTransport
		.sendMail(mailOptions)
		.then(() => console.log('New welcome email sent to:', email));
}

// Sends a goodbye email to the given user.
function sendGoodbyeEmail(email, displayName) {
	const mailOptions = {
		from: `${APP_NAME} <noreply@firebase.com>`,
		to: email,
		subject: `Bye!`,
		text: `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`,
	};
	
	
	return mailTransport
		.sendMail(mailOptions)
		.then(() => console.log('Account deletion confirmation email sent to:', email));
}