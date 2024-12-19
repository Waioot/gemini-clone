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

  // 打字机效果
  function typingEffect(text, setText, speed = 10) {
    let index = 0;
    const interval = setInterval(() => {
      setText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval); // 清除定时器
      }
    }, speed);
    return interval;
  }

  const onSent = async () => {
    setIsLoading(true);
    setResultData('');
    setShowResult(true);
    setRecentPrompt(input);
    const response = await run(input);
    console.log(response);
    const interval = typingEffect(response, setResultData);
    setIsLoading(false);
    setInput('');
    // 清除定时器以防止内存泄漏
    return () => clearInterval(interval);
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
