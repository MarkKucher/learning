import React from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import ExampleBlock from "@/modules/example/ExampleBlock";
import CreateTheme from "@/modules/redux/page/examples/CreateTheme";
import {reduxCodeExamples, reduxDescription} from "@/modules/redux/utils/reduxDescription";
import CodeExample from "@/modules/example/CodeExample";

const ReduxToolkit = () => {
    return (
        <TopicBlock title={"Redux toolkit"}>
            <ExampleBlock
                descriptionContent={[reduxDescription.createTheme, <CodeExample code={reduxCodeExamples.createTheme} language={'js'}/>]}
                title={"Create theme"}
            >
                <CreateTheme/>
            </ExampleBlock>
        </TopicBlock>
    );
};

export default ReduxToolkit;