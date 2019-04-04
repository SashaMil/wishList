import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './ListTitle.module.css';

const ListTitle = ( props ) => (
    <Aux>
        <h1 className={styles.title} onClick={props.toggleTabEditor}>{props.listTitle}</h1>
    </Aux>
);

export default ListTitle;
