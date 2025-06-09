import OpenAI from 'openai';
import { isEmpty } from './base';
import { getExtensionConfig } from './helper';

export const createOpenAIClient = () => {
  const openAIBaseUrl = getExtensionConfig<string>('openAI.baseUrl');
  const openAIApiKey = getExtensionConfig<string>('openAI.apiKey');

  if (isEmpty(openAIBaseUrl)) {
    throw new Error('请配置 Open AI 接口 URL');
  }
  if (isEmpty(openAIApiKey)) {
    throw new Error('请配置 Open AI 接口 密钥');
  }

  const client = new OpenAI({ baseURL: openAIBaseUrl, apiKey: openAIApiKey });

  return client;
};

export const getOpenAIModel = () => {
  const openAIModel = getExtensionConfig<string>('openAI.model');

  if (isEmpty(openAIModel)) {
    throw new Error('请配置 Open AI 模型');
  }
  return openAIModel;
};
