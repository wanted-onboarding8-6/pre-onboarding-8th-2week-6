import { useState } from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { AddModal } from "../modal/AddModal";
import { useDispatch } from "react-redux";
import { updateIssue } from "../../redux/issueSlice";
import { dragFunction } from "./Card";

export const IssueBox = ({
  statusNum,
  issueData,
  lastSortId,
  dndStatus,
  setDndStatus,
}) => {
  const dispatch = useDispatch();

  let issueName =
    statusNum === 0 ? "Todo" : statusNum === 1 ? "Working" : "Done";

  // add issue modal
  const [showModal, setShowModal] = useState(false);
  const openAddIssueModal = () => {
    setShowModal(true);
  };
  const closeAddIssueModal = () => {
    setShowModal(false);
  };

  // empty box drop event

  const [dndPosition, setDndPosition] = useState("none");

  const onDragStart = () => {};

  const onDragEnter = () => {
    setDndStatus({
      ...dndStatus,
      isDragOver: false,
      position: "none",
    });
    setDndPosition("none");
  };

  const onDragLeave = (e) => {
    dragFunction(e, "ondragleave");
    setDndStatus({ ...dndStatus, isDragOver: false, position: "none" });
    setDndPosition("none");
  };

  const onDragOver = (e) => {
    dragFunction(e, "ondragover");
    setDndStatus({
      ...dndStatus,
      isDragOver: true,
      position: "top",
      prevPosition: "top",
    });
    setDndPosition("top");
  };

  // on Drop & fetch
  const onDrop = (e) => {
    dragFunction(e, "ondrop");

    setDndStatus({
      ...dndStatus,
      isDragOver: false,
      position: "none",
      endStatus: statusNum,
    });
    setDndPosition("none");

    updateIssueFormEmpty();
  };
  console.log("ㅎㅇ", dndStatus);

  const updateIssueFormEmpty = () => {
    let startDCardData = [...issueData].filter(
      (item) => item.id === dndStatus.startId
    )[0];
    dispatch(updateIssue({ ...startDCardData, status: dndStatus.endStatus }));
  };

  return (
    <Container
      draggable="true"
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <AddModal
        showModal={showModal}
        closeModal={closeAddIssueModal}
        statusNum={statusNum}
        lastSortId={lastSortId}
      />
      <BoradTop>
        <div>
          <p>{issueName}</p>
        </div>
        <ImgWrap onClick={openAddIssueModal}>
          <img src={require("../../images/plus.png")} alt="이슈 추가" />
        </ImgWrap>
      </BoradTop>
      <CardBox>
        {issueData
          ?.map((item, index) => {
            if (item.status === statusNum) {
              return (
                <Card
                  key={item.id}
                  cardData={item}
                  dndStatus={dndStatus}
                  setDndStatus={setDndStatus}
                />
              );
            }
          })
          .sort((a, b) => a.sortId - b.sortId)}
      </CardBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoradTop = styled.div`
  display: flex;
  align-items: center;

  & p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const ImgWrap = styled.div`
  background-color: #c2c2c2;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px 0 20px;
  & img {
    display: flex;
    width: 25px;
    height: 25px;
  }
`;

const CardBox = styled.div`
  width: 30vw;
  height: 70vh;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: #e4e4e4;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #aaa;
  }
  &::-webkit-scrollbar-thumb {
    height: 10vh;
    background: #575757;
  }
`;
