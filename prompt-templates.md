# Prompts templates for Coding tasks
## Provide code files

```markdown
I am developing a vscode extension named DevFlowGPT, which bridge Browser events and vscode.
Here are my current TypeScript files, which follow these rules (each starts with number in brackets) (Let's name this rule set as "RuleSet-Scripts"):

[1] The part of the code scripts would start with `<|start-of-codes|>` and end with `<|end-of-codes|>`.

[2] File paths and names are specified in brackets and followed by a colon, and then followed by the codes from new line.
Here is example 1: `[src/extension.ts]`;
Here is example 2: `[package.json]`.

[3] The content of codes are included in triple backticks.
Here is example 1: ```(All lines in extension.ts)```;
Here is example 2: ```(All lines in package.json)```.

Here is an example which follows Rule-2 and Rule-3:
~```
`[src/extension.ts]`:
```...(Codes here)...```
```~

-----

Below are the single or multiple scripts I will provide you.
Do not forget to follow the RuleSet-Scripts when interpret the contents.

<|start-of-codes|>
...
<|end-of-codes|>

```

## Specify coding steps

```markdown
Do following steps (each starts with number in brackets) based on the scripts I provide you:
[1] Draw a tree structure view only with paths and names of all the provided scripts,  Here is an Example:
~```
- src/
    - test/
    - extension.ts
    - messageHandler.ts
- package.json
- README.md
```~

[2] Add features (numbered with alphabets in brackets) to these scripts:
    [a] Select files from the folder opened by vscode editor;
    [b] Dump the contents of files to the custom editor created by extension.

[3] Provide the changed lines in each script with the git diff format, and include in triple backticks. Here is an example:
~```
[src/extension.ts]:
<added_lines_count> lines added, <deleted_lines_count> lines deleted, <changed_lines_count> lines changed
- <original lines>
+ <improved lines>
```~

If the changes are too long or the script is newly added, then explain this condition in the format comments, and do not provide the any contents of the changes or script. Here is an example:

~```
[src/newfile.ts]:
<added_lines_count> lines added
# This file is newly added
<Do not provide any lines after>
```~

[4] Provide whole scripts, the format of your output should follow RuleSet-Scripts mentioned above. Here is an example:
~```
`[src/extension.ts]`:
```...(Whole improved or added script here)...```
```~

```

## Generate Changelog

```markdown
Please generate a "CHANGELOG.md" with the git commit messages, follow the rules (each start with number in brackets) below:
[1] The commit messages (each line per commit) are included in triple backticks.
[2] The original commit messages are sorted by commit datetime in descending order. You should re-sort them by commit datetime in ascending order from top to bottom.
[3] You should not replicate the commit messages line by line, but you should make them human-friendly readable sentences the changelog.
[4] You can combine adjacent similar or relative commit messages into one change log.
[5] You should also add a pin of the latest changes at the top, so other developers could know the recent progress of this project.
The log format of latest change format is like: "[<Datetime>] <Log>".The date format should be `YYYY-MM-DD`.
[6] You should not use verbs with use past tense, which means end with "ed" and so on. You should use present tense. An example is: Use "Add" instead of "Added".
[7] Your output content should also be included in triple backticks.

Here is the git commit messages, please remember the rules above:
~```
<Git commits messages here>
```~
```