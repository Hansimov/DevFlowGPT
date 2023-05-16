// This is a TypeScript code snippet for the GPT-DevFlow vscode extension
// This extension supports sending and receiving messages between vscode and Chrome Browser

// File structure:
// - src
//   - extension.ts
//   - messageHandler.ts

import * as vscode from 'vscode';
import { handleBrowserMessage } from './messageHandler';

export function activate(context: vscode.ExtensionContext) {
    // Register the command to send a message from vscode to Chrome Browser
    let disposable = vscode.commands.registerCommand('gpt-devflow.sendMessage', async () => {
        // Get the message to send from the user
        const message = await vscode.window.showInputBox({ prompt: 'Enter the message to send' });
		handleMessage(message);
    });
	context.subscriptions.push(disposable);
	console.log("> Handling message ...");
	

    // Listen for messages from Chrome Browser
    // TODO: Implement the logic to listen for messages from Chrome Browser and call handleMessage when a message is received
}

// Handle incoming messages from Chrome Browser
export function handleMessage(message: string | undefined) {
    // TODO: Implement the logic to handle incoming messages from Chrome Browser
	handleBrowserMessage(message);
	console.log(`After handling ${message} ...`);
}