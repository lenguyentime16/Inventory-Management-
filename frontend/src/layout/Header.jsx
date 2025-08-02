import React from 'react';
import styles from './Header.module.css';

const Header = ({ onLogout }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>Inventory Management</h1>
                </div>

                <div className={styles.userSection}>
                    <span className={styles.welcomeText}>Welcome back!</span>
                    <button
                        onClick={onLogout}
                        className={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
