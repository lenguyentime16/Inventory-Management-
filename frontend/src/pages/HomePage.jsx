import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.welcomeSection}>
                <h1 className={styles.title}>Welcome to Inventory Management</h1>
                <p className={styles.subtitle}>
                    Manage your products and categories efficiently
                </p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📦</div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>-</h3>
                        <p className={styles.statLabel}>Total Products</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🏷️</div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>-</h3>
                        <p className={styles.statLabel}>Categories</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>$-</h3>
                        <p className={styles.statLabel}>Total Value</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚠️</div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>-</h3>
                        <p className={styles.statLabel}>Low Stock</p>
                    </div>
                </div>
            </div>

            <div className={styles.quickActions}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.actionGrid}>
                    <a href="/products" className={styles.actionCard}>
                        <div className={styles.actionIcon}>➕</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Add Product</h3>
                            <p className={styles.actionDescription}>Add a new product to inventory</p>
                        </div>
                    </a>

                    <a href="/categories" className={styles.actionCard}>
                        <div className={styles.actionIcon}>🏷️</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Manage Categories</h3>
                            <p className={styles.actionDescription}>Create and edit product categories</p>
                        </div>
                    </a>

                    <a href="/products" className={styles.actionCard}>
                        <div className={styles.actionIcon}>🔍</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Search Products</h3>
                            <p className={styles.actionDescription}>Find and filter products</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
