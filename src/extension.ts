import * as vscode from 'vscode';
import { handleBrowserMessage } from './messageHandler';
import { selectFile } from './fileSelector';
import { WebSocketServer } from "./webSocketServer";

let webSocketServer: WebSocketServer;

export function activate(context: vscode.ExtensionContext) {
    // Register command: "devflowgpt.sendMessage"
    let sendMessageDisposable = vscode.commands.registerCommand('devflowgpt.sendMessage', async () => {
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

    // Start webSocketServer
    let ws = new WebSocketServer();
    ws.start();
    setTimeout(() => {
        ws.sendToClients("New Message from VSC");
    }, 3000);

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