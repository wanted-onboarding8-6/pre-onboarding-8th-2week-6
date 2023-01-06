import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IssueBox } from "../components/kanbanBox/IssueBox";
import { getIssues } from "../redux/issueSlice";
import { forceLoading } from "../redux/issueSlice";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";

export default function Home() {
  const dispatch = useDispatch();
  const { issue, isLoading } = useSelector((state) => state.issueSlice);

  const [newIssueData, setnewIssueData] = useState();

  // get last sort id
  const [getLastSortId, setGetLastSortId] = useState();
  useEffect(() => {
    setTimeout(() => {
      let newIssueArr = [...issue];
      newIssueArr?.sort((a, b) => b.sortId - a.sortId);
      setGetLastSortId(newIssueArr[0]?.sortId);
      setnewIssueData([...issue].sort((a, b) => a.sortId - b.sortId));
    }, 500);
  }, [issue]);

  // data fetch
  useEffect(() => {
    dispatch(forceLoading());
    dispatch(getIssues());
    setTimeout(() => {
      dispatch(forceLoading());
    }, 1500);
  }, [dispatch]);

  // data array
  const issueBoxData = [newIssueData, newIssueData, newIssueData];

  // force lading 500ms after requset
  const forceLoadingHandler = () => {
    dispatch(forceLoading());
    setTimeout(() => {
      dispatch(forceLoading());
    }, 500);
  };

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
              forceLoadingHandler={forceLoadingHandler}
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
