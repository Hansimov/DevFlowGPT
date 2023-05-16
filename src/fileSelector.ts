import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export async function selectFile() {
    // Get the current workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder is opened');
        return;
    }

    // Show a quick pick to let the user select a file
    const files = await vscode.workspace.findFiles('**/*');
    const fileItems = files.map(file => ({ label: path.basename(file.path), file }));
    const selectedFile = await vscode.window.showQuickPick(fileItems, { placeHolder: 'Select a file' });

    if (selectedFile) {
        // Read the contents of the selected file
        const fileContents = fs.readFileSync(selectedFile.file.fsPath, 'utf-8');

        // Create a new untitled document with the contents of the selected file
        const document = await vscode.workspace.openTextDocument({ content: fileContents });

        // Show the document in a new editor
        await vscode.window.showTextDocument(document);
    }
}
