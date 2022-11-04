import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

let title = 'Demo';
let theme = localStorage.getItem('theme') || 'light-background';
const Header = () => {
  const NAVLIST = [
    {
      url: '/todolist',
      icon: 'icon-list-ul',
      name: 'TodoList',
    },
    {
      url: '/table-use-state',
      icon: 'icon-table',
      name: 'Table use state',
    },
    {
      url: '/table-use-reducer',
      icon: 'icon-th-list',
      name: 'Table use reducer',
    },
  ];

  const location = useLocation();
  if (location && location.pathname) {
    if (location.pathname.slice(1) === 'todolist') {
      title = 'todolist';
    } else if (location.pathname.slice(1) === 'table') {
      title = 'table';
    }
  }

  const [defaultMode, setDefaultMode] = useState(theme);
  const [headerName, setHeaderName] = useState(title);

  const handleClickChangeTheme = e => {
    e.preventDefault();
    if (e.target.className === 'icon-adjust') {
      if (defaultMode === 'light-background') {
        setDefaultMode('dark-background');
        localStorage.setItem('theme', 'dark-background');
      } else {
        setDefaultMode('light-background');
        localStorage.setItem('theme', 'light-background');
      }
    }
  };

  return (
    <header className={`header ${defaultMode}`}>
      <h4 className="logo">
        <Link to="/" onClick={() => setHeaderName('Demo')}>
          {headerName}
        </Link>
      </h4>
      <nav>
        <ul className="navigation">
          {NAVLIST.map(list => {
            return (
              <li key={list.icon}>
                <Link to={list.url} onClick={() => setHeaderName(list.name)}>
                  <i className={list.icon}></i>
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="#/"
              style={{ cursor: 'pointer' }}
              onClick={handleClickChangeTheme}
            >
              <i className="icon-adjust"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
