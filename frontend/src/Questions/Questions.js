import React, {Component} from 'react';
import axios from 'axios';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      questions,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.questions === null && <h4>No Issues on-going currently</h4>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-50 col-md-60 col-lg-50">
                <div className="card text-white bg-danger mb-3">
                    <div className="card-header">Update: {question.id} </div>
                    <div className="card-header">LastUpdated : {question.timestamp} </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Questions;