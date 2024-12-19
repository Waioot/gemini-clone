import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import run from '../service/gemini';
export const Context = createContext();

const initialState = {
  records: [],
  showResult: false,
  isLoading: false, // 最后一个记录是正在加载的
};

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [dialogueList, setDialogueList] = useState([]);
  const [chatInfo, setChatInfo] = useState(initialState);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  function updateAnser(text) {
    setChatInfo(prev => {
      const updatedRecords = [...prev.records];
      // 更新最后一条记录的答案
      updatedRecords[updatedRecords.length - 1].answer = text;
      return { ...prev, records: updatedRecords };
    });
  }

  // 打字机效果
  function typingEffect(answer, speed = 10) {
    let index = 0;
    const interval = setInterval(() => {
      updateAnser(answer.slice(0, index));
      index++;
      if (index > answer.length) {
        clearInterval(interval); // 清除定时器
      }
    }, speed);
    return interval;
  }

  function newChat() {
    // 先保存当前对话
    if (chatInfo.records.length > 0) {
      setDialogueList(prev => {
        const newList = [...prev];
        newList[currentDialogueIndex] = chatInfo.records;
        return newList;
      });
    }

    // 创建新对话
    setChatInfo({ ...initialState });
    // 更新对话 index
    setCurrentDialogueIndex(prev => prev + 1);
  }
  function changeDialogue(index) {
    console.log(index);
    setCurrentDialogueIndex(index);
    setChatInfo({
      ...initialState,
      showResult: true,
      records: dialogueList[index],
    });
  }

  const onSent = async () => {
    if (input.trim() === '') return;
    const newChatInfo = {
      ...chatInfo,
      isLoading: true,
      showResult: true,
      records: [...chatInfo.records, { question: input, answer: '' }],
    };
    setInput('');
    setChatInfo(newChatInfo);

    const response = await run(input);
    console.log(response);
    // 打字机效果
    const interval = typingEffect(response, 10);
    setChatInfo(prev => ({ ...prev, isLoading: false }));

    // 将当前对话保存到 dialogueList
    setDialogueList(prev => {
      const newList = [...prev];
      newList[currentDialogueIndex] = newChatInfo.records;
      return newList;
    });

    // 清除定时器以防止内存泄漏
    return () => clearInterval(interval);
  };

  const contextValue = {
    chatInfo,
    setChatInfo,
    input,
    setInput,
    dialogueList,
    setDialogueList,
    onSent,
    newChat,
    currentDialogueIndex,
    setCurrentDialogueIndex,
    changeDialogue,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ContextProvider;
