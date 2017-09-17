import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import HomeCategory from './Home';
import Category from './Category';
import './MainPage.css';

const MainPage = () => (
  <div className="main">
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Home">
        <HomeCategory />
      </Tab>
      <Tab eventKey={2} title="React">
        <Category category="React"/>
      </Tab>
      <Tab eventKey={3} title="Udacity">
        <Category category="Udacity" />
      </Tab>
    </Tabs>
    <div className="open-search">
      <a href="">New</a>
    </div>
  </div>
);

export default MainPage;
