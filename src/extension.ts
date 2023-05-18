import * as vscode from 'vscode';
import { handleBrowserMessage } from './messageHandler';
import { selectFile } from './fileSelector';
import { WebSocketServer } from "./webSocketServer";

let webSocketServer: WebSocketServer;

export function activate(context: vscode.ExtensionContext) {
    // Register command: "devflowgpt.sendMessage"
    let sendMessageDisposable = vscode.commands.registerCommand('devflowgpt.sendMessage', async () => {
        // Get the message to send from the user
        const message = await vscode.window.showInputBox({ prompt: 'Enter the message to send' });
        handleMessage(message);
    });
    context.subscriptions.push(sendMessageDisposable);

    // Register command: "devflowgpt.selectFile"
    let selectedFiles: vscode.Uri[] = [];
    let selectFileDisposable = vscode.commands.registerCommand('devflowgpt.selectFile', async () => {
        await selectFile(selectedFiles);
    });
    context.subscriptions.push(selectFileDisposable);

    // // Register command: "devflowgpt.sendToChrome"
    // let sendToChromeDisposable = vscode.commands.registerCommand('extension.sendToChrome', () => {
    //     const editor = vscode.window.activeTextEditor;
    //     if (editor) {
    //         const selection = editor.selection;
    //         const text = editor.document.getText(selection);
    //         sendToChrome(text);
    //     }
    // });
    // context.subscriptions.push(sendToChromeDisposable);

    // Create a new WebSocketServer instance
    webSocketServer = new WebSocketServer();

    // Start the server
    webSocketServer.start();

    // Register a command to start the server
    let startWebsocketServerDisposable = vscode.commands.registerCommand('devflowgpt.startWebsocketServer', () => {
        vscode.window.showInformationMessage(`WebSocket server started.`);
    });

    context.subscriptions.push(startWebsocketServerDisposable);

    // vscode.commands.executeCommand("devflowgpt.selectFile");
}

// Handle incoming messages from Chrome Browser
export function handleMessage(message: string | undefined) {
    // TODO: Implement the logic to handle incoming messages from Chrome Browser
    handleBrowserMessage(message);
    console.log(`After handling ${message} ...`);
}

export function deactivate() {
    // Stop the server
    webSocketServer.stop();
}