import React from 'react';
import styles from './ListItem.module.css';
import Aux from '../../hoc/Aux';
import Button from '../../UI/Button/Button';

const ListItem = ( props ) => (
    <div className={styles.listItem}>
        <div className={styles.arrowsContainer}>
            <img className={styles.upArrow} onClick={() => props.orderOfItem('up')} src="/icons/upArrow.png">
            </img>
            <img className={styles.downArrow} onClick={() => props.orderOfItem('down')} src="/icons/downArrow.png">
            </img>
        </div>
        <div className={styles.listItemDetails}>
            <p className={styles.listItemName}>{props.name}</p>
            <p className={styles.listItemPrice}>${props.price}</p>
        </div>
        <div className={styles.buttonContainer}>
            <form action={props.link} target="_blank">
                <Button className={"viewButton"} name="View"></Button>
            </form>
            <Button className={"editButton"} name="Edit" click={props.toggleItemCreator}></Button>
            <Button className={"deleteButton"} name="Delete" click={props.deleteItem}></Button>
        </div>

    </div>
);

export default ListItem;
