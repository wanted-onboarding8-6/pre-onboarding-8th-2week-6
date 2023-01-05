import styled from "styled-components";

export const ModalPage = ({ showModal, closeModal, children }) => {
  const onClickhandler = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <StyledModalBackground onClick={onClickhandler}>
          <StyledModalContainer onClick={(e) => e.stopPropagation()}>
            <StyledModal>{children}</StyledModal>
          </StyledModalContainer>
        </StyledModalBackground>
      ) : null}
    </>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  animation: modalFade 0.3s;
  @keyframes modalFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
`;

const StyledModal = styled.div`
  width: 35vw;
  height: 45vh;
  background-color: white;
  border-radius: 5px;
`;
