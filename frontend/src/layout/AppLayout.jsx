import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.layout}>
            <Header onLogout={handleLogout} />
            <div className={styles.main}>
                <Sidebar />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
