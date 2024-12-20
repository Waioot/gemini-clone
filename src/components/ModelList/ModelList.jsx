import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './ModelList.css';
const ModelListData = [
  {
    name: 'Gemini 1.5 Flash',
    desc: 'Get every day help',
    isSelected: true,
  },
  {
    name: 'Gemini 2.0 Flash Experimental',
    desc: 'Preview gemini-2.0-flash-exp',
    isSelected: false,
  },
];

const ModelList = ({ handleCloseModelClick }) => {
  // 点击弹窗外关闭
  useEffect(() => {
    window.addEventListener('click', handleCloseModelClick);
    return () => {
      window.removeEventListener('click', handleCloseModelClick);
    };
  }, [handleCloseModelClick]);

  return (
    <div className='model-list-wrapper'>
      <div className='model-list-head'>
        <img className='model-head-icon' src={assets.gemini_icon} alt='' />
        <span>Gemini</span>
      </div>

      {ModelListData.map((model, index) => (
        <div className='model-item' key={index}>
          <div className='model-item-info'>
            <div className='model-name'>{model.name}</div>
            <div className='desc'>{model.desc}</div>
          </div>
          {model.isSelected && (
            <div className='choose-icon'>
              <CheckCircleOutlineIcon />
            </div>
          )}
        </div>
      ))}

      <div className='model-list-footer'>
        <img className='model-footer-icon' src={assets.gemini_icon} alt='' />
        <div className='model-footer-info'>
          <div className='model-footer-desc'>Gemini Advanced</div>
          <div className='upgrade-btn'>Upgrade</div>
        </div>
      </div>
    </div>
  );
};

ModelList.propTypes = {
  handleCloseModelClick: PropTypes.func.isRequired,
};

export default ModelList;
