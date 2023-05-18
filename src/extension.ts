import * as vscode from 'vscode';
import { handleBrowserMessage } from './messageHandler';
import { selectFile } from './fileSelector';

export function activate(context: vscode.ExtensionContext) {
    // Register the command to send a message from vscode to Chrome Browser
    let disposable = vscode.commands.registerCommand('devflowgpt.sendMessage', async () => {
        // Get the message to send from the user
        const message = await vscode.window.showInputBox({ prompt: 'Enter the message to send' });
        handleMessage(message);
    });
    context.subscriptions.push(disposable);
    console.log("> Handling message ...");

    // Listen for messages from Chrome Browser
    // TODO: Implement the logic to listen for messages from Chrome Browser and call handleMessage when a message is received

    // Register the command to select a file from the folder opened by vscode editor
    let selectedFiles: vscode.Uri[] = [];
    let selectFileDisposable = vscode.commands.registerCommand('devflowgpt.selectFile', async () => {
        await selectFile(selectedFiles);
    });

    context.subscriptions.push(selectFileDisposable);

    vscode.commands.executeCommand("devflowgpt.selectFile");
}

// Handle incoming messages from Chrome Browser
export function handleMessage(message: string | undefined) {
    // TODO: Implement the logic to handle incoming messages from Chrome Browser
    handleBrowserMessage(message);
    console.log(`After handling ${message} ...`);
}