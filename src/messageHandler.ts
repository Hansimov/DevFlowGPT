import * as vscode from 'vscode';

export function handleBrowserMessage(message: string ="<String_Placeholder>") {
    // TODO: Implement the logic to handle incoming messages from Chrome Browser
    // For example, you can show the message in a vscode window like this:
    vscode.window.showInformationMessage(`Received message from Chrome Browser: ${message}`);
    console.log(`Received message from Chrome Browser: ${message}`);
}