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

    // Create a WebSocket connection
    let ws = new WebSocket(ws_url);

    // Connection opened
    ws.addEventListener('open', function (event) {
        // Send a message to the VSCode extension
        // console.log('> Sending message to VSCode extension ...');
        console.log(`√ Server connected on: ${ws_url}`);
        ws.send('Hello from Tampermonkey!');
    });

    // Listen for messages from the VSCode extension
    ws.addEventListener('message', function (event) {
        console.log('> Received message from VSCode extension:', event.data);
    });

    ws.addEventListener('error', function (event) {
        console.log('× Error:', event);
    });

    ws.addEventListener('close', function (event) {
        console.log(`√ Server closed on: ${ws_url}`);
    });


})();

