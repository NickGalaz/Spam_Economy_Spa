const nodemailer = require('nodemailer');
let axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'desaimailer@gmail.com',
        pass: "infoclub1",
    }
});



async function enviar(to, subject, text) {
    const { data } = await axios.get('https://mindicador.cl/api')
    let dolar = data.dolar.valor;
    let euro = data.euro.valor;
    let uf = data.uf.valor;
    let utm = data.uf.valor;
    let mensaje = `<p> El valor del dolar el día de hoy es: ${dolar} </p>
    <p> El valor del euro el día de hoy es: ${euro} </p>
    <p> El valor del uf el día de hoy es: ${uf} </p>
    <p> El valor del utm el día de hoy es: ${utm} </p>`
    let contenido = text + mensaje;
    let mailOptions = {
        from: 'desaimailer@gmail.com',
        to,
        subject,
        html: contenido
    }
    return new Promise((res, rej) => {
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('err', err);
                rej(new Error('Error al enviar el correo'))
            }
            if (data) {
                console.log('data', data);
                let nombrearchivo = `./correo/${uuidv4().slice(0, 5)}.txt`;
                fs.writeFile(nombrearchivo, contenido, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log('Correo con ID');
                    }
                    res(data);
                });
            }
        });

    });
}

module.exports = enviar;
