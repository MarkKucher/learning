import React, {ComponentPropsWithoutRef} from 'react';
import styled from 'styled-components';
import Link from "next/link";

const SLink = styled('a')`
  color: ${props => props.theme.text};
  &:hover {
    text-decoration: underline 1px solid ${props => props.theme.text};
  };
`

interface StyledLinkProps extends ComponentPropsWithoutRef<"a"> {
    title: string;
    link: string;
    shouldOpenInNewTab: boolean
}

const StyledLink: React.FC<StyledLinkProps> = ({title, link,shouldOpenInNewTab, ...rest}) => {
    return (
        <SLink href={link} target={shouldOpenInNewTab ? '_blank' : undefined}>
            {title}
        </SLink>
    );
};

export default StyledLink;