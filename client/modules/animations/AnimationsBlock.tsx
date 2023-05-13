import React from 'react';
import ExampleBlock from "@/modules/example/ExampleBlock";
import AnimationExample from "@/modules/animations/pageExamples/AnimationExample";
import {framerMotionDescription} from "@/modules/animations/utils/animationsDescription";
import CodeExample from "@/modules/example/CodeExample";
import {framerMotion} from "@/modules/animations/utils/codesandboxLinks";
import {framerMotionCodeExamples} from "@/modules/animations/utils/animationsCodeExample";
import styled from "styled-components";
import TopicBlock from "@/modules/example/TopicBlock";

const StyledMainBlock = styled.div`
        background: ${props => props.theme.subGradient.gradient};
    `

const StyledTitle = styled.h1`
      background: ${props => props.theme.mainGradient.gradient};
      -webkit-background-clip: text;
    `

const AnimationsBlock = () => {

    return (
        <TopicBlock title={'Framer motion'}>
            <ExampleBlock
                title={'Animation'}
                descriptionContent={[framerMotionDescription.animation, <CodeExample code={framerMotionCodeExamples.animation} language={'js'} codesandboxLink={framerMotion.animation}/>]}
            >
                <AnimationExample/>
            </ExampleBlock>
        </TopicBlock>
    );
};

export default AnimationsBlock;