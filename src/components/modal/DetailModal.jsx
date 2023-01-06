import styled from "styled-components";
import { useEffect, useState } from "react";
import { ModalPage } from "../../util/modal";
import { AutoCompliteInput } from "./AutoComplite";
import { useDispatch } from "react-redux";
import { updateIssue } from "../../redux/issueSlice";

export const DetailModal = ({
  showModal,
  closeModal,
  cardData,
  forceLoadingHandler,
}) => {
  const dispatch = useDispatch();

  // form data
  const [updateForm, setUpdateForm] = useState({ ...cardData });

  // auto complite status
  const [autoComplite, setautoComplite] = useState(false);

  console.log(updateForm);
  useEffect(() => {
    if (updateForm.name !== cardData.name) {
      updateForm.name.length > 0
        ? setautoComplite(true)
        : setautoComplite(false);
    }
  }, [updateForm.name]);

  // onChange form data handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "status")
      setUpdateForm((form) => ({ ...form, [name]: Number(value) }));
    else setUpdateForm((form) => ({ ...form, [name]: value }));
  };

  let formData = { sortId: cardData.sortId, ...updateForm };

  const updateIssueHandler = () => {
    if (window.confirm("저장할까요?")) {
      dispatch(updateIssue(formData));
      forceLoadingHandler();
      closeModal();
    }
  };

  const formOnClickHandler = (e) => {
    e.stopPropagation();
    setautoComplite(false);
  };

  return (
    <ModalPage showModal={showModal} closeModal={closeModal}>
      <ModalForm onClick={(e) => formOnClickHandler(e)}>
        <div>
          <span>{cardData.id} #</span>
          <span></span>
        </div>
        <InputWarp>
          <label htmlFor="title">제목</label>
          <input
            onChange={onChangeHandler}
            type="text"
            name="title"
            id="title"
            maxLength={30}
            value={updateForm.title}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor="content">내용</label>
          <textarea
            onChange={onChangeHandler}
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={updateForm.content}
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor="name">담당자</label>
          <input
            onChange={onChangeHandler}
            type="담당자"
            name="name"
            id="name"
            autoComplete="off"
            value={updateForm.name}
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor="deadline">마감일</label>
          <input
            onChange={onChangeHandler}
            type="datetime-local"
            id="deadline"
            name="deadlilne"
            value={updateForm.deadline}
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            onChange={onChangeHandler}
            name="status"
            defaultValue={updateForm.status}
          >
            <option value="0">Todo</option>
            <option value="1">Working</option>
            <option value="2">Done</option>
          </select>
        </StatusSelect>
        <ButtonWarp>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            닫기
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateIssueHandler();
            }}
            type="submit"
          >
            변경사항 저장
          </button>
        </ButtonWarp>
        <AutoCompliteInput
          onChangeHandler={onChangeHandler}
          name={updateForm.name}
          autoComplite={autoComplite}
          setautoComplite={setautoComplite}
          type="update"
          setUpdateForm={setUpdateForm}
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
  z-index: 3;
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
