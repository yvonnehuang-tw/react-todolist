import styles from '../../styles/Todo.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomButton from '../common/CustomButton';

export default function AddTodo({ onAddTodo, onErrorMessage, errorMessage }) {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = event => {
    setInputValue(event.target.value);
  };

  const handleClickAddBtn = event => {
    if (event.type === 'click' || event.key === 'Enter') {
      if (inputValue.trim() === '') {
        onErrorMessage(true);
      } else {
        onErrorMessage(false);
        onAddTodo(inputValue);
        setInputValue('');
      }
    }
  };

  return (
    <div
      className={styles.inputContent}
      style={{ marginTop: errorMessage ? 20 : 50 }}
    >
      <input
        type="text"
        placeholder={t('todolist.addPlaceHolder')}
        value={inputValue}
        onChange={e => handleChangeInputValue(e)}
        onKeyUp={e => handleClickAddBtn(e)}
      />
      <CustomButton
        title={t('todolist.addBtn')}
        icon="icon-plus"
        hoverBgColor={'rgba(17, 141, 240, 1)'}
        onClick={e => handleClickAddBtn(e)}
      />
    </div>
  );
}
