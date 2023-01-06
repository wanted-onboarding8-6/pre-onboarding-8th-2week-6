import styled from 'styled-components';
import { ModalPage } from '../../util/modal';
import { AutoCompliteInput } from './AutoComplite';
import { useDispatch } from 'react-redux';
import { addIssue } from '../../redux/issueSlice';
import useForm from '../../hooks/useForm';

export const AddModal = ({ showModal, closeModal, statusNum, lastSortId }) => {
  const dispatch = useDispatch();
  const { form, autoComplite, setautoComplite, onChangeHandler } = useForm({ status: statusNum, name: '' });

  let formData = { sortId: lastSortId + 1, ...form };

  const addIssueHandler = () => {
    if (window.confirm('저장할까요?')) {
      dispatch(addIssue(formData));
    }
    closeModal();
  };

  return (
    <ModalPage showModal={showModal} closeModal={closeModal}>
      <ModalForm
        onClick={(e) => {
          e.stopPropagation();
          setautoComplite(false);
        }}
      >
        <InputWarp>
          <label htmlFor='title'>제목</label>
          <input
            onChange={onChangeHandler}
            type='text'
            name='title'
            value={form.title || ''}
            id='title'
            maxLength={30}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor='content'>내용</label>
          <textarea
            onChange={onChangeHandler}
            name='content'
            id='content'
            cols='30'
            rows='10'
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor='name'>담당자</label>
          <input
            onChange={onChangeHandler}
            type='담당자'
            id='name'
            name='name'
            autoComplete='off'
            value={form.name || ''}
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor='deadline'>마감일</label>
          <input
            onChange={onChangeHandler}
            type='datetime-local'
            id='deadline'
            name='deadline'
            value={form.deadline || ''}
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            name='status'
            onChange={onChangeHandler}
            value={form.status || statusNum}
          >
            <option value='0'>Todo</option>
            <option value='1'>Working</option>
            <option value='2'>Done</option>
          </select>
        </StatusSelect>
        <ButtonWarp>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            취소
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addIssueHandler();
            }}
            type='submit'
          >
            저장
          </button>
        </ButtonWarp>
        <AutoCompliteInput
          onChangeHandler={onChangeHandler}
          name={form.name}
          autoComplite={autoComplite}
          setautoComplite={setautoComplite}
        />
      </ModalForm>
    </ModalPage>
  );
};

const ModalForm = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const InputWarp = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;

  font-size: 0.9rem;
  & label {
    width: 50px;
    margin-right: 10px;
    font-weight: bold;
  }
  & input {
    width: 300px;
    height: 25px;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
  & textarea {
    width: 300px;
    resize: none;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid black;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const BottomInputWarp = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  font-size: 0.9rem;
  & label {
    width: 50px;
    margin-right: 10px;
    font-weight: bold;
  }
  & input {
    width: 180px;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border: 1px solid #a5a5a5;
    }
  }
`;

const StatusSelect = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 300px;
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
  margin-top: 20px;
  display: flex;
  & button {
    margin: 0 10px 0 10px;
  }
`;
