import styled from "styled-components";
import { useEffect, useState } from "react";
import { ModalPage } from "../../util/modal";
import { AutoCompliteInput } from "./AutoComplite";
import { useDispatch } from "react-redux";
import { addIssue } from "../../redux/issueSlice";

export const AddModal = ({ showModal, closeModal, statusNum, lastSortId }) => {
  const dispatch = useDispatch();

  // form data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(statusNum);
  const [name, setName] = useState("");

  // auto complite status
  const [autoComplite, setautoComplite] = useState(false);
  useEffect(() => {
    if (name.length >= 1) setautoComplite(true);
    if (name === "") setautoComplite(false);
  }, [name]);

  // onChange form data handler
  const onChangeHandler = (e, type) => {
    if (type === "title") setTitle(e);
    if (type === "content") setContent(e);
    if (type === "name") setName(e);
    if (type === "deadline") setDeadline(e);
    if (type === "status") setStatus(e);
  };

  // send data
  let formData = {
    sortId: lastSortId + 1,
    title: title,
    content: content,
    deadline: deadline,
    status: status,
    name: name,
  };

  const addIssueHandler = () => {
    if (window.confirm("저장할까요?")) {
      dispatch(addIssue(formData));
    }
    closeModal();
  };

  return (
    <ModalPage showModal={showModal} closeModal={closeModal}>
      <ModalForm onClick={() => setautoComplite(false)}>
        <InputWarp>
          <label htmlFor="title">제목</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "title");
            }}
            type="text"
            id="title"
            maxLength={30}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor="content">내용</label>
          <textarea
            onChange={(e) => {
              onChangeHandler(e.target.value, "content");
            }}
            id="content"
            cols="30"
            rows="10"
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor="name">담당자</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "name");
            }}
            type="담당자"
            id="name"
            autoComplete="off"
            value={name}
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor="deadline">마감일</label>
          <input
            onChange={(e) => {
              onChangeHandler(e.target.value, "deadline");
            }}
            type="datetime-local"
            id="deadline"
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            onChange={(e) => {
              onChangeHandler(e.target.value, "status");
            }}
            defaultValue={statusNum}
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
            취소
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addIssueHandler();
            }}
            type="submit"
          >
            저장
          </button>
        </ButtonWarp>
        <AutoCompliteInput
          onChangeHandler={onChangeHandler}
          name={name}
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
