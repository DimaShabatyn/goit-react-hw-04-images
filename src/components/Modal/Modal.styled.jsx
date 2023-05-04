import styled from 'styled-components';

export const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  background: #ecf0f3;
  box-shadow: inset -3px -3px 7px #ffffff, inset 3px 3px 5px #ceced1,
    2px 2px 2px #0f0f0f;
  color: #bbbbbb;
`;

export const ModalPicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;