import styled from "styled-components";

export const LoadingSpinner = () => {
  return (
    <Spinner>
      <div className="spinner"></div>
    </Spinner>
  );
};

const Spinner = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  & .spinner {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 3px solid transparent;
    /* border-top-color: #df9e75;
    border-bottom-color: #a9653b; */
    border-color: #3b3b3b #747474 #747474 #3b3b3b;
    animation: spinner 0.2s infinite;
  }
`;
