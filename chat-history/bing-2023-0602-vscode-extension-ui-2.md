# I am developing a vscode ...

> I am developing a vscode extension, which is a customized editor that can generate prompts for ChatGPT and Bing more quickly.
> The editor should have the following features:
> (1) Inherit the features of normal vscode editor, which means in this customized editor, I can still use keyboard shortcuts, auto completion and quick fixes as usual, and can use the functionalities of other vscode extensions.
> (2) Has a menu, which can select built-in predefined prompt templates, and capable to search the prompts with tag or text match.
> (3) Record recent prompts, and can edit old prompts for re-use.
> (4) Visualize prompts as Drag-and-drop modules.
> 
> I have determined to use side panel to implement this vscode extension.
> 
> Then answer the following questions one by one:
> [1] Is it possible for the editor part in the side panel to inherit all features of the normal vscode editor, which might integrated many functionalities of other vscode extensions?
> [2] What are some best practices to implement drag-and-drop feature in the webview panel in a side panel?

[1](https://stackoverflow.com/questions/67150547/vs-code-extension-how-to-add-a-webviewpanel-to-the-sidebar "VS Code Extension - How to add a WebviewPanel to the sidebar?") [According to my search results, it is possible to add a `WebviewPanel` to the sidebar of a VSCode extension](https://stackoverflow.com/questions/67150547/vs-code-extension-how-to-add-a-webviewpanel-to-the-sidebar) [1](https://stackoverflow.com/questions/67150547/vs-code-extension-how-to-add-a-webviewpanel-to-the-sidebar). However, I couldn’t find any information about whether the editor part in the side panel can inherit all features of the normal VSCode editor.

[2](https://code.visualstudio.com/api/extension-guides/tree-view "Tree View API | Visual Studio Code Extension API") As for implementing drag-and-drop feature in a webview panel in a side panel, I couldn’t find any specific information on this topic. [However, there is a `TreeDragAndDropController` which can be used for some drag & drop actions within a tree view](https://stackoverflow.com/questions/51716794/adding-drag-and-drop-support-in-a-custom-treeview) [2](https://stackoverflow.com/questions/51716794/adding-drag-and-drop-support-in-a-custom-treeview). [You may also want to check out the Webview UI Toolkit for Visual Studio Code which provides a library of components that developers can use to build user interfaces inside extension webviews](https://code.visualstudio.com/blogs/2021/10/11/webview-ui-toolkit) [3](https://code.visualstudio.com/blogs/2021/10/11/webview-ui-toolkit).

1. [VS Code Extension - How to add a WebviewPanel to the sidebar?](https://stackoverflow.com/questions/67150547/vs-code-extension-how-to-add-a-webviewpanel-to-the-sidebar)
2. [Adding drag and drop support in a custom TreeView](https://stackoverflow.com/questions/51716794/adding-drag-and-drop-support-in-a-custom-treeview)
3. [Webview UI Toolkit for Visual Studio Code](https://code.visualstudio.com/blogs/2021/10/11/webview-ui-toolkit)
4. [Tree View API | Visual Studio Code Extension API](https://code.visualstudio.com/api/extension-guides/tree-view)
5. [Extending Workbench | Visual Studio Code Extension API](https://code.visualstudio.com/api/extension-capabilities/extending-workbench)
6. [How Do I Have Multiple Panels or Docks In VSCode?](https://stackoverflow.com/questions/70645504/how-do-i-have-multiple-panels-or-docks-in-vscode)
7. [Webview API | Visual Studio Code Extension API](https://code.visualstudio.com/api/extension-guides/webview)
8. [Make it possible to use drag and drop in a webview #8794 - GitHub](https://github.com/Microsoft/vscode/issues/8794)