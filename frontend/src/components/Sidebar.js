import { HiViewBoards, HiOutlineArchive } from "react-icons/hi";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`relative flex-shrink-0 w-64 shadow ${isSidebarOpen ? '' : 'hidden'} sm:block`}>
      <div className="h-full py-4 flex flex-col justify-between">
        <nav>
          <SideBarItem text={'Board'} icon={<HiViewBoards size={20} className={"mr-3"}/>}/>
          <SideBarItem text={'Tasks'} icon={<HiOutlineArchive size={20} className={"mr-3"}/>}/>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 right-0 mt-4 mr-4 sm:hidden"
      >
        {isSidebarOpen ? (
          <div className="h-6 w-6 text-text-light" >Close</div>
        ) : (
          <div className="h-6 w-6 text-text-light" >Open</div>
        )}
      </button>
    </aside>
  );
};

export default Sidebar;


const SideBarItem = ({text, icon}) =>{
  return (<>
    <a href="#" className="flex items-center py-3 px-4 dark:text-text-primary hover:bg-text-light dark:hover:bg-primary font-bold">
      {icon}
      {text}
    </a>
  </>)
}
