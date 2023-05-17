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

    // Construct the exclude pattern from the .gitignore file
    let excludePattern = '**/chat-history/**';
    try {
        const gitignorePath = path.join(workspaceFolder.uri.fsPath, '.gitignore');
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
        const gitignoreLines = gitignoreContent.split('\n').map(line => line.trim()).filter(line => line.length > 0 && !line.startsWith('#'));
        if (gitignoreLines.length > 0) {
            excludePattern += ',' + gitignoreLines.join(',');
        }
        excludePattern = "{" + excludePattern + "}";
    } catch (error) {
        throw new Error("Invalid Excluded Files Pattern");
    }

    // Show a quick pick to let the user select multiple files
    console.log(excludePattern);
    const files = await vscode.workspace.findFiles('**/*', excludePattern);
    const fileItems = files.map(file => ({ label: path.relative(workspaceFolder.uri.fsPath, file.fsPath).replace(/\\/g, '/'), file })).sort((a, b) => a.label.localeCompare(b.label));
    const newSelectedFiles = await vscode.window.showQuickPick(fileItems, { placeHolder: 'Select files', canPickMany: true });

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
