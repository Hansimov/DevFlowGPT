import * as ws from 'ws';

// In root path of this project, run:
//    npm install ws 
//    (npm install--save ws @types/ws)
//    npm install --save-optional bufferutil
//    npm install --save-optional utf-8-validate

// node.js - This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag - Stack Overflow
//   https://stackoverflow.com/questions/62273153/this-module-is-declared-with-using-export-and-can-only-be-used-with-a-defau

export class WebSocketServer {
    private _wss: ws.WebSocket.Server | undefined;
    private _port: number = 54321;
    private _url: string = `ws://localhost:${this._port}`;
    private _clients: Set<ws> = new Set();

    public start() {
        this._wss = new ws.WebSocket.Server({ port: this._port });

        this._wss.on('connection', (ws) => {
            this._clients.add(ws);
            console.log(`√ [Client connected]: ${this._url}`);

            ws.on('message', (message) => {
                console.log('> [Received]:', message.toString());
            });

            ws.send('Hello from VSCode extension!');
            ws.on('error', (error) => {
                console.log(`× [Error]: ${error}`);
            });

            ws.on('close', () => {
                this._clients.delete(ws);
                console.log(`√ [Client closed]: ${this._url}`);
            });
        });
    }

    public stop() {
        if (this._wss) {
            this._wss.close();
            this._wss = undefined;
        }
    }

    public sendToClients(message: string) {
        for (const client of this._clients) {
            client.send(message);
        }
    }
}