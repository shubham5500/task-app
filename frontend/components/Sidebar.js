const Sidebar = () => {
  return (
    <aside className="flex-shrink-0 w-64 bg-primary">
      <div className="h-full py-4 flex flex-col justify-between">
        <nav>
          <a href="#" className="block py-2 px-4 text-text-light hover:bg-primary-dark">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 text-text-light hover:bg-primary-dark">
            Profile
          </a>
        </nav>
        <div className="text-center text-text-light">
          Powered by Tailwind CSS
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
