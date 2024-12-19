import { assets } from '../../assets/assets';
import './Main.css';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    isLoading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='user' />
      </div>

      <div className='main-container'>
        {!showResult ? (
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
            <div className='result-title'>
              <img src={assets.user_icon} alt='user' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt='gemini' />
              {isLoading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultData}</p>
              )}
            </div>
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
