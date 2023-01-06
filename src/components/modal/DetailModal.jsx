import styled from 'styled-components';
import { ModalPage } from '../../util/modal';
import { AutoCompliteInput } from './AutoComplite';
import { useDispatch } from 'react-redux';
import { updateIssue } from '../../redux/issueSlice';
import useForm from '../../hooks/useForm';

export const DetailModal = ({ showModal, closeModal, cardData }) => {
  const dispatch = useDispatch();

  const {
    form: updateForm,
    autoComplite,
    setautoComplite,
    onChangeHandler,
    reset,
  } = useForm({ ...cardData });

  let formData = { sortId: cardData.sortId, ...updateForm };

  const updateIssueHandler = () => {
    if (window.confirm('저장할까요?')) {
      dispatch(updateIssue(formData));
      closeModal();
    }
  };

  const formOnClickHandler = (e) => {
    e.stopPropagation();
    setautoComplite(false);
  };

  const cancelHandler = () => {
    reset(cardData);
    closeModal();
  };

  return (
    <ModalPage showModal={showModal} closeModal={closeModal}>
      <ModalForm onClick={formOnClickHandler}>
        <div>
          <span>{cardData.id} #</span>
          <span></span>
        </div>
        <InputWarp>
          <label htmlFor='title'>제목</label>
          <input
            onChange={onChangeHandler}
            type='text'
            name='title'
            id='title'
            maxLength={30}
            value={updateForm.title}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor='content'>내용</label>
          <textarea
            onChange={onChangeHandler}
            id='content'
            name='content'
            cols='30'
            rows='10'
            value={updateForm.content}
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor='name'>담당자</label>
          <input
            onChange={onChangeHandler}
            type='담당자'
            name='name'
            id='name'
            autoComplete='off'
            value={updateForm.name}
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor='deadline'>마감일</label>
          <input
            onChange={onChangeHandler}
            type='datetime-local'
            id='deadline'
            name='deadlilne'
            value={updateForm.deadline}
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            onChange={onChangeHandler}
            name='status'
            defaultValue={updateForm.status}
          >
            <option value='0'>Todo</option>
            <option value='1'>Working</option>
            <option value='2'>Done</option>
          </select>
        </StatusSelect>
        <ButtonWarp>
          <button onClick={cancelHandler}>닫기</button>
          <button type='submit' onClick={updateIssueHandler}>
            변경사항 저장
          </button>
        </ButtonWarp>
        {autoComplite && (
          <AutoCompliteInput
            onChangeHandler={onChangeHandler}
            name={updateForm.name}
            autoComplite={autoComplite}
            setautoComplite={setautoComplite}
          />
        )}
      </ModalForm>
    </ModalPage>
  );
};

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;

  span {
    font-size: 18px;
  }
`;

const InputWarp = styled.div`
  width: 350px;
  font-size: 0.9rem;

  & label {
    width: 50px;
    font-weight: 700;
    visibility: hidden;
  }

  & input {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 5px;
    padding: 0;
    font-size: 24px;
    text-align: center;
    margin-top: 25px;

    &:focus {
      outline: none;
    }
  }

  & textarea {
    width: 100%;
    max-height: 200px;
    resize: none;
    overflow: hidden;
    border-radius: 5px;
    border: none;
    background-color: #f4f4f4;
    padding: 8px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const BottomInputWarp = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  & label {
    width: 50px;
    font-weight: 600;
  }

  & input {
    width: 80%;
    height: 35px;
    border: 1px solid #c7c7c7;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;

    &:hover {
      background-color: #f4f4f4;
    }

    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const StatusSelect = styled.div`
  position: absolute;
  top: 45px;
  right: 50%;
  transform: translateX(50%);

  & select {
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const ButtonWarp = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;

  & button {
    width: 170px;
    background-color: #fff;
    border: 1px solid #c7c7c7;
    padding: 8px 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;

    &:nth-child(1):hover {
      background-color: #d4d4d4;
      border-color: #d4d4d4;
    }

    &:nth-child(2):hover {
      background-color: #ccecf6;
      color: #00339a;
      border-color: #ccecf6;
    }
  }
`;
