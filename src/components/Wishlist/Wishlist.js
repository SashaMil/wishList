import React, {Component} from 'react';
import styles from './Wishlist.module.css';
import ListTitle from '../ListTitle/ListTitle';
import Total from '../Total/Total';
import ListItem from '../ListItem/ListItem';
import Select from '../Select/Select';
import ItemCreator from '../../containers/ItemCreator/ItemCreator';


class Wishlist extends Component {

    state = {
        sort: null,
        list: this.props.list,
    };

    componentDidMount() {
        if (this.state.sort) {
            this.sortList();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list) {
            this.setState({
                list: this.props.list,
            }, this.sortList)
        }
    }

    switchSorting = ( e ) => {
        this.setState({
            sort: e.target.value,
        }, this.sortList);
    }

    sortList = () => {
        let list = this.state.list;
        switch( this.state.sort ) {
            case 'default':
                return;
            break;
            case 'alphabetical':
                this.setState({
                    list: list.sort((a,b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0)),
                });
            break;
            case 'ascending':
                this.setState({
                    list: list.sort((a,b) => (a.price - b.price)),
                });
            break;
            case 'descending':
                this.setState({
                    list: list.sort((a, b) => (b.price - a.price)),
                });
            break;
        }
    }

    orderOfItem = ( index, direction ) => {
        Array.prototype.move = function(from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
            return this;
        }

        let list = this.state.list;
        if (direction === 'up' && index !== 0) {
            list = list.move(index, index - 1);
        }
        else if (direction === 'down' && index !== this.state.list.length - 1) {
            list = list.move(index, index + 1);
        }

        this.setState({
            list: list,
        });
    }

    render() {
        return (
            <div className={styles.list}>
                <Select
                    switchSorting={this.switchSorting}
                    selectedSort={this.state.sort}
                />
                <ListTitle
                   listTitle={this.props.listTitle}
                   toggleTabEditor={this.props.toggleTabEditor}
                />
                <Total
                    total={this.props.currentTabTotal}
                    className={"currentTabTotal"}
                />
                <div className={styles.list_body}>
                    {this.state.list.map((item, index) => (
                        <ListItem
                            key={item.item_id}
                            name={item.name}
                            toggleItemCreator={this.props.toggleItemCreator.bind(this, {id: item.item_id, name: item.name, price: item.price, link: item.link})}
                            price={item.price}
                            link={item.link}
                            deleteItem={this.props.deleteItem.bind(this, item.item_id)}
                            orderOfItem={this.orderOfItem.bind(this, index)}
                        />
                    ))}
                </div>
                {this.props.showItemCreator ? (
                    <ItemCreator
                        toggleItemCreator={this.props.toggleItemCreator}
                        itemToEdit={this.props.itemToEdit}
                        addItem={this.props.addItem}
                        editItem={this.props.editItem}
                        listId={this.props.listId}
                    />
                ) : null }
                <img className={styles.addItem} onClick={this.props.toggleItemCreator} src="/icons/add.png" />
            </div>
        );
    };

};

export default Wishlist;
