import React from 'react';
import styled from "styled-components";

const Input = styled.input`
  color: ${props => props.theme.text};
  background: ${props => props.theme.description};
  text-align: center;
  border-radius: 5px;
  padding: 2px 5px;
  border: none;
  outline: none;
`

export default Input;