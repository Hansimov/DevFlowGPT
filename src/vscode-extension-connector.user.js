// ==UserScript==
// @name         VSCode Extension Connector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Communicate with vscode extension from tampermonkey script
// @author       Hansimov
// @match        *://www.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// @require      file://C:/_codes/GPT-DevFlow/src/vscode-extension-connector.user.js
// ==/UserScript==

(function () {
    const port = 54321;
    const ws_url = `ws://127.0.0.1:${port}/`;

    function connect() {
        // WebSocket Client
        let ws = new WebSocket(ws_url);

        ws.addEventListener('open', function (event) {
            console.log(`√ [Connected server]: ${ws_url}`);
            ws.send('Hello from TamperMonkey!');
        });

        ws.addEventListener('message', function (event) {
            console.log('> [Received]:', event.data);
        });

        ws.addEventListener('error', function (event) {
            console.log('× [Error]:', event);
        });

        ws.addEventListener('close', function (event) {
            console.log(`√ [Closed server]: ${ws_url}`);
            setTimeout(connect, 1000);
        });
    }

    connect();
})();

