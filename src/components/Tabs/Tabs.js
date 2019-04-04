import React from 'react';
import styles from './Tabs.module.css';
import Tab from '../Tab/Tab';

const Tabs = ( props ) => (
    <div className={styles.tabs}>
        {props.wishlists.map(wishlist => (
            <Tab
                key={wishlist.wishlist_id}
                title={wishlist.title}
                wishlist={wishlist}
                selectTab={props.selectTab.bind(this, wishlist.wishlist_id)}
                currentTabId={props.currentTabId}
                toggleItemCreator={props.toggleItemCreator}
                showItemCreator={props.showItemCreator}
                itemToEdit={props.itemToEdit}
                addItem={props.addItem}
                editItem={props.editItem}
                deleteItem={props.deleteItem}
                toggleTabEditor={props.toggleTabEditor}
            />
        ))}
    </div>
);

export default Tabs;
