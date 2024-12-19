import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import run from '../service/gemini';
export const Context = createContext();

const ContextProvider = ({ children }) => {
  // 输入框的值
  const [input, setInput] = useState('what is the meaning of life');
  // 最近提问的内容
  const [recentPrompt, setRecentPrompt] = useState('');
  // 之前的对话记录
  const [prevPrompts, setPrevPrompts] = useState([]);
  // 是否显示本次对话结果
  const [showResult, setShowResult] = useState(false);
  // 是否正在加载
  const [isLoading, setIsLoading] = useState(false);
  // 结果数据
  const [resultData, setResultData] = useState('');

  const onSent = async () => {
    setIsLoading(true);
    setResultData('');
    setShowResult(true);
    setRecentPrompt(input);
    const response = await run(input);
    console.log(response);
    setResultData(response);
    setIsLoading(false);
    setInput('');
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    isLoading,
    resultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ContextProvider;
