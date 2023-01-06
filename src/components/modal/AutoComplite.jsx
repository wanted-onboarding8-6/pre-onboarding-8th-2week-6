import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { nameAPI } from '../../api/api';

export const AutoCompliteInput = ({
  onChangeHandler,
  name,
  autoComplite,
  setautoComplite,
}) => {
  //name data fetch
  const [nameData, setNameData] = useState([]);

  const nameDataFetch = async () => {
    const data = await nameAPI.getNames().then((res) => {
      setNameData(res.data);
    });
    return data;
  };

  useEffect(() => {
    nameDataFetch();
  }, []);

  let newNameData = nameData?.filter(
    (item) =>
      item.name.includes(name) === true && item.name.indexOf(name) !== -1
  );

  return (
    <AutoComplite style={!autoComplite ? { display: 'none' } : null}>
      {newNameData.length === 0 && (
        <AutoCompliteItem>일치하는 담당자가 없습니다.</AutoCompliteItem>
      )}
      {newNameData &&
        newNameData.map((item, index) => (
          <AutoCompliteItem
            key={index}
            onClick={(e) => {
              onChangeHandler(e);
              setautoComplite(false);
            }}
          >
            {item?.name}
          </AutoCompliteItem>
        ))}
    </AutoComplite>
  );
};

const AutoComplite = styled.div`
  position: fixed;
  bottom: 66px;
  right: 30px;
  width: 270px;
  height: 80px;
  overflow-y: scroll;
  border: 1px solid #f4f4f4;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  padding: 5px;
  box-sizing: border-box;
  color: gray;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #aaa;
  }

  &::-webkit-scrollbar-thumb {
    height: 10vh;
    background: #575757;
  }
`;

const AutoCompliteItem = styled.div`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
    color: #000;
  }
`;
