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