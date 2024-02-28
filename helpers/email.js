import  nodemailer from 'nodemailer'

const emailRegistro= async (datos) =>{
    const transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST ,
        port:process.env.EMAIL_PORT,
        auth: {
          user:process.env.EMAIL_USER ,
          pass: process.env.EMAIL_PASS
        }
      });
      console.log(datos)
      const {nombre,email,token}= datos
     
      transport.sendMail({
        from:'bienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text:'Confirma tu cuenta en Bienes Raices',
        html: `<p> bienvenido ${nombre}, comprueba tu cuenta  en bienes raices </p>
        <p> tu cuenta ya esta lista , solo debes confirmarla con el siguiente enlace
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/comprobar/${token}">confirmar cuenta</a></p>
        
        `
      })

}

const EmailolvidePassword= async (datos) =>{
  const transport = nodemailer.createTransport({
      host:process.env.EMAIL_HOST ,
      port:process.env.EMAIL_PORT,
      auth: {
        user:process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS
      }
    });
    console.log(datos)
    const {nombre,email,token}= datos
   
    transport.sendMail({
      from:'bienesRaices.com',
      to: email,
      subject: 'restablece tu password en Bienes Raices',
      text:'restablece tu password',
      html: `<p> bienvenido ${nombre}, has solicitado restablecer tu password </p>
      <p> apreta el siguiente enlace para generar un password nuevo 
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">reestablecer password</a></p>
      
      `
    })

}
export{
    emailRegistro,
    EmailolvidePassword
}