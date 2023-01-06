import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIssue } from "../../redux/issueSlice";
import { Card } from "./Card";
import { dragFunction } from "./Card";
import { AddModal } from "../modal/AddModal";
import { updateDndStatus } from "../../redux/dndSlice";

export const IssueBox = ({
  statusNum,
  issueData,
  lastSortId,
  forceLoadingHandler,
}) => {
  const dispatch = useDispatch();
  const dudStatusData = useSelector((state) => state.dndSlice.dndStatus)[0];

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
  const onDragEnter = () => {
    dispatch(
      updateDndStatus({
        ...dudStatusData,
        isDragOver: false,
        position: "none",
      })
    );
  };

  const onDragLeave = (e) => {
    dragFunction(e, "ondragleave");
    dispatch(
      updateDndStatus({
        ...dudStatusData,
        isDragOver: false,
        position: "none",
      })
    );
  };

  const onDragOver = (e) => {
    dragFunction(e, "ondragover");
  };

  // on Drop & fetch
  const onDrop = (e) => {
    dragFunction(e, "ondrop");
    dispatch(
      updateDndStatus({
        ...dudStatusData,
        isDragOver: false,
        endStatus: statusNum,
      })
    );
    updateIssueFormEmpty();
  };
  // console.log("ㅎㅇ", dndStatus);

  const updateIssueFormEmpty = () => {
    let startDCardData = [...issueData].filter(
      (item) => item.id === dudStatusData.startId
    )[0];
    console.log("업뎃데이터", startDCardData);
    dispatch(
      updateIssue({ ...startDCardData, status: dudStatusData.endStatus })
    );
    // forceLoadingHandler();
  };

  return (
    <Container
      onDragEnter={(e) => onDragEnter(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      <AddModal
        showModal={showModal}
        closeModal={closeAddIssueModal}
        statusNum={statusNum}
        lastSortId={lastSortId}
        forceLoadingHandler={forceLoadingHandler}
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
          ?.map((item) => {
            if (item.status === statusNum) {
              return (
                <Card
                  key={item.id}
                  cardData={item}
                  forceLoadingHandler={forceLoadingHandler}
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
