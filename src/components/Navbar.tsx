type NavbarProps = {
    menuItems: string[];
  };
  
  const Navbar: React.FC<NavbarProps> = ({ menuItems }) => (
    <nav className="p-4">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Navigation</h2>
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium shadow-sm cursor-pointer transition"
          >
            {item || `Menu Item ${index + 1}`}
          </li>
        ))}
      </ul>
    </nav>
  );
  
  export default Navbar;
  