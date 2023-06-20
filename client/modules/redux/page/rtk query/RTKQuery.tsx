import React from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import Posts from "@/modules/redux/page/rtk query/examples/posts/Posts";

const RtkQuery = () => {
    return (
        <TopicBlock title={'RTK Query'} id={"RTK Query"}>
            <Posts/>
        </TopicBlock>
    );
};

export default RtkQuery;