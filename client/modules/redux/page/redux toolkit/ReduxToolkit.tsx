import React from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import ExampleBlock from "@/modules/example/ExampleBlock";
import CreateTheme from "@/modules/redux/page/redux toolkit/examples/CreateTheme";
import {reduxCodeExamples, reduxDescription} from "@/modules/redux/utils/reduxDescription";
import CodeExample from "@/modules/example/CodeExample";
import Todo from "@/modules/redux/page/redux toolkit/examples/todo/Todo";
import Thunk from "@/modules/redux/page/redux toolkit/examples/Thunk";

const ReduxToolkit = () => {
    return (
        <TopicBlock title={"Redux toolkit"}>
            <ExampleBlock
                descriptionContent={[reduxDescription.createTheme, <CodeExample code={reduxCodeExamples.createTheme} language={'js'}/>]}
                title={"Create theme"}
            >
                <CreateTheme/>
            </ExampleBlock>
            <ExampleBlock
                title={"Todo"}
                descriptionContent={[reduxDescription.todo]}
            >
                <Todo/>
            </ExampleBlock>
            <ExampleBlock
                title={"Thunk"}
                descriptionContent={[reduxDescription.thunk]}
            >
                <Thunk/>
            </ExampleBlock>
        </TopicBlock>
    );
};

export default ReduxToolkit;