import React from 'react';
import styles from './Button.module.css';

const Button = ( props ) => (
    <button className={styles[props.className]} onClick={props.click}>
        {props.name}
    </button>
);

export default Button;
