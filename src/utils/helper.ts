import * as os from "os";
import type { TextEditor } from 'vscode';
import { workspace, window, ViewColumn, Range } from 'vscode';

let curEditor: TextEditor | null;
let isOpened: boolean = false;

export async function writeAtTempWindow(text: string) {
  if (!isOpened) {
    const document = await workspace.openTextDocument({ language: 'typescript', content: text });
    curEditor = await window.showTextDocument(document, ViewColumn.Beside, true);
    isOpened = true;
  } else {
    const fullRange = new Range(0, 0, curEditor!.document.lineCount, 0);
    curEditor!.edit(editBuilder => editBuilder.replace(fullRange, text));
  }

  const disposable = window.onDidChangeVisibleTextEditors(editors => {
    if (!editors.includes(curEditor!)) {
      curEditor = null;
      isOpened = false;
      disposable.dispose();
    }
  });
}

export const getMsg = (message: string) => {
  const userName = os.userInfo().username;
  return `Hi, ${userName}. ${message}`;
};

export const getExtensionConfig = <T>(key: string) => {
  const feHelperPlusConfig = workspace.getConfiguration('fe-helper-plus');
  return feHelperPlusConfig.get<T>(key);
};
