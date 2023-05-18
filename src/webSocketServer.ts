// import WebSocket from 'ws';
import * as ws from 'ws';

// In root path of this project, run:
//  npm install --save ws @types/ws
//  npm i --save-dev @types/ws

// npm install ws
// npm install --save-optional bufferutil
// npm install --save-optional utf-8-validate

export class WebSocketServer {
    private _wss: ws.WebSocket.Server | undefined;
    private _port: number = 54321;
    private _url: string = `ws://127.0.0.1:${this._port}/`;

    public start() {
        this._wss = new ws.WebSocket.Server({ port: this._port });

        this._wss.on('connection', (ws) => {
            console.log(`√ Client connected on: ${this._url}`);

            ws.on('message', (message) => {
                console.log('> Received message from Tampermonkey:', message.toString());
            });

            ws.send('Hello from VSCode extension!');

            ws.on('close', () => {
                console.log(`√ Client closed on: ${this._url}`);
            });
        });
    }

    public stop() {
        if (this._wss) {
            this._wss.close();
            this._wss = undefined;
        }
    }
}
