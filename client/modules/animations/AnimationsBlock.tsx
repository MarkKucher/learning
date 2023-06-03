import React from 'react';
import ExampleBlock from "@/modules/example/ExampleBlock";
import AnimationExample from "@/modules/animations/pageExamples/AnimationExample";
import {framerMotionDescription} from "@/modules/animations/utils/animationsDescription";
import CodeExample from "@/modules/example/CodeExample";
import {framerMotion} from "@/modules/animations/utils/codesandboxLinks";
import {framerMotionCodeExamples} from "@/modules/animations/utils/animationsCodeExample";
import TopicBlock from "@/modules/example/TopicBlock";
import VariantsExample from "@/modules/animations/pageExamples/VariantsExample";
import PathExample from "@/modules/animations/pageExamples/PathExample";
import GestureExample from "@/modules/animations/pageExamples/GestureExample";
import DragExample from "@/modules/animations/pageExamples/DragExample";
import ScrollExample from "@/modules/animations/pageExamples/ScrollExample";

const AnimationsBlock = () => {

    return (
        <TopicBlock title={'Framer motion'}>
            <ExampleBlock
                title={'Animation'}
                descriptionContent={[framerMotionDescription.animation, <CodeExample code={framerMotionCodeExamples.animation} language={'js'} codesandboxLink={framerMotion.animation}/>]}
            >
                <AnimationExample/>
            </ExampleBlock>
            <ExampleBlock
                title={'Variants'}
                descriptionContent={[framerMotionDescription.variants, <CodeExample code={framerMotionCodeExamples.variants} language={'js'} codesandboxLink={framerMotion.variants}/>]}
            >
                <VariantsExample/>
            </ExampleBlock>
            <ExampleBlock
                title={'Gestures'}
                descriptionContent={[framerMotionDescription.gestures, <CodeExample code={framerMotionCodeExamples.gestures} language={'tsx'}/>]}
            >
                <GestureExample/>
            </ExampleBlock>
            <ExampleBlock
                title={'Drag'}
                descriptionContent={[framerMotionDescription.drag, <CodeExample code={framerMotionCodeExamples.drag} language={'tsx'}/>]}
            >
                <DragExample/>
            </ExampleBlock>
            <ExampleBlock
                title={'Scroll'}
                descriptionContent={[framerMotionDescription.scroll, <CodeExample code={framerMotionCodeExamples.scroll} language={'tsx'}/>]}
            >
                <ScrollExample/>
            </ExampleBlock>
            <ExampleBlock
                title={'Path'}
                descriptionContent={[framerMotionDescription.path]}
            >
                <PathExample/>
            </ExampleBlock>
        </TopicBlock>
    );
};

export default AnimationsBlock;