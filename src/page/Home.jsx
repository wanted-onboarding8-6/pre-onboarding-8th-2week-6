import { useEffect, useState } from "react";
import styled from "styled-components";
import { IssueBox } from "../components/kanbanBox/IssueBox";
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../redux/issueSlice";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";

export default function Home() {
  const dispatch = useDispatch();
  const { issue } = useSelector((state) => state.issueSlice);
  const [isLoading, setisLoading] = useState(false);

  const [newIssueData, setnewIssueData] = useState(issue);

  // get last sort id
  const [getLastSortId, setGetLastSortId] = useState();

  // data fetch
  useEffect(() => {
    setisLoading(true);
    dispatch(getIssues());
    setTimeout(() => {
      setisLoading(false);
    }, 1500);
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      let newIssueArr = [...issue];
      newIssueArr.sort((a, b) => b.sortId - a.sortId);
      setGetLastSortId(newIssueArr[0].sortId);
      setnewIssueData([...issue].sort((a, b) => a.sortId - b.sortId));
    }, 500);
  }, [issue]);

  // data array
  const issueBoxData = [newIssueData, newIssueData, newIssueData];

  // dnd status for Card.jsx
  const [dndStatus, setDndStatus] = useState({
    isDragOver: false,
    position: "none",
    prevPosition: "none",
    startId: 0,
    endId: 0,
    startStatus: 0,
    endStatus: 0,
  });

  // dnd form data
  useEffect(() => {
    if (dndStatus.startId !== 0) {
      setDndStatus({
        ...dndStatus,
      });
    }
  }, [dndStatus.endStatus, issue]);

  // console.log("이슈데이터", newFormData);
  console.log("스테이터스 데이터", dndStatus);

  return (
    <Container>
      {isLoading ? <LoadingSpinner /> : null}

      <HeaderWrap>
        <p>Issue Tracker</p>
        <hr />
      </HeaderWrap>
      <KanbanWrap>
        {issueBoxData?.map((item, index) => {
          return (
            <IssueBox
              key={index}
              statusNum={index}
              issueData={item}
              lastSortId={getLastSortId}
              dndStatus={dndStatus}
              setDndStatus={setDndStatus}
            />
          );
        })}
      </KanbanWrap>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 95vw;

  & hr {
    border: none;
    box-shadow: 0 0 0 1px lightgray;
  }
`;

const HeaderWrap = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const KanbanWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
