import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { User } from '@models';

import {
  APP_URL,
  AUTHOR,
  END_POINT,
  ISSUER,
  NODEMAILER_USER,
  NODEMAILER_PASS
} from '@environments';

type Type = 'verifyEmail' | 'forgotPassword';

/**
 * Returns any by send email.
 *
 * @remarks
 * This method is part of the {@link shared/mail}.
 *
 * @param type - 1st input
 * @param user - 2nd input
 * @param req - 3rd input
 * @param token - 4th input
 * @param id - 5th input
 *
 * @returns The any mean of `type`, `user`, `req`, `token` and `id`
 *
 * @beta
 */
export const sendMail = async (
  type: Type,
  user: User,
  req: any,
  token: string,
  id: string
): Promise<any> => {
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true
    host: 'smtp.gmail.com',
    port: 587, // 465
    auth: {
      user: NODEMAILER_USER!,
      pass: NODEMAILER_PASS!
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  readHTMLFile('./src/assets/templates/udacity-index.html', (err, html) => {
    const template = handlebars.compile(html);

    const common = {
      author: AUTHOR!,
      issuer: ISSUER!,
      to: user.firstName,
      tracking: `${APP_URL}/${END_POINT}/${id}`
      // tracking: `http://${req.headers.host}/${END_POINT}/${id}`
    };

    const replacements = {
      verifyEmail: {
        // link: `${req.headers.origin}/verify/${token}`,
        link: `${APP_URL}/verify/${token}`,
        subject: 'Verify Email',
        text1: 'To complete your sign up, please verify your email: ',
        button: 'VERIFY EMAIL',
        text2: 'Or copy this link and paste in your web	browser',
        ...common
      },
      forgotPassword: {
        // link: `${req.headers.origin}/reset/${token}`,
        link: `${APP_URL}/reset/${token}`,
        subject: 'Reset Your Password',
        text1:
          // tslint:disable-next-line:quotemark
          "Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.",
        button: 'Set New Password',
        text2:
          // tslint:disable-next-line:quotemark
          "If that doesn't work, copy and paste the following link in your browser:",
        ...common
      }
    };

    const htmlToSend = template(replacements[type]);

    const mailOptions = {
      from: 'Developer Roadmap  📮:' + NODEMAILER_USER, // sender address
      to: user.email, // list of receivers
      subject: replacements[type].subject,
      html: htmlToSend,
      attachments: [
        {
          path: './src/assets/images/logo.png',
          cid: 'unique@kreata.ee' // same cid value as in the html img src
        }
      ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        // Logger.error(err.message)
      } else {
        console.log('Message sent: ' + JSON.parse(info));
        // Logger.debug(info.response.message, 'Nodemailer')
      }
    });

    transporter.close();
  });
};
