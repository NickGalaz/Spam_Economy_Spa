const enviar = require('./mailer.js');
const url = require('url');
const http = require('http');
const fs = require('fs');

const port = 3000;

http
    .createServer(async function (req, res) {
        if (req.url == '/') {
            res.setHeader('content-type', 'text/html', 'utf8')
            fs.readFile('index.html', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500).end('Error en el servidor');
                    res.end(data)
                } else {
                    res.writeHead(200).end(data)
                }
            });
        } else if (req.url.startsWith('/mailing')) {
            let { correos, asunto, contenido } = url.parse(req.url, true).query;
            try {
                await enviar(correos.split(','), asunto, contenido);
                res.writeHead(200).end('Su correo se ha enviado exitosamente.');

        
            }
            catch (e) {
                res.writeHead(500).end(e);
            }
        } else {
            res.writeHead(404).end('Contenido no encontrado.')
        }
    })

    .listen(port, () => console.log('Corriendo en puerto: ' + port));