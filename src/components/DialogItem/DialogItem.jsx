import './DialogItem.css';
import { assets } from '../../assets/assets';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const DialogItem = ({ dialogue, index }) => {
  const { changeDialogue } = useContext(Context);
  return (
    <div className='recent-entry' onClick={() => changeDialogue(index)}>
      <img src={assets.message_icon} alt='message' />
      <p>{dialogue[0]?.question.slice(0, 35)}</p>
      <div className='delete-btn'>
        <DeleteOutlinedIcon />
      </div>
    </div>
  );
};

DialogItem.propTypes = {
  // 修改 PropTypes 定义，使其匹配实际的数据结构
  dialogue: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default DialogItem;
