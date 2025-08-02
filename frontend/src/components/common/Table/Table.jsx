import React from 'react';
import styles from './Table.module.css';

const Table = ({
    columns = [],
    data = [],
    onRowClick = null,
    emptyMessage = 'Không có dữ liệu',
    className = '',
    ...props
}) => {
    return (
        <div className={`${styles.tableContainer} ${className}`} {...props}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={column.key || index}
                                className={column.headerClassName}
                                style={column.headerStyle}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.noData}>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                                className={onRowClick ? styles.clickableRow : ''}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={column.key || colIndex}
                                        className={column.className}
                                        style={column.style}
                                    >
                                        {column.render
                                            ? column.render(row[column.dataIndex], row, rowIndex)
                                            : row[column.dataIndex]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
