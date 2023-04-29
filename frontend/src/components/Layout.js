import React, {useState} from 'react';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ classes = '', children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={`h-screen flex flex-col dark:bg-background-dark dark:text-text-light ${classes}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-background dark:bg-background-dark dark:text-text-light py-3 px-2">
          {children}
        </main>
      </div>
    </div>
  );
};


export default Layout;
