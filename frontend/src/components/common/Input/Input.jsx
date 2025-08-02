import React from 'react';
import styles from './Input.module.css';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputClass = `
    ${styles.input} 
    ${error ? styles.error : ''} 
    ${disabled ? styles.disabled : ''} 
    ${className}
  `.trim();

    return (
        <div className={styles.inputGroup}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClass}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
