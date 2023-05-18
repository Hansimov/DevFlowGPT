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
    // private _clients: Set<ws> = new Set();
    private _clients: Map<string, ws> = new Map();
    private _latestClientID: string | undefined;
    private _clientOrder: string[] = [];
    private _clientIDCounter: number = 0;

    public start() {
        this._wss = new ws.WebSocket.Server({ port: this._port });

        this._wss.on('connection', (ws) => {
            const clientID = (this._clientIDCounter++).toString();
            this._clients.set(clientID, ws);
            this._latestClientID = clientID;
            this._clientOrder.push(clientID);
            console.log(`√ [Client connected]: ${this._url} with ID ${clientID}`);

            ws.on('message', (message) => {
                console.log('> [Received]:', message.toString());
            });

            ws.send('Hello from VSCode extension!');

            ws.on('error', (error) => {
                console.log(`× [Error]: ${error}`);
            });

            ws.on('close', () => {
                this._clients.delete(clientID);
                console.log(`√ [Client closed]: ${this._url} with ID ${clientID}`);
            });
        });
    }

    public stop() {
        if (this._wss) {
            for (let i = this._clientOrder.length - 1; i >= 0; i--) {
                const clientID = this._clientOrder[i];
                const client = this._clients.get(clientID);
                if (client) {
                    client.close();
                    this._clients.delete(clientID);
                }
            }
            this._wss.close();
            this._wss = undefined;
        }
    }

    public sendToClients(message: string) {
        for (const client of this._clients.values()) {
            client.send(message);
        }
    }

    public sendToClient(kind: "latest" | "all" | "specific", message: string, clientID?: string) {
        if (kind === "latest") {
            if (this._latestClientID) {
                const latestClient = this._clients.get(this._latestClientID);
                if (latestClient) {
                    latestClient.send(message);
                }
            }
        } else if (kind === "all") {
            this.sendToClients(message);
        } else if (kind === "specific") {
            if (clientID) {
                const specificClient = this._clients.get(clientID);
                if (specificClient) {
                    specificClient.send(message);
                }
            }
        }
    }
}