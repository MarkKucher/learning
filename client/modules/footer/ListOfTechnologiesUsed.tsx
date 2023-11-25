import React from 'react';
import styles from "../../styles/ListOfTechnologiesUsed.module.scss";
import {categories} from "@/modules/footer/utils/footerCategories";
import Image from "next/image";
import styled from "styled-components";

const StyledContainer = styled.div`
  background: ${props => props.theme.mainGradient.gradient};
  color: ${props => props.theme.text};
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.subScrollbarBackground};
  }
`

const StyledLogo = styled.div`
  &:hover {
    outline-color: ${props => props.theme.text}
  }
  &:active {
    outline-color: ${props => props.theme.description}
  }
  cursor: pointer;
`

const ListOfTechnologiesUsed = () => {

    return (
        <div id={'TechnologiesUsed'} className={styles.technologies}>
            {categories.map(category => (
                <StyledContainer className={styles.logoContainer} key={category.title}>
                    <h3 className={styles.logoTitle}>{category.title}</h3>
                    <div className={styles.logos}>
                        {category.companies.map(({logo , redirectLink}, i) => (
                            <StyledLogo
                                onClick={() => {window.open(redirectLink)}}
                                key={category.title + i}
                                className={logo.width/logo.height > 1.5 ? styles.logoAlbum : logo.width/logo.height < 0.5 ? styles.logoBook : styles.logoCube}>
                                <Image src={logo} alt={'logo: ' + logo}/>
                            </StyledLogo>
                        ))}
                    </div>
                </StyledContainer>
            ))}
        </div>
    );
};

export default ListOfTechnologiesUsed;