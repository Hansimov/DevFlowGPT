# 



> Below is a minimal codes for adding mutation observer to the `observedNode` and monitor if any changes to its child nodes named `nodeName`.
> But there is a bug that if there is an existed child node named `nodeName`, then this child would not be monitored. Please fix this bug.
> 
> ```
>     function addMutationObserver(observedNode, nodeName, options = { childList: true, subtree: true }) {
>         const observer = new MutationObserver((mutations) => {
>             mutations.forEach(mutation => {
>                 if (mutation.type === 'childList') {
>                     mutation.addedNodes.forEach(node => {
>                         if (node.nodeName === nodeName) {
>                             console.log(`New ${nodeName} node added:`, node);
>                         }
>                     });
>                 }
>             });
>         });
>         observer.observe(observedNode, options);
>     }
> ```

The code you provided only logs new nodes that are added to the `observedNode` after the observer is attached. If you want to monitor existing child nodes named `nodeName`, you can add a function to check for them before attaching the observer. Here’s an example:

    function addMutationObserver(observedNode, nodeName, options = { childList: true, subtree: true }) {
        // Check for existing child nodes named nodeName
        observedNode.querySelectorAll(nodeName).forEach(node => {
            console.log(`Existing ${nodeName} node:`, node);
        });
    
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === nodeName) {
                            console.log(`New ${nodeName} node added:`, node);
                        }
                    });
                }
            });
        });
        observer.observe(observedNode, options);
    }
    

Copy

This should log both existing and newly added child nodes named `nodeName`. Is this what you were looking for? Let me know if you have any questions. 😊

> Do following steps before improve my codes:
> [1] List all attributes of `mutation` type.
> 
> Then do following improvements:
> [1] I would like to observe the existed node in mutation too.

The `MutationRecord` interface represents an individual DOM mutation. It has the following attributes:

-   `type`: A string representing the type of mutation that occurred. Possible values are `"attributes"`, `"characterData"`, and `"childList"`.
-   `target`: The node affected by the mutation.
-   `addedNodes`: A `NodeList` representing the nodes added.
-   `removedNodes`: A `NodeList` representing the nodes removed.
-   `previousSibling`: The previous sibling of the added or removed nodes, or `null`.
-   `nextSibling`: The next sibling of the added or removed nodes, or `null`.
-   `attributeName`: The local name of the changed attribute, or `null`.
-   `attributeNamespace`: The namespace of the changed attribute, or `null`.
-   `oldValue`: The previous value of the attribute or character data before the change, or `null`.

To observe existing child nodes named `nodeName`, you can modify the code I provided earlier to include a check for existing child nodes before attaching the observer. Here’s an updated version:

    function addMutationObserver(observedNode, nodeName, options = { childList: true, subtree: true }) {
        // Check for existing child nodes named nodeName
        observedNode.querySelectorAll(nodeName).forEach(node => {
            console.log(`Existing ${nodeName} node:`, node);
        });
    
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === nodeName) {
                            console.log(`New ${nodeName} node added:`, node);
                        }
                    });
                }
            });
        });
        observer.observe(observedNode, options);
    }
    

Copy

This should log both existing and newly added child nodes named `nodeName`. Is this what you were looking for? Let me know if you have any questions. 😊

> Suppose I have a function `recordChanges()`, Please use this function to replace the `console.log(...);` in codes above.

Sure! Here’s an updated version of the code that uses the `recordChanges` function instead of `console.log`:

    function addMutationObserver(observedNode, nodeName, options = { childList: true, subtree: true }) {
        // Check for existing child nodes named nodeName
        observedNode.querySelectorAll(nodeName).forEach(node => {
            recordChanges(`Existing ${nodeName} node:`, node);
        });
    
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === nodeName) {
                            recordChanges(`New ${nodeName} node added:`, node);
                        }
                    });
                }
            });
        });
        observer.observe(observedNode, options);
    }
    

Copy

This version of the code calls the `recordChanges` function with the same arguments as the previous `console.log` calls. You can modify the arguments passed to `recordChanges` as needed. Let me know if you have any questions. 😊

> Great! Now I want to pass the `recordChanges()` as the `callback` parameter in function `addMutationObserver`.
> Please improve the codes for me.
> 
> ```
> function recordChanges(nodeName, node) {
>     console.log(`New ${nodeName} node found:`, node);
> }
> ```
> 
> ```   
> function addMutationObserver(observedNode, nodeName, callback, options = { childList: true, subtree: true })
> ```

Sure! Here’s an updated version of the `addMutationObserver` function that takes a `callback` parameter and uses it to log changes:

    function addMutationObserver(observedNode, nodeName, callback, options = { childList: true, subtree: true }) {
        // Check for existing child nodes named nodeName
        observedNode.querySelectorAll(nodeName).forEach(node => {
            callback(`Existing ${nodeName} node:`, node);
        });
    
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === nodeName) {
                            callback(`New ${nodeName} node added:`, node);
                        }
                    });
                }
            });
        });
        observer.observe(observedNode, options);
    }
    

Copy

You can use this version of the `addMutationObserver` function with the `recordChanges` function you provided like this:

    addMutationObserver(observedNode, nodeName, recordChanges);
    

Copy

This will pass the `recordChanges` function as the `callback` parameter to `addMutationObserver`, and it will be called to log changes to the `observedNode`. Let me know if you have any questions. 😊

> In TypeScript, How to pass some parameters by default when passing the callback function?
> Please explain with several code examples.

In TypeScript, you can pass default parameters to a callback function by wrapping the callback in an arrow function and passing the default parameters as arguments to the callback. Here’s an example:

    function myCallback(param1: string, param2: number) {
        console.log(`param1: ${param1}, param2: ${param2}`);
    }
    
    function myFunction(callback: (param1: string, param2: number) => void) {
        callback('default value', 42);
    }
    
    myFunction(myCallback); // logs "param1: default value, param2: 42"
    
    myFunction((param1, param2) => myCallback('overridden value', param2)); // logs "param1: overridden value, param2: 42"
    

Copy

In this example, the `myFunction` function takes a callback as a parameter and calls it with two default arguments: `'default value'` and `42`. When calling `myFunction` with the `myCallback` function as an argument, the callback is called with these default values.

If you want to override one or more of the default values when calling `myFunction`, you can wrap the `myCallback` function in an arrow function and pass the overridden values as arguments to `myCallback`. In the second call to `myFunction`, we override the first default value by passing `'overridden value'` as the first argument to `myCallback`, while still using the second default value by passing `param2` as the second argument.

You can use this technique to pass any number of default parameters to a callback function in TypeScript. Let me know if you have any questions. 😊

> I have two functions here, `addMutationObserver` is to add mutation observer to `parentNode`, while `monitorBingChat` is to monitor the changes of nodes in DOM.
> Now I want to use `addMutationObserver` for the `childNode` in the function ``addMutationObserver`, which might be something like:
> 
> ```
> addMutationObserver(cib_chat_main, "CIB-CHAT-TURN",
>     (addMutationObserver(cib_chat_turn, "CIB-MESSAGE-GROUP", recordChanges) => {
>         console.log("New cib-chat-turn node added:", node);
>     })
> )
> ```
> 
> Please implement this feature and improve for me.
> 
> Below are my current codes for your information:
> 
> ```
>     function addMutationObserver(parentNode, childNodeName, callback, options = { childList: true, subtree: true }) {
>         const existingChildNodes = parentNode.querySelectorAll(childNodeName);
>         existingChildNodes.forEach(node => {
>             callback(parentNode, node);
>         });
> 
>         const observer = new MutationObserver((mutations) => {
>             mutations.forEach(mutation => {
>                 if (mutation.type === 'childList') {
>                     mutation.addedNodes.forEach(node => {
>                         if (node.nodeName === nodeName) {
>                             callback(parentNode, node);
>                         }
>                     });
>                 }
>             });
>         });
>         observer.observe(parentNode, options);
>     }
> 
>     function monitorBingChat() {
>         let cib_chat_main = null;
>         const intervalId = setInterval(() => {
>             try {
>                 cib_chat_main = document.querySelector(".cib-serp-main").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main");
>             } catch (error) {
>                 // console.log("Bing Chat Not Found ...");
>             }
> 
>             if (cib_chat_main) {
>                 clearInterval(intervalId);
>                 console.log("cib-chat-main found:", cib_chat_main);
>                 addMutationObserver(cib_chat_main, "CIB-CHAT-TURN", recordChanges); // Improve Here
>             }
>         }, 1000);
>     }
> ```

If you want to use the `addMutationObserver` function to monitor changes to both `CIB-CHAT-TURN` and `CIB-MESSAGE-GROUP` nodes, you can modify the `addMutationObserver` function to take an additional `childCallback` parameter that is called when a new `CIB-CHAT-TURN` node is added. Here’s an example:

    function addMutationObserver(parentNode, childNodeName, callback, childCallback = null, options = { childList: true, subtree: true }) {
        const existingChildNodes = parentNode.querySelectorAll(childNodeName);
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
                    (cib_chat_turn) => addMutationObserver(cib_chat_turn, "CIB-MESSAGE-GROUP", recordChanges)
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, the `addMutationObserver` function takes an additional `childCallback` parameter that is called with the newly added `CIB-CHAT-TURN` node as an argument. When calling `addMutationObserver` from the `monitorBingChat` function, we pass an arrow function as the `childCallback` parameter that calls `addMutationObserver` again with the newly added `CIB-CHAT-TURN` node as the `parentNode`, `"CIB-MESSAGE-GROUP"` as the `childNodeName`, and `recordChanges` as the `callback`.

This will add a new mutation observer to each newly added `CIB-CHAT-TURN` node that monitors changes to its `CIB-MESSAGE-GROUP` child nodes and calls the `recordChanges` function when a new `CIB-MESSAGE-GROUP` node is added.

Let me know if this is what you were looking for or if you have any questions. 😊

> Great! But I forget to tell you that, the "CIB-MESSAGE-GROUP" nodes are not directly under "CIB-CHAT-TURN" nodes, but under the `shadowRoot` of "CIB-CHAT-TURN" nodes.
> Please modify your codes to handle this case.

If the `CIB-MESSAGE-GROUP` nodes are located in the `shadowRoot` of the `CIB-CHAT-TURN` nodes, you can modify the `addMutationObserver` function to check for the existence of a `shadowRoot` property on the `parentNode` and use it to query for child nodes if it exists. Here’s an example:

    function addMutationObserver(parentNode, childNodeName, callback, childCallback = null, options = { childList: true, subtree: true }) {
        const root = parentNode.shadowRoot || parentNode;
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
                    (cib_chat_turn) => addMutationObserver(cib_chat_turn.shadowRoot, "CIB-MESSAGE-GROUP", recordChanges)
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, the `addMutationObserver` function checks for the existence of a `shadowRoot` property on the `parentNode` and uses it as the root for querying for child nodes if it exists. If the `shadowRoot` property does not exist, it falls back to using the `parentNode` itself as the root.

When calling `addMutationObserver` from the `monitorBingChat` function, we pass an arrow function as the `childCallback` parameter that calls `addMutationObserver` again with the `shadowRoot` property of the newly added `CIB-CHAT-TURN` node as the `parentNode`, `"CIB-MESSAGE-GROUP"` as the `childNodeName`, and `recordChanges` as the `callback`.

This will add a new mutation observer to each newly added `CIB-CHAT-TURN` node that monitors changes to its `CIB-MESSAGE-GROUP` child nodes in its `shadowRoot` and calls the `recordChanges` function when a new `CIB-MESSAGE-GROUP` node is added.

Let me know if this is what you were looking for or if you have any questions. 😊

> Great, You solution works!
> Now I would like to add mutation observer for "CIB-MESSAGE-GROUP", and the child node name is "CIG-MESSAGE".

If you want to add a mutation observer for `CIB-MESSAGE-GROUP` nodes and monitor changes to their `CIG-MESSAGE` child nodes, you can modify the `childCallback` parameter passed to the `addMutationObserver` function when calling it from the `monitorBingChat` function. Here’s an example:

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
                        (cib_message_group) => addMutationObserver(cib_message_group.shadowRoot, "CIG-MESSAGE", recordChanges)
                    )
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, we pass an additional arrow function as the `childCallback` parameter when calling `addMutationObserver` with `"CIB-MESSAGE-GROUP"` as the `childNodeName`. This arrow function calls `addMutationObserver` again with the `shadowRoot` property of the newly added `CIB-MESSAGE-GROUP` node as the `parentNode`, `"CIG-MESSAGE"` as the `childNodeName`, and `recordChanges` as the `callback`.

This will add a new mutation observer to each newly added `CIB-MESSAGE-GROUP` node that monitors changes to its `CIG-MESSAGE` child nodes in its `shadowRoot` and calls the `recordChanges` function when a new `CIG-MESSAGE` node is added.

Let me know if this is what you were looking for or if you have any questions. 😊

> Great! Let's keep moving forward.
> Now I would like to add mutation observer for "CIB-MESSAGE" nodes.
> The `type` of "cib-message" nodes could be "meta", "text" and "host", for each shadowRoot of "cib-message" nodes:
> [1] If type is "meta", we need to observe child div with classname "meta-text".
> [2] If type is "text", we need to observe the div with class "content" under the node named "cib-shared".
> [3] If type is "host", we need to observe the "iframe" element under the node named "cib-shared".

If you want to add a mutation observer for `CIB-MESSAGE` nodes and monitor changes to their child nodes based on their `type` attribute, you can modify the `childCallback` parameter passed to the `addMutationObserver` function when calling it from the `monitorBingChat` function. Here’s an example:

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
                                    addMutationObserver(cib_message.shadowRoot, "DIV", recordChanges, null, { childList: true, subtree: true, attributes: false, attributeFilter: ['class'], attributeOldValue: false });
                                } else if (type === 'text') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared.shadowRoot, "DIV", recordChanges, null, { childList: true, subtree: true, attributes: false, attributeFilter: ['class'], attributeOldValue: false });
                                    }
                                } else if (type === 'host') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared.shadowRoot, "IFRAME", recordChanges);
                                    }
                                }
                            }
                        )
                    )
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, we pass an additional arrow function as the `childCallback` parameter when calling `addMutationObserver` with `"CIB-MESSAGE"` as the `childNodeName`. This arrow function checks the value of the `type` attribute on the newly added `CIB-MESSAGE` node and calls `addMutationObserver` with different arguments depending on its value.

If the `type` attribute is `"meta"`, we call `addMutationObserver` with the `shadowRoot` property of the newly added `CIB-MESSAGE` node as the `parentNode`, `"DIV"` as the `childNodeName`, and `recordChanges` as the `callback`. This will add a new mutation observer that monitors changes to `DIV` elements in the `shadowRoot` of the newly added `CIB-MESSAGE` node and calls the `recordChanges` function when a new `DIV` element is added.

If the `type` attribute is `"text"`, we query for a `CIB-SHARED` element in the `shadowRoot` of the newly added `CIB-MESSAGE` node and call `addMutationObserver` with its `shadowRoot` property as the `parentNode`, `"DIV"` as the `childNodeName`, and `recordChanges` as the `callback`. This will add a new mutation observer that monitors changes to `DIV` elements in the `shadowRoot` of the found `CIB-SHARED` element and calls the `recordChanges` function when a new `DIV` element is added.

If the `type` attribute is `"host"`, we query for a `CIB-SHARED` element in the shadowRoot of the newly added CIB-MESSAGE node and call addMutationObserver with its shadowRoot property as the parentNode, “IFRAME” as the childNodeName, and recordChanges as the callback. This will add a new mutation observer that monitors changes to IFRAME elements in the shadowRoot of the found CIB-SHARED element and calls the recordChanges function when a new IFRAME element is added.

Let me know if this is what you were looking for or if you have any questions. 😊

> Your solution gives me the following error:
> 
> ```
> Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': The options object may only set 'attributeFilter' when 'attributes' is true or not present.
>  ```

The error message you’re seeing indicates that the `options` object passed to the `observe` method of a `MutationObserver` instance is invalid because it sets the `attributeFilter` property while the `attributes` property is set to `false`. According to the [MutationObserver documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe), the `attributeFilter` property can only be set if the `attributes` property is either `true` or not present in the `options` object.

To fix this issue, you can either remove the `attributes: false` property from the `options` object passed to the `observe` method, or remove the `attributeFilter` property. Here’s an example that removes the `attributes: false` property:

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
                                    addMutationObserver(cib_message.shadowRoot, "DIV", recordChanges, null, { childList: true, subtree: true, attributeFilter: ['class'], attributeOldValue: false });
                                } else if (type === 'text') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared.shadowRoot, "DIV", recordChanges, null, { childList: true, subtree: true, attributeFilter: ['class'], attributeOldValue: false });
                                    }
                                } else if (type === 'host') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared.shadowRoot, "IFRAME", recordChanges);
                                    }
                                }
                            }
                        )
                    )
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, we removed the `attributes: false` property from the `options` object passed to the `observe` method when calling `addMutationObserver` with `"DIV"` as the `childNodeName`. This should fix the error you’re seeing and allow you to observe changes to the specified attributes using the `attributeFilter` property.

Let me know if this fixes the issue or if you have any questions. 😊

> Great! Let me provide more details for the previous task.
> I would like to add mutation observer for "CIB-MESSAGE" nodes.
> The `type` of "cib-message" nodes could be "meta", "text" and "host", for each shadowRoot of "cib-message" nodes:
> [1] If type is "meta", we need to observe child div with classname "meta-text", and ignore other divs.
> [2] If type is "text", we need to observe the div with class "content" under the node named "cib-shared", and ignore other divs.
> [3] If type is "host", we need to observe the "iframe" element under the node named "cib-shared".

If you want to add a mutation observer for `CIB-MESSAGE` nodes and monitor changes to specific child nodes based on their `type` attribute and class name, you can modify the `childCallback` parameter passed to the `addMutationObserver` function when calling it from the `monitorBingChat` function. Here’s an example:

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
                                        addMutationObserver(cib_shared.shadowRoot, "DIV", (parentNode, node) => {
                                            if (node.classList.contains('content')) {
                                                recordChanges(parentNode, node);
                                            }
                                        }, null, { childList: true, subtree: true });
                                    }
                                } else if (type === 'host') {
                                    const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
                                    if (cib_shared) {
                                        addMutationObserver(cib_shared.shadowRoot, "IFRAME", recordChanges);
                                    }
                                }
                            }
                        )
                    )
                );
            }
        }, 1000);
    }
    

Copy

In this version of the code, we pass an additional arrow function as the `childCallback` parameter when calling `addMutationObserver` with `"CIB-MESSAGE"` as the `childNodeName`. This arrow function checks the value of the `type` attribute on the newly added `CIB-MESSAGE` node and calls `addMutationObserver` with different arguments depending on its value.

If the `type` attribute is `"meta"`, we call `addMutationObserver` with the `shadowRoot` property of the newly added `CIB-MESSAGE` node as the `parentNode`, `"DIV"` as the `childNodeName`, and an arrow function as the `callback`. This arrow function checks if the added `DIV` element has a class name of `"meta-text"` and calls the `recordChanges` function if it does. This will add a new mutation observer that monitors changes to `DIV` elements in the `shadowRoot` of the newly added `CIB-MESSAGE` node and calls the `recordChanges` function only when a new `DIV` element with a class name of `"meta-text"` is added.

If the `type` attribute is `"text"`, we query for a `CIB-SHARED` element in the shadowRoot of the newly added CIB-MESSAGE node and call addMutationObserver with its shadowRoot property as the parentNode, “DIV” as the childNodeName, and an arrow function as the callback. This arrow function checks if the added DIV element has a class name of “content” and calls the recordChanges function if it does. This will add a new mutation observer that monitors changes to DIV elements in the shadowRoot of the found CIB-SHARED element and calls the recordChanges function only when a new DIV element with a class name of “content” is added.

If the type attribute is “host”, we query for a CIB-SHARED element in the shadowRoot of the newly added CIB-MESSAGE node and call addMutationObserver with its shadowRoot property as the parentNode, “IFRAME” as the childNodeName, and recordChanges as the callback. This will add a new mutation observer that monitors changes to IFRAME elements in the shadowRoot of the found CIB-SHARED element and calls the recordChanges function when a new IFRAME element is added.

Let me know if this is what you were looking for or if you have any questions. 😊

> Great! Now I use the below codes to process `cib_message`.
> Please do following improvements for me:
> [1] Since the content of the `DIV` under `cib_shared` is generated word by word, so you should also print content of the to the console in DevTools as stream in real time without line breaks.
> [2] Refactor the codes to make it beautiful and well formatted.
> 
> ```
> (cib_message) => {
>     const type = cib_message.getAttribute('type');
>     if (type === 'meta') {
>         addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
>             if (node.classList.contains('meta-text')) {
>                 recordChanges(parentNode, node);
>             }
>         }, null, { childList: true, subtree: true });
>     } else if (type === 'text') {
>         const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
>         if (cib_shared) {
>             addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
>                 if (node.classList.contains('content')) {
>                     recordChanges(parentNode, node);
>                 }
>             }, null, { childList: true, subtree: true }, useShadowRoot = false);
>         }
>     } else if (type === 'host') {
>         const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
>         if (cib_shared) {
>             addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
>         }
>     }
> }
> ```

To print the content of the `DIV` element under `cib_shared` to the console in real-time without line breaks, you can modify the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value. Here’s an example:

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
                        console.log(node.textContent);
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
    

Copy

In this version of the code, we added a `console.log` call to the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value. This `console.log` call logs the `textContent` property of the added `DIV` element to the console in real-time without line breaks.

Here’s a refactored version of the code that is more readable and well-formatted:

    (cib_message) => {
        const type = cib_message.getAttribute('type');
        const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
    
        if (type === 'meta') {
            addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                if (node.classList.contains('meta-text')) {
                    recordChanges(parentNode, node);
                }
            }, null, { childList: true, subtree: true });
        } else if (type === 'text' && cib_shared) {
            addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
                if (node.classList.contains('content')) {
                    recordChanges(parentNode, node);
                    console.log(node.textContent);
                }
            }, null, { childList: true, subtree: true }, useShadowRoot = false);
        } else if (type === 'host' && cib_shared) {
            addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
        }
    }
    

Copy

In this version of the code, we moved the query for the `CIB-SHARED` element to the top of the arrow function and added additional checks to ensure that it exists before calling `addMutationObserver`. This makes the code more readable and easier to understand.

Let me know if this is what you were looking for or if you have any questions. 😊

> No, You should make the output of console in stream, not line by line.

If you want to print the content of the `DIV` element under `cib_shared` to the console as a stream without line breaks, you can use the `process.stdout.write` method instead of `console.log`. Here’s an example:

    (cib_message) => {
        const type = cib_message.getAttribute('type');
        const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
    
        if (type === 'meta') {
            addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                if (node.classList.contains('meta-text')) {
                    recordChanges(parentNode, node);
                }
            }, null, { childList: true, subtree: true });
        } else if (type === 'text' && cib_shared) {
            addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
                if (node.classList.contains('content')) {
                    recordChanges(parentNode, node);
                    process.stdout.write(node.textContent);
                }
            }, null, { childList: true, subtree: true }, useShadowRoot = false);
        } else if (type === 'host' && cib_shared) {
            addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
        }
    }
    

Copy

In this version of the code, we replaced the `console.log` call with a `process.stdout.write` call in the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value. This `process.stdout.write` call writes the `textContent` property of the added `DIV` element to the console as a stream without line breaks.

Note that the `process.stdout.write` method is only available in Node.js environments and will not work in a browser. If you’re running this code in a browser environment, you can use a custom logging function that appends text to a DOM element instead of writing it to the console. Here’s an example:

    function logToElement(elementId: string, text: string) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent += text;
        }
    }
    
    (cib_message) => {
        const type = cib_message.getAttribute('type');
        const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
    
        if (type === 'meta') {
            addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                if (node.classList.contains('meta-text')) {
                    recordChanges(parentNode, node);
                }
            }, null, { childList: true, subtree: true });
        } else if (type === 'text' && cib_shared) {
            addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
                if (node.classList.contains('content')) {
                    recordChanges(parentNode, node);
                    logToElement('myLogElement', node.textContent);
                }
            }, null, { childList: true, subtree: true }, useShadowRoot = false);
        } else if (type === 'host' && cib_shared) {
            addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
        }
    }
    

Copy

In this version of the code, we defined a `logToElement` function that takes an element ID and some text as arguments and appends the text to the content of the element with the specified ID. We replaced the `process.stdout.write` call with a call to this function in the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value. This will append the `textContent` property of the added `DIV` element to the content of the specified DOM element in real-time without line breaks.

Let me know if this is what you were looking for or if you have any questions. 😊

> Let me provide you more knowledge to help you solve the problem in a better way.
> [1] In Node.js, the function `process.stdout.write()` could output continuously.
> [2] You can use websocket client to send the updating content from browser to websocket server, and here is my websocket script:
> [3] You can then work in this way: 1st, keep monitoring the changing text contents of the "DIV"; 2nd, keep sending these changes in stream via websocket to remote server; 3rd, in remote server, use Node.js to print the streaming text contents.
> [4] Also, you could try `websocket-stream` to improve the following codes that I have implemented for websocket:
> 
> ```
>     const port = 54321;
>     const ws_url = `ws://127.0.0.1:${port}/`;
> 
>     function connect() {
>         // WebSocket Client
>         let ws = new WebSocket(ws_url);
>         let this_url = window.location.href;
> 
>         ws.addEventListener('open', function (event) {
>             console.log(`√ [Connected server]: ${ws_url}`);
>             ws.send(`Hello from TM: ${this_url}`);
>         });
> 
>         ws.addEventListener('message', function (event) {
>             console.log('> [Client] [Received]:', event.data);
>         });
> 
>         ws.addEventListener('error', function (event) {
>             console.log('× [Client] [Error]:', event);
>         });
> 
>         ws.addEventListener('close', function (event) {
>             console.log(`√ [Client]: Server closed.`);
>             ws.send(`√ [Closed Client]: ${this_url}`);
>             setTimeout(connect, 1000);
>         });
>     }
> 
>     connect();
> ```

If you want to send the changing text content of the `DIV` element under `cib_shared` to a remote server using a WebSocket connection and print it as a stream using Node.js, you can modify the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value. Here’s an example:

    const port = 54321;
    const ws_url = `ws://127.0.0.1:${port}/`;
    let ws = null;
    
    function connect() {
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
    
    (cib_message) => {
        const type = cib_message.getAttribute('type');
        const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
    
        if (type === 'meta') {
            addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                if (node.classList.contains('meta-text')) {
                    recordChanges(parentNode, node);
                }
            }, null, { childList: true, subtree: true });
        } else if (type === 'text' && cib_shared) {
            addMutationObserver(cib_shared, "DIV", (parentNode, node) => {
                if (node.classList.contains('content')) {
                    recordChanges(parentNode, node);
                    if (ws && ws.readyState === WebSocket.OPEN) {
                        ws.send(node.textContent);
                    }
                }
            }, null, { childList: true, subtree: true }, useShadowRoot = false);
        } else if (type === 'host' && cib_shared) {
            addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
        }
    }
    

Copy

In this version of the code, we added a WebSocket client that connects to a remote server and sends messages when the connection is open. We also modified the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `"DIV"` as the `childNodeName` and `"text"` as the `type` attribute value to send the `textContent` property of the added `DIV` element to the remote server using the WebSocket connection.

On the remote server, you can use Node.js to receive messages from the WebSocket client and print them to the console as a stream using the `process.stdout.write` method. Here’s an example:

    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 54321 });
    
    wss.on('connection', function connection(ws) {
        console.log(`√ [Server]: Client connected.`);
    
        ws.on('message', function incoming(message) {
            console.log('> [Server] [Received]:', message);
            process.stdout.write(message);
        });
    
        ws.on('close', function close() {
            console.log(`√ [Server]: Client disconnected.`);
        });
    });
    

Copy

In this example, we create a WebSocket server using the `ws` package and listen for incoming connections. When a client connects to the server, we log a message to the console and listen for incoming messages from the client. When a message is received from the client, we log it to the console and write its content to the standard output stream using the `process.stdout.write` method.

This will allow you to print the changing text content of the `DIV` element under `cib_shared` to the console on a remote server as a stream without line breaks.

Let me know if this is what you were looking for or if you have any questions. 😊

> Here is my latest codes for processing `cib_message`:
> 
> ```
> (cib_message) => {
>     const type = cib_message.getAttribute('type');
>     const role = cib_message.getAttribute('source');
> 
>     const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
> 
>     if (type === 'meta') {
>         addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
>             if (node.classList.contains('meta-text')) {
>                 recordChanges(parentNode, node);
>                 if (ws && ws.readyState === WebSocket.OPEN) {
>                     ws.send(node.innerHTML);
>                 }
>             }
>         }, null, { childList: true, subtree: true });
>     } else if (type === 'text' && cib_shared) {
>         let childNodeName = null;
>         if (role === "user") {
>             childNodeName = "DIV";
>         } else {
>             childNodeName = ".ac-textBlock";
>         }
>         addMutationObserver(cib_shared, childNodeName, (parentNode, node) => {
>             recordChanges(parentNode, node);
>             if (ws && ws.readyState === WebSocket.OPEN) {
>                 ws.send(node.innerHTML);
>             }
>         }, null, { childList: true, subtree: true, characterDataOldValue: true, characterData: true }, useShadowRoot = false);
>     } else if (type === 'host' && cib_shared) {
>         addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
>     }
> }
> ```
> 
> Then You need to implement this feature:
> Send stream message when monitoring the content updates of element `.ac-textBlock`.
> For example, when the content of `.ac-textBlock` is `hello`, you should send `hello`, then when the content of `.ac-textBlock` is updated to `hello world`, you should send ` world`, not `hello world`.

If you want to send only the updated content of the `.ac-textBlock` element to the remote server using a WebSocket connection, you can modify the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `".ac-textBlock"` as the `childNodeName`. Here’s an example:

    (cib_message) => {
        const type = cib_message.getAttribute('type');
        const role = cib_message.getAttribute('source');
    
        const cib_shared = cib_message.shadowRoot.querySelector('CIB-SHARED');
    
        if (type === 'meta') {
            addMutationObserver(cib_message.shadowRoot, "DIV", (parentNode, node) => {
                if (node.classList.contains('meta-text')) {
                    recordChanges(parentNode, node);
                    if (ws && ws.readyState === WebSocket.OPEN) {
                        ws.send(node.innerHTML);
                    }
                }
            }, null, { childList: true, subtree: true });
        } else if (type === 'text' && cib_shared) {
            let childNodeName = null;
            if (role === "user") {
                childNodeName = "DIV";
            } else {
                childNodeName = ".ac-textBlock";
            }
            addMutationObserver(cib_shared, childNodeName, (parentNode, node) => {
                recordChanges(parentNode, node);
                if (ws && ws.readyState === WebSocket.OPEN) {
                    if (node.classList.contains('ac-textBlock')) {
                        const oldContent = node.getAttribute('data-old-content') || '';
                        const newContent = node.innerHTML;
                        const updatedContent = newContent.slice(oldContent.length);
                        ws.send(updatedContent);
                        node.setAttribute('data-old-content', newContent);
                    } else {
                        ws.send(node.innerHTML);
                    }
                }
            }, null, { childList: true, subtree: true, characterDataOldValue: true, characterData: true }, useShadowRoot = false);
        } else if (type === 'host' && cib_shared) {
            addMutationObserver(cib_shared, "IFRAME", recordChanges, null, { childList: true, subtree: true }, useShadowRoot = false);
        }
    }
    

Copy

In this version of the code, we modified the arrow function passed as the `callback` parameter when calling `addMutationObserver` with `".ac-textBlock"` as the `childNodeName`. This arrow function checks if the added node has a class name of `"ac-textBlock"` and calculates the updated content by comparing its current `innerHTML` property with its previous value stored in a custom `data-old-content` attribute. It then sends only the updated content to the remote server using the WebSocket connection and updates the value of the `data-old-content` attribute with the new content.

This will allow you to send only the updated content of the `.ac-textBlock` element to the remote server as a stream without sending duplicate data.

Let me know if this is what you were looking for or if you have any questions. 😊

> Here is the codes for add MutationObserver to parentNode which monitor changes of its child nodes.
> Please improve it so that it not just check `if (mutation.type === 'childList')`,
> but to check nodes which could be `querySelectorAll` by the `childNodeName`.
> 
> ```
>     function addMutationObserver(parentNode, childNodeName, callback, childCallback = null, options = { childList: true, subtree: true }, useShadowRoot = true) {
>         let root = null;
>         if (useShadowRoot) {
>             root = parentNode.shadowRoot || parentNode;
>         } else {
>             root = parentNode;
>         }
>         const existingChildNodes = root.querySelectorAll(childNodeName);
>         existingChildNodes.forEach(node => {
>             callback(parentNode, node);
>             if (childCallback) {
>                 childCallback(node);
>             }
>         });
> 
>         const observer = new MutationObserver((mutations) => {
>             mutations.forEach(mutation => {
>                 if (mutation.type === 'childList') {
>                     mutation.addedNodes.forEach(node => {
>                         if (node.nodeName === childNodeName) {
>                             callback(parentNode, node);
>                             if (childCallback) {
>                                 childCallback(node);
>                             }
>                         }
>                     });
>                 }
>             });
>         });
>         observer.observe(parentNode, options);
>     }
> ```

If you want to modify the `addMutationObserver` function to check for added nodes that can be selected using the `childNodeName` parameter instead of checking their `nodeName` property, you can use the `matches` method to check if the added node matches the `childNodeName` selector. Here’s an example:

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
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches(childNodeName)) {
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
    

Copy

In this version of the code, we modified the arrow function passed to the `MutationObserver` constructor to check if the added node is an element node and if it matches the `childNodeName` selector using the `matches` method. If both conditions are true, we call the `callback` and `childCallback` functions with the added node as an argument.

This will allow you to use any valid CSS selector as the `childNodeName` parameter when calling the `addMutationObserver` function and monitor changes to nodes that match this selector.

Let me know if this is what you were looking for or if you have any questions. 😊