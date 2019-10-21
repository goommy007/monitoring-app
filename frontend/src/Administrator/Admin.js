import React, { Component } from 'react';
import axios from 'axios';
import {Redirect}  from 'react-router-dom';
import Home from '../NewUpdate/NewUpdate';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      redirect : false
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  async login() {
    this.setState({
      disabled: true,
    });

    
    
    await axios.post('http://localhost:8081/login', {
      username: this.state.username,
      password: this.state.password,
    }).then(response => this.condition(response.data));
    this.props.history.push('/Home');
      }
      condition(r) {
        if (r === "correct") {
          this.setState({redirect : true});   
               
        } else {
          alert ('Login Failed');
        }
      }
  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    if(this.state.redirect){

        return (<Redirect to path = '/Home' Component = {Home}/>);
        
    }

    return (
      <div className="container" >
          <div className="row" >
          <div className="col-50">
            <div className="card border-primary">
              <div className="card-header">Login Here</div>
              <div className="card-body text-left">
              <div className="form-group">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }

        
          <label htmlFor="exampleInputEmail1">UserName:</label>
          <input type="text" className="form-control" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

          <label htmlFor="exampleInputEmail1">Password:</label>
          <input type="password"  className="form-control" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <br></br>
          <button className="button" onClick={() => {this.login()}}>
        Log-in
      </button>
        
        </form>


      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default LoginPage;