import { useState } from "react";

const Header = () => {
  const NAVLIST = [
    {
      url: "#",
      icon: "icon-list-ul",
    },
    // {
    //   url: "#",
    //   icon: "icon-user",
    // },
    // {
    //   url: "#",
    //   icon: "icon-heart",
    // },
    // {
    //   url: "#",
    //   icon: "icon-shopping-cart",
    // },
    {
      url: "",
      icon: "icon-adjust",
    },
  ];

  const [defaultMode, setDefaultMode] = useState("light-background");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.className === "icon-adjust") {
      // Change dark/light theme
      if (defaultMode === "light-background") {
        setDefaultMode("dark-background");
      } else {
        setDefaultMode("light-background");
      }
    }
  };

  return (
    <header className={`header ${defaultMode}`}>
      <h4 className="logo">Todolist</h4>
      <nav>
        <ul className="navigation">
          {NAVLIST.map((list) => {
            return (
              <li key={list.icon}>
                <a href={list.url} onClick={handleClick}>
                  <i className={list.icon}></i>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
