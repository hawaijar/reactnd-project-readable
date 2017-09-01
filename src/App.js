import React, { Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import HomeCategory from './components/Home';
import ReactCategory from './components/React';
import UdacityCategory from './components/Udacity';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Home">
            <HomeCategory />
          </Tab>
          <Tab eventKey={2} title="React">
            <ReactCategory />
          </Tab>
          <Tab eventKey={3} title="Udacity" disabled>
            <UdacityCategory />
          </Tab>
        </Tabs>
        <div className="open-search">
          <a href="">New</a>
        </div>
      </div>
    );
  }
}

export default App;
