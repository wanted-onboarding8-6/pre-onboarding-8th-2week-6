import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IssueBox } from "../components/kanbanBox/IssueBox";
import { getIssues, issueAction } from "../redux/issueSlice";
import { LoadingSpinner } from "../components/loadingSpinner/LoadingSpinner";

export default function Home() {
  const dispatch = useDispatch();
  const { issue } = useSelector((state) => state.issueSlice);
  const [isLoading, setisLoading] = useState(false);
  const [newIssueData, setnewIssueData] = useState();

  // get last sort id
  const [getLastSortId, setGetLastSortId] = useState();
  useEffect(() => {
    setisLoading(true);
    dispatch(issueAction.loadingStart());
    setTimeout(() => {
      // let newIssueArr = [...issue];
      // newIssueArr.sort((a, b) => b.sortId - a.sortId);
      // setGetLastSortId(newIssueArr[0].sortId);
      setnewIssueData([...issue].sort((a, b) => a.sortId - b.sortId));
      setisLoading(false);
      dispatch(issueAction.loadingEnd());
    }, 500);
  }, [issue]);

  // data fetch
  useEffect(() => {
    setisLoading(true);
    dispatch(getIssues());
    setTimeout(() => {
      setisLoading(false);
    }, 1500);
  }, [dispatch]);

  // data array
  const issueBoxData = [newIssueData, newIssueData, newIssueData];

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
              lastSortId={issueBoxData[0]?.length}
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
