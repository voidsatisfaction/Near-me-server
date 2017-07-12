import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is home</h1>
        <p>Hello home!</p>
        <button onClick={() => {this.props.history.push('/page2')}}>
          button
        </button>
      </div>     
    );
  }
}