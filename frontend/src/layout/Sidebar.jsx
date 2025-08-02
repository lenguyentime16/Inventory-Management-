import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/',
            label: 'Dashboard',
            icon: '📊'
        },
        {
            path: '/products',
            label: 'Products',
            icon: '📦'
        },
        {
            path: '/categories',
            label: 'Categories',
            icon: '🏷️'
        }
    ];

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.navigation}>
                <ul className={styles.menuList}>
                    {menuItems.map((item) => (
                        <li key={item.path} className={styles.menuItem}>
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${location.pathname === item.path ? styles.active : ''
                                    }`}
                            >
                                <span className={styles.menuIcon}>{item.icon}</span>
                                <span className={styles.menuLabel}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
