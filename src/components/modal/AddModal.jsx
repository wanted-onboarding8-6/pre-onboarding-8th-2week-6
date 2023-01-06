import styled from "styled-components";
import { ModalPage } from "../../util/modal";
import { AutoCompliteInput } from "./AutoComplite";
import { useDispatch } from "react-redux";
import { addIssue } from "../../redux/issueSlice";
import useForm from "../../hooks/useForm";

export const AddModal = ({
  showModal,
  closeModal,
  statusNum,
  lastSortId,
  forceLoadingHandler,
}) => {
  const dispatch = useDispatch();

  const { form, autoComplite, setautoComplite, onChangeHandler, reset } =
    useForm({
      status: statusNum,
      name: "",
    });

  let formData = { sortId: lastSortId + 1, ...form };

  const addIssueHandler = () => {
    if (window.confirm("저장할까요?")) {
      dispatch(addIssue(formData));
      forceLoadingHandler();
      closeModal();
    }
  };

  const cancelHandler = () => {
    reset({ status: statusNum, name: "" });
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
          <label htmlFor="title">제목</label>
          <input
            onChange={onChangeHandler}
            type="text"
            name="title"
            value={form.title || ""}
            id="title"
            maxLength={30}
          />
        </InputWarp>
        <InputWarp>
          <label htmlFor="content">내용</label>
          <textarea
            onChange={onChangeHandler}
            name="content"
            id="content"
            cols="30"
            rows="10"
          />
        </InputWarp>
        <BottomInputWarp>
          <label htmlFor="name">담당자</label>
          <input
            onChange={onChangeHandler}
            type="담당자"
            id="name"
            name="name"
            autoComplete="off"
            value={form.name || ""}
          />
        </BottomInputWarp>
        <BottomInputWarp>
          <label htmlFor="deadline">마감일</label>
          <input
            onChange={onChangeHandler}
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={form.deadline || ""}
          />
        </BottomInputWarp>
        <StatusSelect>
          <select
            name="status"
            onChange={onChangeHandler}
            value={form.status || statusNum}
          >
            <option value="0">Todo</option>
            <option value="1">Working</option>
            <option value="2">Done</option>
          </select>
        </StatusSelect>
        <ButtonWarp>
          <button onClick={cancelHandler}>취소</button>
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
          name={form.name}
          autoComplite={autoComplite}
          setautoComplite={setautoComplite}
        />
      </ModalForm>
    </ModalPage>
  );
};

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  padding-top: 40px;
`;

const InputWarp = styled.div`
  width: 350px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(2) label {
    display: none;
  }

  & input {
    width: 85%;
    height: 35px;
    border: 1px solid #c7c7c7;
    border-radius: 5px;
    padding: 4px;
    box-sizing: border-box;
    font-size: 24px;

    &:focus {
      outline: 1.5px solid #00339a;
    }
  }

  & textarea {
    width: 100%;
    height: 200px;
    resize: none;
    overflow: hidden;
    border-radius: 5px;
    border: none;
    background-color: #f4f4f4;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 25px;

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
  top: 20px;
  right: 25px;

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
