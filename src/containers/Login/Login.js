import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Login extends Component {

    state = {
      username: '',
      password: '',
      message: '',
    };

    loginUser = ( event ) => {
        event.preventDefault();

        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                message: 'Please Login',
            });
        }
        else {
            const body = {
                username: this.state.username,
                password: this.state.password,
            };
            axios.post('/users/login', body)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Success");
                        this.props.history.push('/home');
                    }
                    else {
                        this.setState({
                            message: 'Incorrect Username or Password'
                        });
                    }
                })
                .catch(() => {
                    this.setState({
                        message: 'Ooops! Something went wrong! Is the server running?',
                    });
                });
        }
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    };

    renderAlert() {
        if (this.state.message !== '') {
            return (
                <h2
                    className="alert"
                    role="alert"
                >
                {this.state.message}
                </h2>
            );
      }
        return (<span />);
    };

    render() {
        return (
            <div>
                { this.renderAlert() }
                <form onSubmit={this.loginUser}>
                     <h1>Login</h1>
                     <div>
                        <label htmlFor="username">
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                            />
                        </label>
                     </div>
                     <div>
                        <label htmlFor="password">
                            Password:
                            <input
                                 type="password"
                                 name="password"
                                 value={this.state.password}
                                 onChange={this.handleInputChangeFor('password')}
                            />
                        </label>
                     </div>
                     <div>
                         <input
                             type="submit"
                             name="submit"
                             value="Log In"
                             />
                         <Link to="/register">Register</Link>
                     </div>
                </form>
            </div>
        );
    };
};

export default Login;
