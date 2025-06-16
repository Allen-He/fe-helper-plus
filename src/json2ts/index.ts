import type { ExtensionContext } from 'vscode';
import { window, commands } from 'vscode';
import * as copyPaste from "copy-paste";
import * as humps from 'humps';
import JsonToTS from 'json-to-ts';
import { getExtensionConfig, writeAtTempWindow } from '../utils/helper';
import { createOpenAIClient, getOpenAIModel } from '../utils/openAI';
import type { ChatCompletionCreateParams } from 'openai/resources';

async function printResJson(json: Record<string, any>): Promise<void> {
  const useAI = getExtensionConfig<boolean>('json2ts.useAI');
  if (!useAI) {
    const resTs = JsonToTS(json).reduce((a, b) => `${a}\n\n${b}`);
    writeAtTempWindow(resTs);
    return;
  }

  const client = createOpenAIClient();
  const baseParams: ChatCompletionCreateParams = {
    model: getOpenAIModel(),
    messages: [
      { role: "system", content: "你是一个 TypeScript 类型转换助手。请将提供的 JSON 转换为 TypeScript 类型定义，只返回类型定义代码，不要有任何其他说明文字。要求：\n1. 使用 interface 声明\n2. 使用有意义的接口名称\n3. 处理嵌套结构\n4. 优化类型复用\n5. 数组类型使用 T[] 形式而不是 Array<T>\n6. 不要包含任何注释或说明文字" },
      { role: "user", content: `${JSON.stringify(json, null, 2)}` }
    ],
    temperature: 0.2
  };

  const useStream = getExtensionConfig<boolean>('json2ts.useStream');
  if (!useStream) {
    const completion = await client.chat.completions.create(baseParams);
    const resTs = completion.choices[0]?.message?.content || '';
    writeAtTempWindow(resTs);
    return;
  }
  
  const stream = await client.chat.completions.create({
    ...baseParams,
    stream: true
  });
  let isFirst = true;
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (isFirst) {
      await writeAtTempWindow(content);
      isFirst = false;
    } else {
      await writeAtTempWindow(content, { append: true });
    }
  }
}

function json2tsCommandHandle(humpsMode: 'camelizeKeys' | 'decamelizeKeys', source: 'selection' | 'clipboard') {
  return async () => {
    if (!window.activeTextEditor) {
      return;
    }
    let sourceText: string;

    if (source === 'selection') {
      const { selection, document } = window.activeTextEditor;
      sourceText = document.getText(selection).trim();
    
      if (!sourceText.length) {
        return window.showErrorMessage('Please select the JSON content that needs to be converted first.');
      }
    } else {
      try {
        sourceText = copyPaste.paste();
      } catch (error: any) {
        return window.showErrorMessage(`An error occurred while accessing the system clipboard. ${error.message}`);
      }

      if (!sourceText.length) {
        return window.showErrorMessage('Please copy the JSON content that needs to be converted first.');
      }
    }
    
    let resJson;
    try {
      resJson = JSON.parse(sourceText);
    } catch (error) {
      return window.showErrorMessage('The currently selected content is not a valid JSON.');
    }
    resJson = humps[humpsMode](resJson);
  
    try {
      await printResJson(resJson);
    } catch (error: any) {
      return window.showErrorMessage(error.message);
    }
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
