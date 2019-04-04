import React from 'react';
import styles from './Select.module.css';

const Select = ( props ) => (
    <form className={styles.sorting__form} action="">
        <select className={styles.sorting__select} onChange={props.switchSorting} >
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="descending">$$$ to $</option>
            <option value="ascending">$ to $$$</option>
        </select>
    </form>
);

export default Select;
