import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import MemeGenerator from "@/modules/chatGPT/page/MemeGenerator";

const Index = () => {
    return (
        <MainLayout>
            <MemeGenerator/>
        </MainLayout>
    );
};

export default Index;