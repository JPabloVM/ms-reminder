import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

/**
 * Envia um e-mail usando um template Handlebars.
 * @param to - Endereço de destino.
 * @param templateName - Nome do arquivo .hbs dentro de templates/emails/.
 * @param context - Objeto com variáveis para o template.
 * @param subject - Assunto do e-mail.
 * @param cc - Cópia.
 * @param bcc - Cópia oculta.
 */
async function sendEmail<T extends Record<string, unknown>>(
  to: string,
  templateName: string,
  context: T,
  subject = 'Notificação automática',
  cc?: string,
  bcc?: string,
): Promise<void> {
  try {
    const htmlData = compileTemplate(templateName, context);

    const mailOptions: MailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: htmlData,
      cc,
      bcc,
    };

    const transporter = createTransporter();

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Erro ao enviar e-mail: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function createTransporter() {
  console.log(process.env.EMAIL_PASSWORD);
  const host = process.env.EMAIL_HOST;
  const pass = process.env.EMAIL_PASSWORD;
  const user = process.env.EMAIL;

  let config: SMTPTransport | SMTPTransport.Options;

  if (host?.endsWith('gmail.com')) {
    config = {
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    };
  } else {
    config = {
      host: host,
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2',
      },
    };
  }

  return nodemailer.createTransport(config);
}

function compileTemplate<T extends Record<string, unknown>>(templateName: string, context: T): string {
  const templatePath = path.join(__dirname, `../templates/emails/${templateName}`);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateSource);
  return template(context);
}

export default sendEmail;
