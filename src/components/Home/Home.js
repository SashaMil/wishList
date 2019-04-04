import React, { Component } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import Tabs from '../../components/Tabs/Tabs';
import GrandTotal from '../../components/GrandTotal/GrandTotal';
import TabCreator from '../../containers/TabCreator/TabCreator';
import TabEditor from '../../components/TabEditor/TabEditor';

class Home extends Component {

    state = {
        wishlists: [],
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
                        let newWishlists = [];
                        for (let wishlist of response.data) {
                            axios.get(`wishlists/items/${wishlist.wishlist_id}`)
                                .then((response) => {
                                    wishlist.list = response.data;
                                    newWishlists.push(wishlist);
                                    this.setState({
                                        wishlists: newWishlists,
                                    })
                                }, this.calculateListTotal)
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

    calculateListTotal = ( tabId ) => {
        console.log(this.state)
        let total = 0;
        let wishlist = this.state.wishlists.find(function(wishlist) {
            return wishlist.wishlist_id === tabId;
        })
        wishlist.list.map(item => {
            total += item.price;
        });
        this.setState({
            currentTabTotal: total,
        })
    };

    selectTab = ( tabId ) => {
        this.calculateListTotal(tabId)
        this.setState({
            currentTabId: tabId,
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
                {this.state.currentTabId ? (
                    <GrandTotal
                        grandTotal={this.state.currentTabTotal}
                    />
                ) : null}
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
