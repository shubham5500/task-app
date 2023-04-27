
const Navbar = () => {
  return (
    <header className="bg-background-dark shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-text-primary text-xl font-bold">
              My App
            </a>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-text-secondary hover:text-secondary-dark">
              Login
            </a>
            <a href="#" className="ml-4 bg-button-primary hover:bg-button-primary-hover text-text-light py-2 px-4 rounded">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
