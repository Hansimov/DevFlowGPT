# Prompts templates for Coding tasks
## Provide code files

```markdown
I am developing a vscode extension named DevFlowGPT, which bridge Browser events and vscode.
Here are my current TypeScript files, which follow these rules (each starts with number in brackets) (Let's name this rule set as "RuleSet-Scripts"):

[1] The part of the code scripts would start with `<|start-of-codes|>` and end with `<|end-of-codes|>`.

[2] Interpret the content between tag <exp> and </exp> as example of the context.

[3] File paths and names are specified in brackets and followed by a colon, and then followed by the codes from new line.
Example 1: `[src/extension.ts]:`;
Example 2: `[package.json]:`.

[4] The content of codes are included between tag <code> and </code> in separate line.
Example 1: <code>(All codes in `src/extension.ts`)</code>;
Example 2: <code>(All codes in `package.json`)</code>.

Based on the rules above, here is an example which follows Rule-2 and Rule-3:
<exp>
[src/extension.ts]:
<code>
...(Codes here)...
</code>
</exp>

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

[1] Draw a tree view of file structure, only with paths and names of all the provided scripts.
Here is an Example:
<code>
- src/
    - test/
    - extension.ts
    - messageHandler.ts
- package.json
- README.md
</code>

[2] Add or improve features (numbered with alphabets in brackets) to these scripts:
    [a] The drop-down menu of files to select should has the level view as they are in the file structure;
    Here is a representation of the UI of drop-down menu:
    <exp>
    [ ] src/
        [x] extension.ts
        [ ] no_relative_script.ts
        [x] messageHandler.ts
    [x] package.json
    </exp>

    [b] The script should memorize the selected files, and make these files already checked when call the `selectFile()` function next time;

[3] Provide the changed lines in each script with the git diff format, and include in triple backticks. Here is an example:
<exp>
[src/extension.ts]:
<code>
<added_lines_count> lines added, <deleted_lines_count> lines deleted, <changed_lines_count> lines changed
- <original lines>
+ <improved lines>
</code>
</exp>

If the changes are too long or the script is newly added, then explain this condition in the format comments, and do not provide the any contents of the changes or script.
Here is an example:
<exp>
[src/newfile.ts]:
<code>
<added_lines_count> lines added
# This file is newly added
<Do not provide any codes after>
</code>
</exp>

[4] After doing the improvement steps above, please provide all lines of the improved scripts, and follow rules (with alphabets in brackets) below:
    [a] If one script has no change, do not output the codes;
    [b] Do not use git diff format, but just all lines.
Here is an example:
<exp>
`[src/extension.ts]`:
<whole script here>
</exp>
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

Here is the git commit messages you nee, please 
Based on the rules above, please generate the Git commit messages below to "CHANGELOG.md".
<code>
<Git commits messages here>
</code>
```