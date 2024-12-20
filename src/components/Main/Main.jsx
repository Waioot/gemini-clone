import { assets } from '../../assets/assets';
import './Main.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import Record from '../Record/Record';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModelList from '../ModelList/ModelList';
export const Main = () => {
  const { onSent, chatInfo, input, setInput } = useContext(Context);

  const [modelOpen, setModelOpen] = useState(false);

  // 监听输入后的回车
  const handleKeyDown = e => {
    if (input.length === 0) return;
    if (e.key === 'Enter') {
      onSent(input);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCloseModelClick = () => {
    setModelOpen(false);
  };

  return (
    <div className='main'>
      <div className='nav'>
        <div
          className='nav-left'
          onClick={e => {
            e.stopPropagation();
            setModelOpen(prev => !prev);
          }}
        >
          <div className='model-name'>
            <p>Gemini</p>
            <ArrowDropDownIcon />
          </div>
          <div className='model-version'>1.5 Flash</div>
        </div>
        <img src={assets.user_icon} alt='user' />
      </div>

      {modelOpen && <ModelList handleCloseModelClick={handleCloseModelClick} />}

      <div className='main-container'>
        {!chatInfo.showResult ? (
          <>
            <div className='greet'>
              <p>
                <span>Hello, John Doe</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className='cards'>
              <div className='card'>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt='card' />
              </div>
              <div className='card'>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt='card' />
              </div>
              <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt='card' />
              </div>
              <div className='card'>
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt='card' />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            {chatInfo.records.map((record, index) => (
              <Record
                key={index}
                record={record}
                // 最后一个记录是否正在加载的
                isLoading={
                  index === chatInfo.records.length - 1 && chatInfo.isLoading
                }
              />
            ))}
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              type='text'
              placeholder='Ask me anything...'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div>
              <img src={assets.gallery_icon} alt='gallery' />
              <img src={assets.mic_icon} alt='mic' />
              <img
                disabled={chatInfo.isLoading || input.length === 0}
                className={
                  chatInfo.isLoading || input.length === 0 ? 'disabled' : ''
                }
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt='send'
              />
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
