import { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import DialogItem from '../DialogItem/DialogItem';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { dialogueList, newChat } = useContext(Context);

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
          <img src={assets.plus_icon} alt='plus' onClick={newChat} />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            {dialogueList.length > 0 &&
              dialogueList.map((dialogue, index) => (
                <DialogItem key={index} dialogue={dialogue} index={index} />
              ))}
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
