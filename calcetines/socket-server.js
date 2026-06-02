import { WebSocketServer } from 'ws';

const puerto = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: puerto });

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

console.log(`Servidor WebSocket escuchando en ws://localhost:${puerto}`);
