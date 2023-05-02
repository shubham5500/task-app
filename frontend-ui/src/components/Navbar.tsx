
const Navbar = () => {
  return (
    <div className="bg-text-text-light shadow z-10 dark:bg-background-darker dark:text-text-light">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-text-primary text-xl font-bold">
              My App
            </a>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-text-secondary hover:text-secondary-dark dark:text-text-primary dark:hover:text-primary">
              Login
            </a>
            <a href="#" className="ml-4 bg-button-primary hover:bg-button-primary-hover text-text-light dark:bg-button-primary dark:hover:bg-button-primary-hover dark:text-text-primary dark:hover:text-primary py-2 px-4 rounded">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
