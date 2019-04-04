import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import styles from './TabCreator.module.css';

class TabCreator extends Component {

    state = {
        tabName: this.props.currentTitle,
    };

    handleChange = (e) => this.setState({
        tabName: e.target.value,
    });

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.currentTitle) {
            console.log('editing')
            this.props.editTab( this.state.tabName );
            this.props.toggleTabCreator();
        }
        else {
            this.props.addTab(this.state.tabName);
            this.state.tabName = '';
            this.props.toggleTabCreator();
        }
    }

    render() {
        return(
            <div className={styles.tabCreator}>
                <form className={styles.tabForm} onSubmit={this.onSubmit}>
                    <div className={styles.tabInputContainer}>
                        <input placeholder="Name of Tab" value={this.state.tabName} onChange={this.handleChange} className={styles.tabInput}></input>
                    </div>
                    <div className={styles.tabInputContainer}>
                        <input className={styles.tabSubmit} type="submit"/>
                        <input className={styles.tabCancel} type="button" value="Cancel" onClick={this.props.toggleTabCreator} />
                    </div>
                </form>
            </div>
        )
    }
};

export default TabCreator;
