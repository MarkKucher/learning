import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import MemeGenerator from "@/modules/chatGPT/page/MemeGenerator";

const Index = () => {
    return (
        <MainLayout>
            <Header/>
            <MemeGenerator/>
        </MainLayout>
    );
};

export default Index;