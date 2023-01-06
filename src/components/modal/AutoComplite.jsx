import styled from "styled-components";
import { useEffect, useState } from "react";
import { nameAPI } from "../../api/api";

export const AutoCompliteInput = ({
  onChangeHandler,
  name,
  autoComplite,
  setautoComplite,
  type,
  setForm,
  setUpdateForm,
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

  let newNameData = nameData?.filter(
    (item) =>
      item.name.includes(name) === true && item.name.indexOf(name) !== -1
  );

  return (
    <AutoComplite style={!autoComplite ? { display: "none" } : null}>
      {newNameData.length === 0 && (
        <AutoCompliteItem>일치하는 담당자가 없습니다.</AutoCompliteItem>
      )}
      {newNameData &&
        newNameData.map((item, index) => (
          <AutoCompliteItem
            key={index}
            onClick={(e) => {
              type === "add"
                ? setForm((form) => ({ ...form, name: e.target.innerText }))
                : setUpdateForm((form) => ({
                    ...form,
                    name: e.target.innerText,
                  }));
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
