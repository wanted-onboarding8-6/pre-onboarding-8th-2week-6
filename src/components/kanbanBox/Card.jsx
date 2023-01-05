import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteIssue } from "../../redux/issueSlice";
import { DetailModal } from "../modal/DetailModal";
import { useState } from "react";
import { updateIssue } from "../../redux/issueSlice";

// dnd function
export const dragFunction = (e, type) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(type);
};

// component start ##############
export const Card = ({ cardData, dndStatus, setDndStatus }) => {
  const dispatch = useDispatch();
  const { issue } = useSelector((state) => state.issueSlice);

  const deleteIssueHandler = (e, issueId) => {
    e.stopPropagation();
    if (window.confirm("삭제할까요?")) {
      dispatch(deleteIssue(issueId));
    }
  };

  // detail issue modal
  const [showModal, setShowModal] = useState(false);
  const openAddIssueModal = () => {
    setShowModal(true);
  };
  const closeAddIssueModal = () => {
    setShowModal(false);
  };

  //####### dnd event ########
  console.log(dndStatus);
  const [dndPosition, setDndPosition] = useState("none");

  const onDragStart = () => {
    setDndStatus({
      ...dndStatus,
      startId: cardData?.id,
      startStatus: cardData?.status,
    });
  };

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
  const onDragOverTop = (e) => {
    dragFunction(e, "ondragover");
    setDndStatus({
      ...dndStatus,
      isDragOver: true,
      position: "top",
      prevPosition: "top",
    });
    setDndPosition("top");
  };
  const onDragOverBottom = (e) => {
    dragFunction(e, "ondragover");
    setDndStatus({
      ...dndStatus,
      isDragOver: true,
      position: "bottom",
      prevPosition: "bottom",
    });
    setDndPosition("botton");
  };

  // on Drop & fetch
  const onDrop = (e) => {
    dragFunction(e, "ondrop");
    console.log(
      "여기놓을게에",
      cardData?.id,
      cardData?.sortId,
      cardData?.status
    );
    setDndStatus({
      ...dndStatus,
      isDragOver: false,
      position: "none",
      endId: cardData?.id,
      endStatus: cardData?.status,
    });
    setDndPosition("none");

    updateIssueHandler();
  };

  const updateIssueHandler = () => {
    // except argument
    const forRejectArr = [...issue].filter(
      (item) => item.status === dndStatus.startStatus
    );
    const cardIndex = forRejectArr.findIndex(
      (item) => item.id === dndStatus.startId
    );
    console.log("체크용", forRejectArr);
    console.log("체크용", cardIndex);

    // drag data
    const startIssueData = [...issue].filter(
      (item) => item.id === dndStatus.startId
    )[0];
    console.log("뽑아융", startIssueData);

    // drop data
    const thisStatusArr = [...issue].filter(
      (item) => item.status === dndStatus.endStatus
    );

    let dropCardIndexNumber = 0;
    const dropedCardIndex = thisStatusArr.map((item, index) => {
      if (item.id === dndStatus.endId) {
        dropCardIndexNumber = index;
      }
    });
    console.log("어딨냐", dndStatus);
    console.log("어딨냐1", thisStatusArr);
    console.log("어딨냐2", dropedCardIndex);
    console.log("어딨냐3", dropCardIndexNumber);

    // new critica
    if (dndStatus.prevPosition === "bottom") {
      dispatch(
        updateIssue({
          ...startIssueData,
          sortId: thisStatusArr[dropCardIndexNumber].sortId + 0.001,
          status: dndStatus.endStatus,
        })
      );
    } else if (dndStatus.prevPosition === "top") {
      dispatch(
        updateIssue({
          ...startIssueData,
          sortId: thisStatusArr[dropCardIndexNumber].sortId - 0.001,
          status: dndStatus.endStatus,
        })
      );
    }
  };

  return (
    <>
      <DndHr
        style={
          dndPosition === "top"
            ? {
                width: "100%",
                height: "3px",
              }
            : null
        }
      />
      <Container
        onClick={openAddIssueModal}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <DetailModal
          showModal={showModal}
          closeModal={closeAddIssueModal}
          cardData={cardData}
        />
        <CardTop onDragOver={onDragOverTop}>
          <span>
            {cardData?.id} # - {cardData?.title}
          </span>
          <ImgWrap onClick={(e) => deleteIssueHandler(e, cardData?.id)}>
            <img src={require("../../images/delete.png")} alt="삭제버튼" />
          </ImgWrap>
        </CardTop>
        <CardBody onDragOver={onDragOverTop}>
          <p>{cardData?.content}</p>
        </CardBody>
        <CardFooter onDragOver={onDragOverBottom}>
          <span>{cardData?.name}</span>
          <span>deadline : ~ {cardData?.deadline.replace("T", " / ")}</span>
        </CardFooter>
      </Container>
      <DndHr
        style={
          dndPosition !== "none" && dndPosition !== "top"
            ? {
                width: "100%",
                height: "3px",
              }
            : null
        }
      />
    </>
  );
};

const DndHr = styled.hr`
  width: 0px;
  height: 0px;
  border: none;
  background-color: gray;
  transition: 0.2s;
`;

const Container = styled.div`
  margin: 5px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: 0.8s;
  animation: cardFade 0.6s;

  @keyframes cardFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CardTop = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgWrap = styled.div`
  display: flex;
  background-color: #ff7373;
  border-radius: 5px;
  cursor: pointer;
  & img {
    width: 25px;
    height: 25px;
  }
`;

const CardBody = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;

  & p {
    margin: 0;
    font-size: 0.8rem;
    overflow: hidden;
  }
`;

const CardFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span:last-child {
    color: gray;
    font-size: 0.8rem;
    text-align: right;
  }
`;
