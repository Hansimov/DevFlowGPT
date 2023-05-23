# 



> In TypeScript, what does the "mutation" means in `MutationObserver`?

[In TypeScript, `MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change](https://javascript.info/mutation-observer)[1](https://javascript.info/mutation-observer). The first argument of the function is a collection of all mutations which have occurred in a single batch. [Each mutation provides information about its type and the changes which have occurred](https://javascript.plainenglish.io/mutation-observer-in-javascript-21a85a4ceb24)[2](https://javascript.plainenglish.io/mutation-observer-in-javascript-21a85a4ceb24). Is there anything else you would like to know?

1. [Mutation observer - The Modern JavaScript Tutorial](https://javascript.info/mutation-observer)
2. [MutationObserver in JavaScript Explained | by Ankit Saxena | JavaScript ...](https://javascript.plainenglish.io/mutation-observer-in-javascript-21a85a4ceb24)
3. [MutationObserver - Web APIs | MDN - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
4. [javascript - What is the typescript type of Mutation list in callback ...](https://stackoverflow.com/questions/75965295/what-is-the-typescript-type-of-mutation-list-in-callback-function-of-mutation-ob)
5. [MutationObserver: observe() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)

> Here is the scenario:
> [1] I first add a MutationObserver to a `parentNode`, observe any changes of its child nodes named "DIV".
> [2] Then a new `childNode1` is added to the `parentNode`. Now I would like to add new MutationObserver to `childNode1`, to observe the grandchild nodes, or child nodes of `childNode1`.
> How could I use MutationObserver to implement this.

Here is an example of how you can use `MutationObserver` to implement this scenario:

    // Select the parentNode that will be observed for mutations
    const parentNode = document.querySelector("#parentNode");
    
    // Options for the observer (which mutations to observe)
    const config = { childList: true };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === "DIV") {
              // Add new MutationObserver to childNode1
              const childNode1 = node;
              const childConfig = { childList: true };
              const childCallback = (childMutationList, childObserver) => {
                // Observe grandchild nodes here
              };
              const childObserver = new MutationObserver(childCallback);
              childObserver.observe(childNode1, childConfig);
            }
          }
        }
      }
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(parentNode, config);
    

Copy

This code creates a `MutationObserver` instance that observes the `parentNode` for changes in its child nodes. When a new `childNode1` is added to the `parentNode`, a new `MutationObserver` is added to `childNode1` to observe its grandchild nodes. You can modify the `childCallback` function to specify what actions you want to take when observing the grandchild nodes.

Is this what you were looking for?

1. [Using MutationObserver to detect when a Node is added to document](https://stackoverflow.com/questions/58036689/using-mutationobserver-to-detect-when-a-node-is-added-to-document)
2. [MutationObserver not picking up on child nodes - Stack Overflow](https://stackoverflow.com/questions/61314922/mutationobserver-not-picking-up-on-child-nodes)
3. [javascript - How to use MutationObserver? - Stack Overflow](https://stackoverflow.com/questions/24344022/how-to-use-mutationobserver)
4. [Getting To Know The MutationObserver API — Smashing Magazine](https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/)
5. [javascript - How to make MutationObserver also report child nodes of ...](https://stackoverflow.com/questions/48444409/how-to-make-mutationobserver-also-report-child-nodes-of-mutated-nodes)

> Your solution uses nested `MutationObserver`. This has a problem that if the level of node tree is too deep, the code will be too complex. Is there any other solution?

Yes, you can use a single `MutationObserver` to observe changes in the entire subtree of the `parentNode` by setting the `subtree` option to `true` in the configuration object. Here is an example:

    // Select the parentNode that will be observed for mutations
    const parentNode = document.querySelector("#parentNode");
    
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            // Observe all added nodes here
          }
        }
      }
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(parentNode, config);
    

Copy

This code creates a `MutationObserver` instance that observes the entire subtree of the `parentNode` for changes in its child nodes. When a new node is added anywhere in the subtree, it will be detected by the observer. You can modify the `callback` function to specify what actions you want to take when observing added nodes.

Is this what you were looking for?

> Let me provide more details of my scenario. All this should be implemented in javascript.
> [1] I have a root node named `cib-chat-main`, and it would have multiple child nodes named `CIB-CHAT-TURN`, and each `cit-chat-turn` node would have multiple child nodes named `CIB-MESSAGE-GROUP`, and each `CIB-MESSAGE-GROUP` node would have multiple child nodes named `CIB-MESSAGE`, and for each `CI-MESSAGE` node, there are different types of its child nodes.
> [2] I would like to observe the changes of the `CIB-CHAT-TURN` nodes, and for each `CIB-CHAT-TURN` node, I would like to observe the changes of its `CIB-MESSAGE-GROUP` nodes, and for each `CIB-MESSAGE-GROUP` node, I would like to observe the changes of its `CIB-MESSAGE` nodes.
> [3] And then, for each child node of `CIB-MESSAGE`, I would like to monitor the content in character level, and output the updating content in real time in stream.

Based on your scenario, you can use a single `MutationObserver` to observe changes in the entire subtree of the `cib-chat-main` node by setting the `subtree` option to `true` in the configuration object. Here is an example:

    // Select the cib-chat-main node that will be observed for mutations
    const cibChatMainNode = document.querySelector("#cib-chat-main");
    
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true, characterData: true };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === "CIB-CHAT-TURN") {
              // Observe added CIB-CHAT-TURN nodes here
            } else if (node.nodeName === "CIB-MESSAGE-GROUP") {
              // Observe added CIB-MESSAGE-GROUP nodes here
            } else if (node.nodeName === "CIB-MESSAGE") {
              // Observe added CIB-MESSAGE nodes here
            }
          }
        } else if (mutation.type === "characterData") {
          // Observe character data changes in real time here
          console.log(mutation.target.data);
        }
      }
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(cibChatMainNode, config);
    

Copy

This code creates a `MutationObserver` instance that observes the entire subtree of the `cib-chat-main` node for changes in its child nodes and character data. When a new node is added anywhere in the subtree or when character data changes, it will be detected by the observer. You can modify the `callback` function to specify what actions you want to take when observing added nodes and character data changes.

Is this what you were looking for?

> If there are `shadowRoot` in the middle of each node and its child nodes, could your solution still work?

No, `MutationObserver` cannot observe changes within a `shadowRoot` because the `shadowRoot` is designed to encapsulate its content and isolate it from the rest of the page. If you want to observe changes within a `shadowRoot`, you need to create a separate `MutationObserver` instance for each `shadowRoot` and attach it to the `shadowRoot` directly.

Here is an example of how you can create a `MutationObserver` instance for a `shadowRoot`:

    // Select the shadowRoot that will be observed for mutations
    const shadowRoot = document.querySelector("#host-element").shadowRoot;
    
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      // Observe changes within the shadowRoot here
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(shadowRoot, config);
    

Copy

This code creates a `MutationObserver` instance that observes the entire subtree of the `shadowRoot` for changes in its child nodes. When a new node is added anywhere in the subtree, it will be detected by the observer. You can modify the `callback` function to specify what actions you want to take when observing added nodes.

Is this what you were looking for?