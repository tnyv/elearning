import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.postDb = this.postDb.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  async postDb() {
    fetch('auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "Ashe@email.com",
        password: "ketchup",
        // email: "test@email.com",
        // password: "password",
        firstName: "Ashe",
        lastName: "Ketchup",
        organization: "Pokipoki",
        type: 1
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    const response = await fetch('user/getall');
    const data = await response.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.postDb}>Increment</button>
      </div>
    );
  }
}
