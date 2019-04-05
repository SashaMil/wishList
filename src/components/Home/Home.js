import React, { Component } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import Tabs from '../../components/Tabs/Tabs';
import Total from '../../components/Total/Total';
import TabCreator from '../../containers/TabCreator/TabCreator';
import TabEditor from '../../components/TabEditor/TabEditor';

class Home extends Component {

    state = {
        wishlists: [],
        grandTotal: 0,
        currentTabTotal: 0,
        showTabCreator: false,
        showItemCreator: false,
        currentTabId: null,
        currentTabTitle: '',
        showRegister: true,
        userId: null,
        itemToEdit: '',
        showTabEditor: false,
    };


    componentDidMount() {
        this.getWishlists();
    };

    getWishlists( userId ) {
        axios.get('users')
            .then((response) => {
                axios.get(`wishlists/${response.data.id}`)
                    .then((response) => {
                        if (response.data.length === 0) {
                            this.setState({
                                showTabCreator: true,
                            })
                        }
                        else {
                            let newWishlists = [];
                            let wishlists = response.data;
                            for (let x = 0; x < wishlists.length; x++) {
                                axios.get(`wishlists/items/${wishlists[x].wishlist_id}`)
                                    .then((response) => {
                                        wishlists[x].list = response.data;
                                        newWishlists.push(wishlists[x]);
                                        if (newWishlists.length === wishlists.length) {
                                            if (!this.state.currentTabId) {
                                                this.setState({
                                                    currentTabId: newWishlists[0].wishlist_id,
                                                });
                                            }
                                            let totals = this.calculateTotals( this.state.currentTabId, newWishlists );
                                            this.setState({
                                                wishlists: newWishlists,
                                                currentTabTotal: totals.currentTabTotal,
                                                grandTotal: totals.grandTotal,
                                            });
                                        }
                                    })
                            }
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        console.log('Could not retrieve wishlists')
                    })
            })
            .catch((error) => {
                this.props.history.push('/login');
            });
    }

    toggleRegister () {
        this.setState(prevState => ({
            showRegister: !prevState.showRegister,
        }));
    };

    calculateTotals = ( tabId, wishlists ) => {
        let total = 0;
        let currentWishlist = wishlists.find(function(wishlist) {
            return wishlist.wishlist_id === tabId;
        });
        currentWishlist.list.map(item => {
            total += item.price;
        });
        let grandTotal = 0;
        wishlists.map(wishlist => {
            for (let item of wishlist.list) {
                grandTotal += item.price;
            }
        })
        return {currentTabTotal: total, grandTotal: grandTotal};
    };

    selectTab = ( tabId ) => {
        this.setState({
            currentTabId: tabId,
            currentTabTotal: this.calculateTotals(tabId, this.state.wishlists).currentTabTotal,
        });
    };

    addTab = ( wishlistTitle ) => {
        console.log(wishlistTitle)
        axios.get('users')
            .then((response) => {
                const userId = response.data.id;
                axios.post(`wishlists/${userId}`, { wishlistTitle })
                    .then((response) => {
                        this.getWishlists();
                        this.setState({
                            currentTabId: null,
                            currentTabTitle: null,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log('Could not create wishlist');
                    })
            })
            .catch((error) => {
                this.props.history.push('/login');
            });
    };

    editTab = ( newTitle ) => {
        axios.put(`wishlists/${this.state.currentTabId}`, { newTitle })
            .then((response) => {
                this.getWishlists();
            })
            .catch((error) => {
                console.log(error);
                console.log('Could not edit wishlist');
            })
    };

    deleteTab = () => {
        axios.delete(`wishlists/${this.state.currentTabId}`)
            .then((response) => {
                this.getWishlists();
                this.toggleTabEditor();
                this.setState({
                    currentTabId: null,
                    currentTabTitle: null,
                })
            })
            .catch((error) => {
                console.log(error);
                console.log('Could not deleteWishlist');
            })
    }

    addItem = ( item ) => {
        axios.post(`wishlists/items/${item.listId}`, { item })
            .then((response) => {
                this.toggleItemCreator()
                this.getWishlists();
            })
            .catch((error) => {
                console.log(error);
                console.log('Could not add Item to wishlist');
            })
    }

    editItem = ( item ) => {
        axios.put(`wishlists/items/${item.itemId}`, { item })
            .then((response) => {
                this.getWishlists();
                this.toggleItemCreator();
            })
            .catch((error) => {
                console.log(error);
                console.log('Could not edit Item');
            })
    }

    deleteItem = ( itemId ) => {
        axios.delete(`wishlists/items/${itemId}`)
            .then((response) => {
                this.getWishlists();
            })
            .catch((error) => {
                console.log(error);
                console.log('Could not delete item');
            })
    }

    switchEditorToCreator = () => {
        this.toggleTabEditor();
        this.toggleTabCreator();
    }

    toggleItemCreator( item ) {
        if (item) {
            this.setState(prevState => ({
                itemToEdit: item,
                showItemCreator: !prevState.showItemCreator,
            }))
        }
        else {
            this.setState(prevState => ({
                showItemCreator: !prevState.showItemCreator
            }))
        }
    }

    toggleTabCreator() {
        this.setState(prevState => ({
            showTabCreator: !prevState.showTabCreator
        }));
    };

    toggleTabEditor( title ) {
        if (title) {
            this.setState(prevState => ({
                currentTabTitle: title,
                showTabEditor: !prevState.showTabEditor,
            }));
        }
        else {
            this.setState(prevState => ({
                showTabEditor: !prevState.showTabEditor,
            }));
        }
    };

    render() {
        return (
            <div className={styles.header}>
                <Tabs
                    wishlists={this.state.wishlists}
                    selectTab={this.selectTab.bind(this)}
                    currentTabId={this.state.currentTabId}
                    showItemCreator={this.state.showItemCreator}
                    toggleTabEditor={this.toggleTabEditor.bind(this)}
                    toggleItemCreator={this.toggleItemCreator.bind(this)}
                    itemToEdit={this.state.itemToEdit}
                    editItem={this.editItem}
                    deleteItem={this.deleteItem}
                    addItem={this.addItem}
                    currentTabTotal={this.state.currentTabTotal}
                />
                {this.state.showTabCreator ? (
                    <TabCreator
                        addTab={this.addTab}
                        editTab={this.editTab}
                        currentTitle={this.state.currentTabTitle}
                        toggleTabCreator={this.toggleTabCreator.bind(this)}
                    />
                ) : null}
                {this.state.showTabEditor ? (
                    <TabEditor
                        deleteTab={this.deleteTab}
                        switchEditorToCreator={this.switchEditorToCreator}
                        wishlistId={this.state.currentTab}
                        wishlistTitle={this.state.currentTabTitle}
                        toggleTabEditor={this.toggleTabEditor.bind(this)}
                        toggleTabCreator={this.toggleTabCreator.bind(this)}
                    />
                ) : null}
                <img className={styles.addTab} onClick={this.toggleTabCreator.bind(this)} src="/icons/add.png"></img>
            </div>
        );
    };
};

export default Home;
