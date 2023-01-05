import styled from "styled-components";
import { useEffect, useState } from "react";
import { nameAPI } from "../../api/api";

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
  }, [setNameData]);

  return (
    <>
      <AutoComplite style={!autoComplite ? { display: "none" } : null}>
        {nameData.length === 0 ? (
          <AutoCompliteItem>일치하는 담당자가 없습니다.</AutoCompliteItem>
        ) : (
          nameData
            ?.filter(
              (item) =>
                item.name.includes(name) === true &&
                item.name.indexOf(name) === 0
            )
            .map((item, index) => {
              if (item?.name) {
                return (
                  <AutoCompliteItem
                    key={index}
                    onClick={() => {
                      onChangeHandler(item?.name, "name");
                      setautoComplite(false);
                    }}
                  >
                    {item?.name}
                  </AutoCompliteItem>
                );
              }
            })
        )}
      </AutoComplite>
    </>
  );
};

const AutoComplite = styled.div`
  position: fixed;
  bottom: 90px;
  right: 72px;
  width: 15vw;
  max-height: 100px;
  overflow-y: scroll;
  border: 3px solid lightgray;
  background-color: white;
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
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
