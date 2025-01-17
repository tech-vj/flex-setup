interface NavBar2Props {
    type: "side" | "horizontal";
    menuItems: { name: string; enableSubMenu: boolean; subMenuItems: string[] }[];
  }
  
  const NavBar2: React.FC<NavBar2Props> = ({ type, menuItems }) => {
    if (type === "side") {
      return (
        <aside className="bg-blue-100 w-64 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <ul>
            {menuItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <span className="block font-medium">{menuItem.name}</span>
                {menuItem.enableSubMenu && (
                  <ul className="ml-4 mt-2 text-sm text-gray-700">
                    {menuItem.subMenuItems.map((subMenu, subIndex) => (
                      <li key={subIndex} className="mb-1">
                        {subMenu}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      );
    }
  
    return (
      <nav className="bg-blue-100 py-3 px-4 shadow-md mb-6">
        <ul className="flex space-x-4">
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <span className="font-medium">{menuItem.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default NavBar2;
  