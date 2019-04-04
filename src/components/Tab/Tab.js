import React from 'react';
import styles from './Tab.module.css';
import Aux from '../../hoc/Aux';
import Wishlist from '../Wishlist/Wishlist';

const Tab = ( props ) => (
    <Aux>
        <div className={styles.tab} onClick={props.selectTab}>
            {props.title}
        </div>
        {props.currentTabId === props.wishlist.wishlist_id ? (
            <Wishlist
                list={props.wishlist.list}
                listTitle={props.title}
                listId={props.wishlist.wishlist_id}
                listTotal={props.wishlist.total}
                toggleItemCreator={props.toggleItemCreator}
                toggleTabEditor={props.toggleTabEditor.bind(this, props.title)}
                showItemCreator={props.showItemCreator}
                itemToEdit={props.itemToEdit}
                addItem={props.addItem}
                deleteItem={props.deleteItem}
                editItem={props.editItem}
            />
        ) : null}
    </Aux>
);

export default Tab;
