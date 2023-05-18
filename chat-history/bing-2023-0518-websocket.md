# 



> Below is typescript codes for creating a websocket server in vscode extension.
> What if I want to use the instance created from WebSocketServer class in other scripts?
> 
> <code>
> import * as ws from 'ws';
> 
> export class WebSocketServer {
>     private _wss: ws.WebSocket.Server | undefined;
>     private _port: number = 54321;
>     private _url: string = `ws://127.0.0.1:${this._port}/`;
> 
>     public start() {
>         this._wss = new ws.WebSocket.Server({ port: this._port });
> 
>         this._wss.on('connection', (ws) => {
>             console.log(`√ Client connected: ${this._url}`);
> 
>             ws.on('message', (message) => {
>                 console.log('> Received message from client:', message.toString());
>             });
> 
>             ws.send('Hello from VSCode extension!');
>             ws.on('error', (error) => {
>                 console.log(`× Error: ${error}`);
>             });
> 
>             ws.on('close', () => {
>                 console.log(`√ Client closed: ${this._url}`);
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
> }
> </code>

You can export the instance of the `WebSocketServer` class and import it in other scripts. This will allow you to use the same instance of the `WebSocketServer` class in multiple scripts. Here’s an example:

In the script where you create the instance of `WebSocketServer`:

    import { WebSocketServer } from './WebSocketServer';
    
    const webSocketServer = new WebSocketServer();
    webSocketServer.start();
    
    export { webSocketServer };
    

Copy

In another script where you want to use the same instance of `WebSocketServer`:

    import { webSocketServer } from './script1';
    
    // Use webSocketServer here
    

Copy

This way, you can use the same instance of `WebSocketServer` in multiple scripts. Is this what you were looking for?

> Great! Then how to send message to client which is connected to this websocket server?

You can send a message to the client connected to the WebSocket server by calling the `send` method on the `WebSocket` object representing the connection to the client. Here’s an example:

    import * as ws from 'ws';
    
    export class WebSocketServer {
        private _wss: ws.WebSocket.Server | undefined;
        private _port: number = 54321;
        private _url: string = `ws://127.0.0.1:${this._port}/`;
        private _clients: Set<ws> = new Set();
    
        public start() {
            this._wss = new ws.WebSocket.Server({ port: this._port });
    
            this._wss.on('connection', (ws) => {
                this._clients.add(ws);
                console.log(`√ Client connected: ${this._url}`);
    
                ws.on('message', (message) => {
                    console.log('> Received message from client:', message.toString());
                });
    
                ws.send('Hello from VSCode extension!');
                ws.on('error', (error) => {
                    console.log(`× Error: ${error}`);
                });
    
                ws.on('close', () => {
                    this._clients.delete(ws);
                    console.log(`√ Client closed: ${this._url}`);
                });
            });
        }
    
        public stop() {
            if (this._wss) {
                this._wss.close();
                this._wss = undefined;
            }
        }
    
        public sendMessageToClients(message: string) {
            for (const client of this._clients) {
                client.send(message);
            }
        }
    }
    

Copy

In the above example, we added a new method `sendMessageToClients` to the `WebSocketServer` class. This method takes a message as an argument and sends it to all connected clients by calling the `send` method on each `WebSocket` object representing a connection to a client.

You can call this method from another script where you have imported the instance of `WebSocketServer` to send a message to all connected clients. Is this what you were looking for?

> Here is the code for websocket client in TamperMonkey.
> How to keep websocket client alive?
> 
> <code>
> (function () {
>     const port = 54321;
>     const ws_url = `ws://127.0.0.1:${port}/`;
> 
>     // WebSocket Client
>     let ws = new WebSocket(ws_url);
> 
>     ws.addEventListener('open', function (event) {
>         console.log(`√ Connected server: ${ws_url}`);
>         ws.send('Hello from TamperMonkey!');
>     });
> 
>     ws.addEventListener('message', function (event) {
>         console.log('> Received:', event.data);
>     });
> 
>     ws.addEventListener('error', function (event) {
>         console.log('× Error:', event);
>     });
> 
>     ws.addEventListener('close', function (event) {
>         console.log(`√ Closed server: ${ws_url}`);
>     });
> 
> })();
> </code>

You can keep the WebSocket client alive by automatically reconnecting to the server when the connection is closed. Here’s an example of how you can do this:

    (function () {
        const port = 54321;
        const ws_url = `ws://127.0.0.1:${port}/`;
    
        function connect() {
            // WebSocket Client
            let ws = new WebSocket(ws_url);
    
            ws.addEventListener('open', function (event) {
                console.log(`√ Connected server: ${ws_url}`);
                ws.send('Hello from TamperMonkey!');
            });
    
            ws.addEventListener('message', function (event) {
                console.log('> Received:', event.data);
            });
    
            ws.addEventListener('error', function (event) {
                console.log('× Error:', event);
            });
    
            ws.addEventListener('close', function (event) {
                console.log(`√ Closed server: ${ws_url}`);
                setTimeout(connect, 1000);
            });
        }
    
        connect();
    })();
    

Copy

In the above example, we added a new function `connect` that creates a new `WebSocket` object and sets up the event listeners. We also added a `close` event listener that calls the `connect` function after a delay of 1 second when the connection is closed. This will automatically reconnect to the server and keep the WebSocket client alive.

Is this what you were looking for?

> In the `extension.ts` of vscode extension which creates the websocket server,
> this line `ws.sendMessageToClients()` does not send the message.
> Please fix the issue.
> 
> <code>
> let ws = new WebSocketServer();
> ws.start();
> ws.sendMessageToClients("New Message from VSC");
> </code>

Based on the code you provided, it seems that you are calling the `sendMessageToClients` method immediately after starting the WebSocket server. It’s possible that no clients have connected to the server yet when you call this method, so the message is not sent to any clients.

You can try adding a delay before calling the `sendMessageToClients` method to give clients time to connect to the server. Here’s an example:

    let ws = new WebSocketServer();
    ws.start();
    
    setTimeout(() => {
        ws.sendMessageToClients("New Message from VSC");
    }, 5000);
    

Copy

In the above example, we added a delay of 5 seconds before calling the `sendMessageToClients` method. This will give clients time to connect to the server before sending the message.

Is this what you were looking for?

> Great! But I would like to send message to client util the connection is established.

You can achieve this by adding an event listener for the `connection` event on the WebSocket server and calling the `sendMessageToClients` method when a new client connects. Here’s an example:

    import * as ws from 'ws';
    
    export class WebSocketServer {
        private _wss: ws.WebSocket.Server | undefined;
        private _port: number = 54321;
        private _url: string = `ws://127.0.0.1:${this._port}/`;
        private _clients: Set<ws> = new Set();
    
        public start() {
            this._wss = new ws.WebSocket.Server({ port: this._port });
    
            this._wss.on('connection', (ws) => {
                this._clients.add(ws);
                console.log(`√ Client connected: ${this._url}`);
    
                ws.on('message', (message) => {
                    console.log('> Received message from client:', message.toString());
                });
    
                ws.send('Hello from VSCode extension!');
                ws.on('error', (error) => {
                    console.log(`× Error: ${error}`);
                });
    
                ws.on('close', () => {
                    this._clients.delete(ws);
                    console.log(`√ Client closed: ${this._url}`);
                });
    
                this.sendMessageToClients("New Message from VSC");
            });
        }
    
        public stop() {
            if (this._wss) {
                this._wss.close();
                this._wss = undefined;
            }
        }
    
        public sendMessageToClients(message: string) {
            for (const client of this._clients) {
                client.send(message);
            }
        }
    }
    

Copy

In the above example, we added a call to the `sendMessageToClients` method inside the `connection` event listener. This will send the message to all connected clients whenever a new client connects to the server.

Is this what you were looking for?

> Fine. But I would like to use the `sendMessageToClients()` in `extension.ts`, and also send once the connection is successfully established.

You can achieve this by adding a callback function as an argument to the `start` method of the `WebSocketServer` class. This callback function will be called when a new client connects to the server. Here’s an example:

    import * as ws from 'ws';
    
    export class WebSocketServer {
        private _wss: ws.WebSocket.Server | undefined;
        private _port: number = 54321;
        private _url: string = `ws://127.0.0.1:${this._port}/`;
        private _clients: Set<ws> = new Set();
    
        public start(onConnection: () => void) {
            this._wss = new ws.WebSocket.Server({ port: this._port });
    
            this._wss.on('connection', (ws) => {
                this._clients.add(ws);
                console.log(`√ Client connected: ${this._url}`);
    
                ws.on('message', (message) => {
                    console.log('> Received message from client:', message.toString());
                });
    
                ws.send('Hello from VSCode extension!');
                ws.on('error', (error) => {
                    console.log(`× Error: ${error}`);
                });
    
                ws.on('close', () => {
                    this._clients.delete(ws);
                    console.log(`√ Client closed: ${this._url}`);
                });
    
                onConnection();
            });
        }
    
        public stop() {
            if (this._wss) {
                this._wss.close();
                this._wss = undefined;
            }
        }
    
        public sendMessageToClients(message: string) {
            for (const client of this._clients) {
                client.send(message);
            }
        }
    }
    

Copy

In the above example, we added a new argument `onConnection` to the `start` method of the `WebSocketServer` class. This argument is a callback function that will be called when a new client connects to the server.

You can use this callback function to call the `sendMessageToClients` method from `extension.ts`. Here’s an example:

    let ws = new WebSocketServer();
    ws.start(() => {
        ws.sendMessageToClients("New Message from VSC");
    });
    

Copy

In the above example, we passed a callback function to the `start` method that calls the `sendMessageToClients` method when a new client connects to the server.

Is this what you were looking for?