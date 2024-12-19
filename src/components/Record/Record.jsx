import './Record.css';

import { assets } from '../../assets/assets';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

const Record = ({ record, isLoading = false }) => {
  return (
    <>
      <div className='result-title'>
        <img src={assets.user_icon} alt='user' />
        <div className='result-data-markdown'>
          <Markdown>{record.question}</Markdown>
        </div>
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
          <div className='result-data-markdown'>
            <Markdown>{record.answer}</Markdown>
          </div>
        )}
      </div>
    </>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Record;
