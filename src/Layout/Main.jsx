import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedPage/Footer/Footer';
import NavBar from '../Pages/SharedPage/Navbar/NavBar';
import Banner from '../Pages/Home/Banner/Banner';

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <h1>Main</h1>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;