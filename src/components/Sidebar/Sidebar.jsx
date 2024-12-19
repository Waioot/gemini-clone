import { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
      <div className='top'>
        <img
          className='menu'
          src={assets.menu_icon}
          alt='menu'
          onClick={() => setExtended(!extended)}
        />
        <div className='new-chat'>
          <img src={assets.plus_icon} alt='plus' />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            <div className='recent-entry'>
              <img src={assets.message_icon} alt='message' />
              <p>What is react ...</p>
            </div>
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt='question' />
          {extended && <p>Help</p>}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt='activity' />
          {extended && <p>Activity</p>}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt='setting' />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
