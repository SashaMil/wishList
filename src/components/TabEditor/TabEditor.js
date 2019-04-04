import React, {Component} from 'react';
import styles from './TabEditor.module.css';
import Button from '../../UI/Button/Button';

const TabEditor = ( props ) => (
    <div className={styles.tabEditor}>
        <h1>{props.wishlistTitle}</h1>
        <Button
            className={"editTab"}
            click={props.switchEditorToCreator}
            name={"Rename"}
        />
        <Button
            className={"deleteTab"}
            click={props.deleteTab}
            name={"Delete"}
        />
    </div>
);

export default TabEditor;
