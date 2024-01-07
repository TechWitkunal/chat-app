import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFileEarmarkPersonFill  } from "react-icons/bs";
import styled from "styled-components";
export default function UpdateUser() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/updateinfo");
  }

  return (
    <StyledButton onClick={handleClick}>
      <BsFileEarmarkPersonFill  />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a smooth transition effect */

  &:hover {
    background-color: #7763c8; /* Change the background color on hover */
  }

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
