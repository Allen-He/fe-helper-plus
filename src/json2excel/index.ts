import type { ExtensionContext, Uri } from 'vscode';
import { commands } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import * as XLSX from 'xlsx';
// @ts-ignore
import * as flat from 'flat';
import { v4 as uuidv4 } from 'uuid';
import { $message } from '../utils/helper';

type RecordObj = Record<string, any>;

type TransType = 'forward' | 'reverse';

const enum EnumExtName {
  JSON = '.json',
  EXCEL = '.xlsx'
};

XLSX.set_fs(fs);

/**
 * 当前路径是不是目录
 */
function isDirectory(curPath: string) {
  return fs.statSync(curPath).isDirectory();
}

/**
 * 当前路径是不是后缀名符合要求的文件
 */
function isTarTypeFile(curPath: string, extname: EnumExtName) {
  return fs.statSync(curPath).isFile() && path.extname(curPath) === extname;
}

/**
 * 判断当前路径是否为目录
 *  - 若是，则获取其子目录中的所有后缀名符合要求的文件路径【数组】
 *  - 若不是，则判断当前路径是否为后缀名符合要求的文件
 *    - 若是，则返回对应的文件路径【数组】
 *    - 若不是，则返回空【数组】
 */
function getTarPathList(curPath: string, extname: EnumExtName) {
  const pathList = isDirectory(curPath)
    ? fs.readdirSync(curPath).filter((file) => isTarTypeFile(path.resolve(curPath, file), extname)).map((file) => path.resolve(curPath, file))
    : isTarTypeFile(curPath, extname)
      ? [curPath]
      : [];
  return pathList;
}

/**
 * 根据当前路径获取输出文件的名称和绝对路径
 */
function getOutputPathAndName(curPath: string, type: TransType) {
  const { name, dir } = path.parse(curPath);
  const resName = name.replace(/\.\w{8}/g, '');
  const resCode = uuidv4().split('-')[0];
  const resExt = type === 'forward' ? EnumExtName.EXCEL : EnumExtName.JSON;
  
  const outputName = `${resName}.${resCode}${resExt}`;
  const outputPath = path.resolve(dir, outputName);

  return { outputName, outputPath };
}

function transJsonAndExcel(curPath: string, type: TransType) {
  try {
    const { outputName, outputPath } = getOutputPathAndName(curPath, type);

    if (type === 'forward') {
      const sourceText = fs.readFileSync(curPath, 'utf-8');
      const sourceJson = flat.flatten<RecordObj, RecordObj>(JSON.parse(sourceText));
      const excelData = Object.entries(sourceJson).map(([key, val]) => ({key, val}));
      
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.sheet_add_aoa(ws, [["JSON KEY", "JSON VALUE"]], { origin: "A1" });
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFileXLSX(wb, outputPath);
      $message.info(`The Excel file has been generated, please refer to: ${outputName}`);
    } else {
      const wb = XLSX.readFile(curPath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 }).slice(1) as string[][];

      const jsonData = excelData.reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
      const jsonText = JSON.stringify(flat.unflatten(jsonData), null, 2);
      fs.writeFileSync(outputPath, jsonText, { encoding: 'utf-8' });
      $message.info(`The JSON file has been generated, please refer to: ${outputName}`);
    }
  } catch (error: any) {
    $message.error(error.message);
  }
}

function json2excelCommandHandle(type: TransType = 'forward') {
  return (uri: Uri) => {
    try {
      const pathList = getTarPathList(uri.path, type === 'forward' ? EnumExtName.JSON : EnumExtName.EXCEL);

      if (pathList.length === 0) {
        $message.error('No files of the required type were found');
        return;
      }
      pathList.forEach(curPath => transJsonAndExcel(curPath, type));
    } catch (error: any) {
      $message.error(error.message);
    }
  };
}

export function activate(context: ExtensionContext) {
  // json -> excel（多语言Json包）
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2excel.forward", json2excelCommandHandle('forward'))
  );
  // excel -> json（多语言Json包）
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.json2excel.reverse", json2excelCommandHandle('reverse'))
  );
}

export function deactivate() {
  // ...
}