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