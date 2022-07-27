import { SendMailOptions } from 'nodemailer';

export const recoveryPasswordEmailMessage = (
  username: string,
  userEmail: string,
  access_token: string,
) => {
  return {
    from: process.env.NODEMAILER_AUTH_USER,
    to: userEmail,
    subject: 'tryCBC Restablecer contraseña',
    html: `<div>
    <p>Hemos recibido una petición para restablecer la contraseña del usuario ${username}</p>
    <p>Si usted realizó esta petición ingrese al siguiente link, sino ignore este mensaje.</p>
    <p>El link será valido por un tiempo limitado, luego de eso será invalido y deberás pedir otro.</p>
    <p>No compartas este link con NADIE.</p>
    <h5>${process.env.CLIENT_URL}/recovery-password/${access_token}</h5> 
  </div>`,
  };
};
