import React, { Component } from 'react';
import './App.css';

import Rates from '../Rates/Rates';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  ws = new WebSocket(process.env.REACT_APP_WS_SERVER_URL);

  async componentDidMount() {
    // fetch rate info for first load
    fetch('http://localhost:8050/rates', {
      method: 'get'
    })
      .then(response => response.json())
      .then(json => {
        this.setState(json);
      })
      .catch(e => {
        console.error(e);
      });
   
      this.ws.onmessage = (e) => {
        if (e.data === 'status=OK') {
          // if ws server responds with ok, send auth
          this.ws.send(`auth=${process.env.REACT_APP_WS_SERVER_AUTH}`);
        }else if (e.data === 'auth=Fail') {
          // close ws connection if auth failed
          this.ws.close();
        } else {
          // assume that auth=OK and update rates
          this.setState(JSON.parse(e.data));
        }
      }

    }

  render() {
    return (
      <div className="container">
        <h1>Exchange rates</h1>
        <Rates
          currencies={this.state}
        />
      </div>
    )
  }
}

export default App;