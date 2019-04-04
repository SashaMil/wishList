import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import './ItemCreator.css';

class ItemCreator extends Component {

    state = {
        name: this.props.itemToEdit.name || '',
        price: this.props.itemToEdit.price || 0,
        link: this.props.itemToEdit.link || '',
        itemId: this.props.itemToEdit.id,
        listId: this.props.listId,
    };

    componentDidMount() {
    }

    handleChange = (key, event) => {
        this.setState({
            [key]: event.target.value,
        })
     }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('item to edit', this.props.itemToEdit)
        if (this.props.itemToEdit.id) {
            this.props.editItem(this.state);
        }
        else {
            this.props.addItem(this.state);
        }
    };

    render() {
        return (
            <div className="itemCreator">
                <form className="itemForm" onSubmit={this.onSubmit}>
                    <div className="itemInputContainer">
                        <input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} placeholder="Name of Item" className="itemInput"></input>
                    </div>
                    <div className="itemInputContainer">
                        <input type="number" value={this.state.price} onChange={this.handleChange.bind(this, 'price')} placeholder="Price of Item" className="itemInput"></input>
                    </div>
                    <div type="text" className="itemInputContainer">
                        <input value={this.state.link} onChange={this.handleChange.bind(this, 'link')} placeholder="Link to Item" className="itemInput"></input>
                    </div>
                    <div className="itemInputContainer">
                        <input className="itemSubmit" type="submit"/>
                        <input className="itemCancel" type="button" value="Cancel" onClick={this.props.toggleItemCreator} />
                    </div>
                </form>
            </div>
        );
    };
}


export default ItemCreator
