# Below is the typescript c...

> Below is the typescript code for websocket server in vscode extension.
> Implement following features or improvements:
> [2] Use meaningful client ID to distinguish different clients.
> [1] Send message to latest connected client with these different kinds: "latest", "all", "specific".
> 
> <code>
> export class WebSocketServer {
>     private _wss: ws.WebSocket.Server | undefined;
>     private _port: number = 54321;
>     private _url: string = `ws://localhost:${this._port}`;
>     private _clients: Set<ws> = new Set();
> 
>     public start() {
>         this._wss = new ws.WebSocket.Server({ port: this._port });
> 
>         this._wss.on('connection', (ws) => {
>             this._clients.add(ws);
>             console.log(`√ [Client connected]: ${this._url}`);
> 
>             ws.on('message', (message) => {
>                 console.log('> [Received]:', message.toString());
>             });
> 
>             ws.send('Hello from VSCode extension!');
>             ws.on('error', (error) => {
>                 console.log(`× [Error]: ${error}`);
>             });
> 
>             ws.on('close', () => {
>                 this._clients.delete(ws);
>                 console.log(`√ [Client closed]: ${this._url}`);
>             });
>         });
>     }
> 
>     public stop() {
>         if (this._wss) {
>             this._wss.close();
>             this._wss = undefined;
>         }
>     }
> 
>     public sendToClients(message: string) {
>         for (const client of this._clients) {
>             client.send(message);
>         }
>     }
> }
> </code>

Here is an updated version of the code that implements the requested features:

\[2\] Use meaningful client ID to distinguish different clients:

-   I added a `clientID` property to the `WebSocketServer` class and a `Map` to store the clients with their respective IDs.
-   The `clientID` is generated using the `uuid` package and assigned to each client upon connection.

\[1\] Send message to latest connected client with these different kinds: “latest”, “all”, “specific”:

-   I added a new method `sendToClient` that takes in a `kind` parameter and a `message` parameter.
-   The `kind` parameter can be `"latest"`, `"all"`, or `"specific"`.
-   If the `kind` is `"latest"`, the message is sent to the most recently connected client.
-   If the `kind` is `"all"`, the message is sent to all connected clients.
-   If the `kind` is `"specific"`, an additional `clientID` parameter is required to specify which client to send the message to.

<code> import \* as ws from ‘ws’; import { v4 as uuidv4 } from ‘uuid’;

export class WebSocketServer { private \_wss: ws.WebSocket.Server | undefined; private \_port: number = 54321; private \_url: string = `ws://localhost:${this._port}`; private \_clients: Map<string, ws> = new Map(); private \_latestClientID: string | undefined;

    public start() {
        this._wss = new ws.WebSocket.Server({ port: this._port });
    
        this._wss.on('connection', (ws) => {
            const clientID = uuidv4();
            this._clients.set(clientID, ws);
            this._latestClientID = clientID;
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
                if (latestClient) latestClient.send(message);
            }
        } else if (kind === "all") {
            this.sendToClients(message);
        } else if (kind === "specific") {
            if (clientID) {
                const specificClient = this._clients.get(clientID);
                if (specificClient) specificClient.send(message);
            }
        }
    }
    

Copy

} </code>

> Great! But you should do following improvements:
> [1] When the websocket server in vscode extension is stopped, it should delete the clients in the descending order that they are connected.
> [2] Use shorter client ID.

Here is an updated version of the code that implements the requested improvements:

\[1\] When the websocket server in vscode extension is stopped, it should delete the clients in the descending order that they are connected:

-   I added a `clientOrder` array to keep track of the order in which clients are connected.
-   In the `stop` method, I updated the code to close and delete the clients in reverse order.

\[2\] Use shorter client ID:

-   Instead of using `uuid`, I used a simple counter to generate shorter client IDs.

<code> import \* as ws from ‘ws’;

export class WebSocketServer { private \_wss: ws.WebSocket.Server | undefined; private \_port: number = 54321; private \_url: string = `ws://localhost:${this._port}`; private \_clients: Map<string, ws> = new Map(); private \_latestClientID: string | undefined; private \_clientOrder: string\[\] = \[\]; private \_clientIDCounter: number = 0;

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
                if (latestClient) latestClient.send(message);
            }
        } else if (kind === "all") {
            this.sendToClients(message);
        } else if (kind === "specific") {
            if (clientID) {
                const specificClient = this._clients.get(clientID);
                if (specificClient) specificClient.send(message);
            }
        }
    }
    

Copy

} </code>