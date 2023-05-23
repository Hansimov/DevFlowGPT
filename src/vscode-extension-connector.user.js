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

/* eslint-disable @typescript-eslint/naming-convention */

(function () {
    const port = 54321;
    const ws_url = `ws://127.0.0.1:${port}/`;
    let ws = null;

    function connect() {
        // WebSocket Client
        ws = new WebSocket(ws_url);
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

    function recordChanges(parentNode, childNode) {
        // console.log(`Parent '${parentNode.nodeName}':`, parentNode);
        console.log(`'${childNode.nodeName}':`, childNode);
    }

    const mutationServerCallback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (node.nodeName === "CIB-CHAT-TURN") {
                    // Observe added CIB-CHAT-TURN nodes here
                } else if (node.nodeName === "CIB-MESSAGE-GROUP") {
                    // Observe added CIB-MESSAGE-GROUP nodes here
                } else if (node.nodeName === "CIB-MESSAGE") {
                    // Observe added CIB-MESSAGE nodes here
                }
            } else if (mutation.type === 'characterData') {
                console.log(mutation.target.data);
            }
        }
    };

    const observer = new MutationObserver(mutationServerCallback);
    const observerDefaultConfig = { childList: true, subtree: true, characterData: true };
    observer.observe(cibChatMainNode, observerDefaultConfig);


    function monitorBingChat() {
        let cib_chat_main = null;
        const intervalId = setInterval(() => {
            try {
                cib_chat_main = document.querySelector(".cib-serp-main").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main");
            } catch (error) {
                // console.log("Bing Chat Not Found ...");
            }

            if (cib_chat_main) {
                clearInterval(intervalId);
                console.log("cib-chat-main found:", cib_chat_main);
                addMutationObserver(cib_chat_main, "CIB-CHAT-TURN", recordChanges,
                    (cib_chat_turn) => addMutationObserver(cib_chat_turn.shadowRoot, "CIB-MESSAGE-GROUP", recordChanges,
                        (cib_message_group) => addMutationObserver(cib_message_group.shadowRoot, "CIB-MESSAGE", recordChanges,
                            (cib_message) => {

                            }
                        )
                    )
                );
            }
        }, 1000);
    }

    window.addEventListener('load', () => {
        monitorBingChat();
    });

})();



