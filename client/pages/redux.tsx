import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import ReduxToolkit from "@/modules/redux/page/redux toolkit/ReduxToolkit";
import RtkQuery from "@/modules/redux/page/rtk query/RTKQuery";

const Redux = () => {
    return (
        <MainLayout>
            <Header/>
            <ReduxToolkit/>
            <RtkQuery/>
        </MainLayout>
    );
};

export default Redux;