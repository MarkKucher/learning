import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import MainPart from "@/modules/main/MainPart";
import Header from "@/modules/header/Header";
import Footer from "@/modules/footer/Footer";

const Index = () => {

    return (
        <MainLayout>
            <Header/>
            <MainPart/>
            <Footer/>
        </MainLayout>
    );
};

export default Index;