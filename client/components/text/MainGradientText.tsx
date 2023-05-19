import styled from "styled-components";

const MainGradientText = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default MainGradientText;