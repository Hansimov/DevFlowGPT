// ==UserScript==
// @name         VSCode Extension Connector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Communicate with vscode extension from tampermonkey script
// @author       Hansimov
// @match        *://www.bing.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// @require      file://C:/_codes/GPT-DevFlow/src/vscode-extension-connector.user.js
// ==/UserScript==

(function () {
    const port = 54321;
    const ws_url = `ws://127.0.0.1:${port}/`;

    function monitorBingChat() {
        let targetNode = null;
        const intervalId = setInterval(() => {
            try {
                targetNode = document.querySelector(".cib-serp-main").shadowRoot
                    .querySelector("#cib-conversation-main").shadowRoot
                    .querySelector("#cib-chat-main > cib-chat-turn").shadowRoot;
                // console.log(`targetNode: ${targetNode}`);
            } catch (error) {
                // console.log("Bing Chat Not Found ...");
            }

            if (targetNode) {
                console.log(`Bing Chat Found!`);
                clearInterval(intervalId);
                // Create an observer instance
                const observer = new MutationObserver((mutationsList, observer) => {
                    // Loop through the list of mutations
                    for (const mutation of mutationsList) {
                        // Check if nodes were added or removed
                        if (mutation.addedNodes.length > 0) {
                            console.log('Nodes added:', mutation.addedNodes);
                        } else if (mutation.removedNodes.length > 0) {
                            console.log('Nodes removed:', mutation.removedNodes);
                        }
                    }
                });

                // Options for the observer (which mutations to observe)
                const config = { childList: true, subtree: true };

                // Start observing the target node for configured mutations
                observer.observe(targetNode, config);
            }
        }, 1000);
    }

    function connect() {
        // WebSocket Client
        let ws = new WebSocket(ws_url);
        let this_url = window.location.href;

        ws.addEventListener('open', function (event) {
            console.log(`√ [Connected server]: ${ws_url}`);
            ws.send(`Hello from TM: ${this_url}`);
        });

        ws.addEventListener('message', function (event) {
            console.log('> [Client] [Received]:', event.data);
        });

        ws.addEventListener('error', function (event) {
            console.log('× [Client] [Error]:', event);
        });

        ws.addEventListener('close', function (event) {
            console.log(`√ [Client]: Server closed.`);
            ws.send(`√ [Closed Client]: ${this_url}`);
            setTimeout(connect, 1000);
        });
    }

    connect();
    window.addEventListener('load', () => {
        monitorBingChat();
    });

})();



