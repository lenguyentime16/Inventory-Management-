import React from 'react';
import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${disabled ? styles.disabled : ''} 
    ${className}
  `.trim();

    return (
        <button
            type={type}
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
