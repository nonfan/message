import {readFileSync} from 'fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secure: true,
  auth: {
    user: '2239268289@qq.com', // 发送方的邮箱
    pass: 'fkzlzgkzrowydjch', // smtp 的授权码
  },
});

const filePath = path.join(__dirname, '..', 'access/email_template.html');

function readEmailHTML(code: string) {
  return readFileSync(filePath, 'utf-8').replace(
    '<b id="verification_code"></b>',
    `<b id="verification_code">${code}</b>`
  );
}

export function sendMail(email: string, code: string) {
  const html = readEmailHTML(code);

  let mailOptions = {
    from: '"神秘的Message" <2239268289@qq.com>', // 发送方
    to: email,
    subject: '验证码', // 标题
    html,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('emailServer', error.message);
  }
}
