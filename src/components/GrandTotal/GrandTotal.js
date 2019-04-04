import React from 'react';
import styles from './GrandTotal.module.css'

const GrandTotal = ( props ) => (
    <div className={styles.grandTotal}>
        ${props.grandTotal}
    </div>
);

export default GrandTotal;
