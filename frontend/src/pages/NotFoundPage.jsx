import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Trang không tồn tại</h2>
                <p className={styles.description}>
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                </p>
                <div className={styles.actions}>
                    <Link to="/">
                        <Button variant="primary">
                            Về trang chủ
                        </Button>
                    </Link>
                    <button
                        className={styles.backButton}
                        onClick={() => window.history.back()}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
