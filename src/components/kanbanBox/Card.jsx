import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIssue, deleteIssue, issueAction } from "../../redux/issueSlice";
import { updateDndStatus } from "../../redux/dndSlice";
import { DetailModal } from "../modal/DetailModal";

// dnd function
export const dragFunction = (e, type) => {
  e.preventDefault();
  e.stopPropagation();
};

// component start ##############
export const Card = ({ cardData }) => {
  const dispatch = useDispatch();
  const { issue } = useSelector((state) => state.issueSlice);
  const dudStatusData = useSelector((state) => state.dndSlice.dndStatus)[0];

  const deleteIssueHandler = (e, issueId) => {
    e.stopPropagation();
    if (window.confirm("삭제할까요?")) {
      dispatch(issueAction.loadingStart());
      setTimeout(() => {
        dispatch(deleteIssue(issueId));
        dispatch(issueAction.loadingEnd());
      }, 500);
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
  // console.log("리덕스 ㅎㅇ", dudStatusData);
  const [dndPosition, setDndPosition] = useState("none");

  const onDragStart = (e) => {
    dispatch(
      updateDndStatus({
        ...dudStatusData,
        startId: cardData?.id,
        startStatus: cardData?.status,
        startSortId: cardData?.sortId,
      })
    );
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    dispatch(
      updateDndStatus({
        ...dudStatusData,
        isDragOver: true,
        position: "top",
      })
    );
    setDndPosition("none");
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
    setDndPosition("none");
  };

  const [dragOverData, setDragOverData] = useState({
    isDragOver: true,
    position: "top",
    prevPosition: "top",
  });
  const onDragOverTop = (e) => {
    dragFunction(e, "ondragover");
    setDragOverData({
      isDragOver: true,
      position: "top",
      prevPosition: "top",
    });
    setDndPosition("top");
  };

  // on Drop & fetch
  const onDrop = (e) => {
    dragFunction(e, "ondrop");

    dispatch(
      updateDndStatus({
        ...dudStatusData,
        isDragOver: false,
        position: "none",
        prevPosition: dragOverData.position,
        endId: cardData?.id,
        endStatus: cardData?.status,
        endSortId: cardData?.sortId,
      })
    );
    setDndPosition("none");
  };

  const onDragEnd = (e) => {
    dragFunction(e, "onDragEnd");
    updateIssueHandler();
  };

  const updateIssueHandler = () => {
    // drag data
    const startIssueData = [...issue]?.filter(
      (item) => item.id === dudStatusData.startId
    )[0];

    // drop data
    const thisStatusArr = [...issue]?.filter(
      (item) => item.status === dudStatusData.endStatus
    );

    let dropCardIndexNumber = 0;
    const dropedCardIndex = thisStatusArr.map((item, index) => {
      if (item.id === dudStatusData.endId) {
        dropCardIndexNumber = index;
      }
    });

    // new critica
    if (dudStatusData.prevPosition === "bottom") {
      dispatch(
        updateIssue({
          ...startIssueData,
          sortId: thisStatusArr[dropCardIndexNumber]?.sortId + 0.1,
          status: dudStatusData.endStatus,
        })
      );
    } else if (dudStatusData.prevPosition === "top") {
      dispatch(
        updateIssue({
          ...startIssueData,
          sortId: thisStatusArr[dropCardIndexNumber]?.sortId - 0.1,
          status: dudStatusData.endStatus,
        })
      );
    }
  };

  return (
    <>
      <DetailModal
        showModal={showModal}
        closeModal={closeAddIssueModal}
        cardData={cardData}
      />
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
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOverTop}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        draggable
      >
        <CardTop>
          <span>
            {cardData?.id} # - {cardData?.title}
          </span>
          <ImgWrap onClick={(e) => deleteIssueHandler(e, cardData?.id)}>
            <img src={require("../../images/delete.png")} alt="삭제버튼" />
          </ImgWrap>
        </CardTop>
        <CardBody>
          <p>{cardData?.content}</p>
        </CardBody>
        <CardFooter>
          <span>{cardData?.name}</span>
          <span>deadline : ~ {cardData?.deadline?.replace("T", " / ")}</span>
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
  transition: 0.15s;
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
