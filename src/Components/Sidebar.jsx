//new sidebar logic
import React, { useState } from 'react';
import { BiBookAlt, BiHome, BiMessage, BiSolidReport, BiStats, BiTask, BiChevronLeft, BiChevronRight, BiTrain, BiLogoDiscord, BiLogOut, BiCurrentLocation } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AdminSidebar from './AdminSidebar';
import UserSidebar from './UserSidebar';
import OfficerSidebar from './OfficerSidebar';


const Sidebar = () => {
    const location = useLocation();

    const noSidebarRoutes = ["/loginn", "/register"];

    const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);
    const role = localStorage.getItem('userRole'); // Or use context/redux for state management

    if (!shouldShowSidebar) {
        // If the route is in noSidebarRoutes, render nothing
        return null;
    }

    // Render different sidebars based on the role
    if (role === 'Main Admin') {
        return <AdminSidebar />;
    } else if (role === 'Officer') {
        return <OfficerSidebar />;
    } else if (role === 'Worker') {
        return <UserSidebar />;
    }
};

export default Sidebar;


