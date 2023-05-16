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

    // Show a quick pick to let the user select multiple files
    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
    const fileItems = files.map(file => ({ label: path.basename(file.path), file }));
    const selectedFiles = await vscode.window.showQuickPick(fileItems, { placeHolder: 'Select files', canPickMany: true });

    if (selectedFiles && selectedFiles.length > 0) {
        // Read the contents of the selected files
        let fileContents = '';
        for (const selectedFile of selectedFiles) {
            const filePath = selectedFile.file.fsPath;
            const fileName = path.basename(filePath);
            const content = fs.readFileSync(filePath, 'utf-8');
            fileContents += `[${fileName}]:\n\`\`\`\n${content}\n\`\`\`\n\n`;
        }

        // Create a new untitled document with the contents of the selected files
        const document = await vscode.workspace.openTextDocument({ content: fileContents });

        // Show the document in a new editor
        await vscode.window.showTextDocument(document);
    }
}
