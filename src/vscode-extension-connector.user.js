// ==UserScript==
// @name         VSCode Extension Connector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Communicate with vscode extension from tampermonkey script
// @author       Hansimov
// @match        *://www.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        GM_xmlhttpRequest
// @require      file://C:/_codes/GPT-DevFlow/src/vscode-extension-connector.user.js
// ==/UserScript==

const localScriptPath = 'http://localhost:54322/src/vscode-extension-connector.user.js';

function reloadLocalScript() {
    console.log("Reloaded");
    GM_xmlhttpRequest({
        method: 'GET',
        url: localScriptPath,
        onload: response => {
            // eval(response.responseText);
            console.log("Onload...");
            console.log("VSCode Extension Connector Activated!");
            // fetch('http://localhost:54321', {
            //     method: 'POST',
            //     body: JSON.stringify({ message: 'Hello from Tampermonkey!' }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         // Handle response data here
            //         console.log(data);
            //     });
        }
    });
}



document.addEventListener('keydown', event => {
    if (event.key === 'F2') {
        reloadLocalScript();
    }
});