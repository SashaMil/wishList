import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './Menu.module.css';

const Menu = ( props ) => (
    <div className={styles.menu}>
        <p className={styles.username}>{props.username}</p>
        <Button
            name={"Logout"}
            className={"logout"}
            click={props.logout}
        />
    </div>
);

export default Menu;
