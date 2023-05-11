import React, {ComponentPropsWithoutRef} from 'react';
import styled from "styled-components";

interface StyledDescriptionProps extends ComponentPropsWithoutRef<"div">{
    children: React.ReactNode;
    CN?: string;
}

const SD = styled.div`
  color: ${props => props.theme.description};
`

const StyledDescription: React.FC<StyledDescriptionProps> = ({children, CN, ...props}) => {
    return (
        <SD className={CN} {...props}>
            {children}
        </SD>
    );
};

export default StyledDescription;