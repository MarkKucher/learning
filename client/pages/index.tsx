import React, {useEffect} from 'react';
import MainLayout from "@/components/layout/MainLayout";
import MainPart from "@/modules/main/MainPart";
import Footer from "@/modules/footer/Footer";
import axios from "axios";
import {serverUrl} from "@/utils/const";

const Index = () => {

    useEffect(() => {
        const runServer = async () => {
            const response = await axios.get(`${serverUrl}/test`)
            console.log(response.data)
        }

        runServer()
    }, [])

    return (
        <MainLayout>
            <MainPart/>
            <Footer/>
        </MainLayout>
    );
};

export default Index;