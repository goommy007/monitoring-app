import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';


class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      description: '',
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post('http://localhost:8081', {
      title: this.state.title,
      description: this.state.description,
    });

    window.location.reload();
    this.props.history.push('/');
  }

  async clear() {
    this.setState({
      disabled: true,
    });

    await axios.delete('http://localhost:8081/');

    this.props.history.push('/');
    window.location.reload();
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Add an Update</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateTitle(e.target.value)}}
                    className="form-control"
                    placeholder="Enter an update such as INC number and short description"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="Give more context to your Incident."
                  />
                </div>
                <tr>
                  <td><button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button></td>
                <td><button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.clear()}}>
                  Delete All
                </button></td>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewQuestion);