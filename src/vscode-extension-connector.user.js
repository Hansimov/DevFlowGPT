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

    function recordChanges(parentNode, childNode) {
        // console.log(`Parent '${parentNode.nodeName}':`, parentNode);
        console.log(`'${childNode.nodeName}':`, childNode);
    }

    function addMutationObserver(parentNode, childNodeName, callback, childCallback = null, options = { childList: true, subtree: true }, useShadowRoot = true) {
        let root = null;
        if (useShadowRoot) {
            root = parentNode.shadowRoot || parentNode;
        } else {
            root = parentNode;
        }
        const existingChildNodes = root.querySelectorAll(childNodeName);
        existingChildNodes.forEach(node => {
            callback(parentNode, node);
            if (childCallback) {
                childCallback(node);
            }
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === childNodeName) {
                            callback(parentNode, node);
                            if (childCallback) {
                                childCallback(node);
                            }
                        }
                    });
                }
            });
        });
        observer.observe(parentNode, options);
    }

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
                                const type = cib_message.getAttribute('type');
                                if (type === 'meta') {
                                    addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                                        if (node.classList.contains('meta-text')) {
                                            recordChanges(parentNode, node);
                                        }
                                    }, null, { childList: true, subtree: true });
                                } else if (type === 'text') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
                                            if (node.classList.contains('content')) {
                                                recordChanges(parentNode, node);
                                            }
                                        }, null, { childList: true, subtree: true }, useShadowRoot = false);
                                    }
                                } else if (type === 'host') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
                                    }
                                }
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



