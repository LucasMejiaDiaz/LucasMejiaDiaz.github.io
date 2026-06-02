import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';

const puerto = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
    if (req.url === '/' || req.url === '/websocket.html') {
        const html = await readFile('websocket.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (data) => {
        console.log('Recibido:' + data);

        wss.clients.forEach((client) => {
            if (client.readyState === 1) { // 1 significa OPEN
                client.send(data.toString());
            }
        });
    });

    ws.on('close', () => console.log('off'));
});

server.listen(puerto, () => {
    console.log(`Servidor WebSocket escuchando en ws://localhost:${puerto}`);
});
