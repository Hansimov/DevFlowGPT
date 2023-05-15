# 



> What does this command do: `npm install -g yo generator-code`

The command `npm install -g yo generator-code` installs two packages globally: `yo` and `generator-code``yo` is a command line interface tool that runs **Yeoman generators**[1](https://www.npmjs.com/package/yo)`generator-code` is a **Yeoman generator** for creating **Visual Studio Code extensions**[2](https://www.npmjs.com/package/generator-code/v/1.1.6)[3](https://github.com/microsoft/vscode-generator-code).

After installing these packages, you can run the command `yo code` to launch the generator. [The Yeoman generator will walk you through the steps required to create your customization or extension, prompting for the required information](https://www.npmjs.com/package/generator-code/v/1.1.6)[2](https://www.npmjs.com/package/generator-code/v/1.1.6)[3](https://github.com/microsoft/vscode-generator-code). Is there anything else you would like to know?

1. [yo - npm](https://www.npmjs.com/package/yo)
2. [generator-code - npm](https://www.npmjs.com/package/generator-code/v/1.1.6)
3. [Yo Code - Extension and Customization Generator - GitHub](https://github.com/microsoft/vscode-generator-code)
4. [Your First Extension | Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)
5. [Create Office Add-in projects using the Yeoman Generator](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/yeoman-generator-overview)

> What does this output in npm console mean: "idealTree:npm: sill idealTree buildDeps"

The message `idealTree:npm: sill idealTree buildDeps` is a log message that appears when running `npm install` with the `--verbose` flag. It indicates that npm is building the dependency tree for the packages being installed. This step can sometimes take a while, especially if you have a lot of dependencies or if there are issues with your network connection or npm registry configuration[1](https://stackoverflow.com/questions/67021107/npm-install-freezes-and-shows-idealtreechatting-sill-idealtree-builddeps)[2](https://bobbyhadz.com/blog/npm-install-sill-idealtree-builddeps). Is there anything else you would like to know?

1. [npm install freezes and shows idealTree:chatting: sill idealTree buildDeps](https://stackoverflow.com/questions/67021107/npm-install-freezes-and-shows-idealtreechatting-sill-idealtree-builddeps)
2. [npm install hangs on 'sill idealTree buildDeps' [Solved] - bobbyhadz](https://bobbyhadz.com/blog/npm-install-sill-idealtree-builddeps)
3. ["npm install" hangs on sill: idealTree build - Stack Overflow](https://stackoverflow.com/questions/70865039/npm-install-hangs-on-sill-idealtree-build)
4. [[BUG] "sill idealTree buildDeps" takes a lot of time a project with ...](https://github.com/npm/cli/issues/3257)

> Whether this step is before or after the package downloading step?

I’m sorry, but I couldn’t find any specific information about whether the `idealTree buildDeps` step happens before or after the package downloading step. Would you like me to search for something else?

1. ["npm install" hangs on sill: idealTree build - Stack Overflow](https://stackoverflow.com/questions/70865039/npm-install-hangs-on-sill-idealtree-build)
2. [npm install freezes and shows idealTree:chatting: sill idealTree buildDeps](https://stackoverflow.com/questions/67021107/npm-install-freezes-and-shows-idealtreechatting-sill-idealtree-builddeps)
3. [Downloading and installing packages locally | npm Docs](https://docs.npmjs.com/downloading-and-installing-packages-locally/)
4. [[BUG] `npm install` started to hang on "still idealTree buildDeps" for ...](https://github.com/npm/cli/issues/3359)

> When develop vscode extension with generator, whether to use TypeScript or Javascript?

When developing a Visual Studio Code extension with the `generator-code` Yeoman generator, you have the option to choose between using **TypeScript** or **JavaScript** for your project[1](https://code.visualstudio.com/api/get-started/your-first-extension)[2](https://fek.io/blog/how-to-create-a-vs-code-extension-with-java-script/). Both languages are supported and it’s up to you to decide which one you prefer to use. Is there anything else you would like to know?

1. [Your First Extension | Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)
2. [How to create a VSCode Extension with JavaScript - Fek.io](https://fek.io/blog/how-to-create-a-vs-code-extension-with-java-script/)
3. [Getting started with Visual Studio Code extension development](https://dev.to/symflower/getting-started-with-visual-studio-code-extension-development-56g2)

> Whether should I bundle the source code with webpack or not when using generator?

[When using the `generator-code` Yeoman generator to create a Visual Studio Code extension, you have the option to **bundle the source code with webpack** or not](https://github.com/microsoft/vscode-generator-code)[1](https://github.com/microsoft/vscode-generator-code). [Bundling your source code with webpack can help reduce the size of your extension and improve its performance by reducing the number of files that need to be loaded](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)[2](https://code.visualstudio.com/api/working-with-extensions/bundling-extension). However, it’s not required and you can choose not to bundle your source code if you prefer. Is there anything else you would like to know?

1. [microsoft/vscode-generator-code - GitHub](https://github.com/microsoft/vscode-generator-code)
2. [Bundling Extensions | Visual Studio Code Extension API](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)
3. [Use yo code to generate a template，and use "Bundle the source code with ...](https://github.com/microsoft/vscode-generator-code/issues/239)
4. [How to Bundle a Simple Static Site Using Webpack — SitePoint](https://www.sitepoint.com/bundle-static-site-webpack/)