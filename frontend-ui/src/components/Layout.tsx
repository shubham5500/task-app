import React, {useState} from 'react';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Toast} from "@/components/Toast";

const Layout = ({classes = '', children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className={`h-screen flex flex-col dark:bg-background-dark dark:text-text-light ${classes}`}>
            <Toast/>
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar/>
                <main
                    className="flex-1 overflow-auto bg-background dark:bg-background-dark dark:text-text-light py-3 px-2">
                    {children}
                </main>
            </div>
        </div>
    );
};


export default Layout;
