// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type { ExtensionContext } from 'vscode';
import { activate as json2tsActivate, deactivate as json2tsDeactivate } from './json2ts';
import { activate as json2excelActivate, deactivate as json2excelDeactivate } from './json2excel';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  json2tsActivate(context);
  json2excelActivate(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
	json2tsDeactivate();
  json2excelDeactivate();
}
