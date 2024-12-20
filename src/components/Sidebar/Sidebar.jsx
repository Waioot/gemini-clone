import { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import DialogItem from '../DialogItem/DialogItem';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { dialogueList, newChat } = useContext(Context);

  return (
    <div className={`sidebar ${extended ? 'expanded' : ''}`}>
      <div className='sidebar-content-wrapper'>
        <div className='top-container'>
          <div className='menu-btn'>
            <img
              className='menu-icon'
              src={assets.menu_icon}
              alt='menu'
              onClick={() => setExtended(!extended)}
            />
          </div>
          <div
            className={`new-chat-btn ${extended ? 'expanded' : ''}`}
            onClick={newChat}
          >
            <div className='new-chat-icon'>
              <AddOutlinedIcon />
            </div>
            {extended && <div className='new-chat-text'>New Chat</div>}
          </div>
          {extended && (
            <div className='recent-wapper'>
              <p className='recent-title'>Recent</p>
              <div className='recent-list'>
                {dialogueList.length > 0 &&
                  dialogueList.map((dialogue, index) => (
                    <DialogItem key={index} dialogue={dialogue} index={index} />
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className='bottom'>
          <div className='bottom-item'>
            <img src={assets.question_icon} alt='question' />
            {extended && <p>Help</p>}
          </div>
          <div className='bottom-item'>
            <img src={assets.history_icon} alt='activity' />
            {extended && <p>Activity</p>}
          </div>
          <div className='bottom-item'>
            <img src={assets.setting_icon} alt='setting' />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
