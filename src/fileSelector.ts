import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export async function selectFile(selectedFiles: vscode.Uri[]) {
    // Get the current workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder is opened');
        return;
    }

    // Show a quick pick to let the user select multiple files
    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
    const fileItems = files.map(file => ({ label: '  '.repeat((path.relative(workspaceFolder.uri.fsPath, file.fsPath).match(/\\/g) || []).length) + path.basename(file.fsPath), file }));
    const newSelectedFiles = await vscode.window.showQuickPick(fileItems, { placeHolder: 'Select files', canPickMany: true, activeItems: selectedFiles.map(file => fileItems.find(item => item.file.toString() === file.toString())) });

    if (newSelectedFiles) {
        selectedFiles.splice(0, selectedFiles.length, ...newSelectedFiles.map(item => item.file));
    }

    if (selectedFiles && selectedFiles.length > 0) {
        // Read the contents of the selected files
        let fileContents = '';
        for (const selectedFile of selectedFiles) {
            const filePath = selectedFile.fsPath;
            const fileName = path.basename(filePath);
            const content = fs.readFileSync(filePath, 'utf-8');
            fileContents += `[${fileName}]:\n<code>\n${content}\n</code>\n\n`;
        }

        // Create a new untitled document with the contents of the selected files
        const document = await vscode.workspace.openTextDocument({ content: fileContents });

        // Show the document in a new editor
        await vscode.window.showTextDocument(document);
    }
}
