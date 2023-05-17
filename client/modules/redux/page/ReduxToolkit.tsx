import React from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import ExampleBlock from "@/modules/example/ExampleBlock";
import CreateTheme from "@/modules/redux/page/examples/CreateTheme";

const ReduxToolkit = () => {
    return (
        <TopicBlock title={"Redux toolkit"}>
            <ExampleBlock title={"Create theme"}>
                <CreateTheme/>
            </ExampleBlock>
        </TopicBlock>
    );
};

export default ReduxToolkit;