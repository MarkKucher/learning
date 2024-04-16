import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import MainPart from "@/modules/main/MainPart";
import Footer from "@/modules/footer/Footer";

const Index = () => {

    return (
        <MainLayout>
            <MainPart/>
            <Footer/>
        </MainLayout>
    );
};

export default Index;