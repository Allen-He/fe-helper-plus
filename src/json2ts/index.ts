
import type { ExtensionContext } from 'vscode';
import { window, commands } from 'vscode';
import * as copyPaste from "copy-paste";
import * as humps from 'humps';
import JsonToTS from 'json-to-ts';
import { $message, writeAtTempWindow } from '../utils/helper';

function json2tsCommandHandle(humpsMode: 'camelizeKeys' | 'decamelizeKeys', source: 'selection' | 'clipboard') {
  return () => {
    if (!window.activeTextEditor) {
      return;
    }
    let sourceText: string;

    if (source === 'selection') {
      const { selection, document } = window.activeTextEditor;
      sourceText = document.getText(selection).trim();
    
      if (!sourceText.length) {
        return $message.error('Please select the JSON content that needs to be converted first.');
      }
    } else {
      try {
        sourceText = copyPaste.paste();
      } catch (error: any) {
        return $message.error(`An error occurred while accessing the system clipboard. ${error.message}`);
      }

      if (!sourceText.length) {
        return $message.error('Please copy the JSON content that needs to be converted first.');
      }
    }
    
    let resJson;
    try {
      resJson = JSON.parse(sourceText);
    } catch (error) {
      return $message.error('The currently selected content is not a valid JSON.');
    }
    resJson = humps[humpsMode](resJson);
  
    let resTs = '';
    try {
      resTs = JsonToTS(resJson).reduce((a, b) => `${a}\n\n${b}`);
    } catch (error: any) {
      return $message.error(error.message);
    }
  
    writeAtTempWindow(resTs);
  };
}

export function activate(context: ExtensionContext) {
  // from: 选中内容
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2ts.camelizeKeys", json2tsCommandHandle('camelizeKeys', 'selection'))
  );
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2ts.decamelizeKeys", json2tsCommandHandle('decamelizeKeys', 'selection'))
  );
  // from: 剪切板内容
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2ts.camelizeKeys.clipboard", json2tsCommandHandle('camelizeKeys', 'clipboard'))
  );
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2ts.decamelizeKeys.clipboard", json2tsCommandHandle('decamelizeKeys', 'clipboard'))
  );
}

export function deactivate() {
  // ...
}
