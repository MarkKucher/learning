import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import ReduxToolkit from "@/modules/redux/page/ReduxToolkit";

const Redux = () => {
    return (
        <MainLayout>
            <Header/>
            <ReduxToolkit/>
        </MainLayout>
    );
};

export default Redux;