// ==UserScript==
// @name         VSCode Extension Connector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Communicate with vscode extension from tampermonkey script
// @author       Hansimov
// @match        *://www.bing.com/search*
// @exclude      *://www.bing.com/search?show*
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

    function monitorBingChat() {
        let cib_chat_main = null;
        const intervalId = setInterval(() => {
            try {
                cib_chat_main = document.querySelector(".cib-serp-main").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main");
            } catch (error) {
                // console.log("Bing Chat Not Found ...");
            }

            if (cib_chat_main) {
                console.log(`Bing Chat Found!`);
                console.log(cib_chat_main);
                clearInterval(intervalId);
                cib_chat_turns = cib_chat_main.querySelectorAll("cib-chat-turn");
                const cib_chat_main_observer = new MutationObserver((mutations) => {
                    mutations.forEach(mutation => {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach(node => {
                                if (node.nodeName === 'CIB-CHAT-TURN') {
                                    console.log('New cib-chat-turn node added:', node);
                                }
                            });
                        }
                    });
                });
                const cib_chat_main_observer_config = { childList: true, subtree: true };
                cib_chat_main_observer.observe(cib_chat_main, cib_chat_main_observer_config);
            }
        }, 1000);
    }

    window.addEventListener('load', () => {
        monitorBingChat();
    });

})();



