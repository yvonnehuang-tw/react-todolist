import { Dropdown } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  let defaultTitle = t('common.title'); // Demo
  let theme = localStorage.getItem('theme') || 'light-background';
  const NAVLIST = [
    {
      url: '/todolist',
      icon: 'icon-list-ul',
      name: t('todolist.title'), // TodoList
    },
    {
      url: '/table-use-state',
      icon: 'icon-table',
      name: t('table.titleUseState'), // Table using useState
    },
    {
      url: '/table-use-reducer',
      icon: 'icon-th-list',
      name: t('table.titleUseReducer'), // Table using useReducer
    },
  ];

  const [defaultMode, setDefaultMode] = useState(theme);
  const [headerName, setHeaderName] = useState(defaultTitle);
  const [lang, setLang] = useState('zh-TW');

  useEffect(() => {
    if (lang !== null) i18n.changeLanguage(lang);

    if (location && location.pathname) {
      if (location.pathname.slice(1) === 'todolist') {
        setHeaderName(t('todolist.title'));
      } else if (location.pathname.slice(1) === 'table-use-state') {
        setHeaderName(t('table.titleUseState'));
      } else if (location.pathname.slice(1) === 'table-use-reducer') {
        setHeaderName(t('table.titleUseReducer'));
      } else {
        setHeaderName(t('common.title'));
      }
    }
  }, [lang]);

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

  const handleClickChangeLanguage = tmpLang => {
    setLang(tmpLang);
  };

  return (
    <header className={`header ${defaultMode}`}>
      <h4 className="logo">
        <Link to="/" onClick={() => setHeaderName(defaultTitle)}>
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
          {/* Set theme */}
          <li>
            <a
              href="#/"
              style={{ cursor: 'pointer' }}
              onClick={handleClickChangeTheme}
            >
              <i className="icon-adjust"></i>
            </a>
          </li>
          {/* Set language */}
          <Dropdown>
            <Dropdown.Toggle
              className={
                defaultMode === 'light-background'
                  ? 'header-dropdown-toggle-lang-light'
                  : 'header-dropdown-toggle-lang-dark'
              }
            >
              <i className="icon-globe"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={
                defaultMode === 'light-background'
                  ? 'header-dropdown-menu-lang-light'
                  : 'header-dropdown-menu-lang-dark'
              }
            >
              <Dropdown.Item
                className="header-dropdown-item-lang"
                onClick={() => handleClickChangeLanguage('en')}
              >
                EN
              </Dropdown.Item>
              <Dropdown.Item
                className="header-dropdown-item-lang"
                onClick={() => handleClickChangeLanguage('ja-JP')}
              >
                JP
              </Dropdown.Item>
              <Dropdown.Item
                className="header-dropdown-item-lang"
                onClick={() => handleClickChangeLanguage('zh-TW')}
              >
                TW
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
