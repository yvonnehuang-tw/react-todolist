import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const NAVLIST = [
    {
      url: "todolist",
      icon: "icon-list-ul",
    },
    {
      url: "table",
      icon: "icon-table",
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
                <Link to={list.url}>
                  <i className={list.icon}></i>
                </Link>
              </li>
            );
          })}
          <li>
            <a href="#/" style={{ cursor: "pointer" }} onClick={handleClick}>
              <i className="icon-adjust"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
