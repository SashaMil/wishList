import React from 'react';
import styles from './Total.module.css'

const Total = ( props ) => (
    <div className={styles[props.className]}>
        ${props.total}
    </div>
);

export default Total;
