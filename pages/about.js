import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';
class About extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth} title='Istvan Acs - Learn more about me'>
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">Feel free to read short description about me.</p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>My name is Istvan Acs and I make the front-end world better every day.</p>
                <p>I’m a creative self-taught professional and I build in the Front-end “amazing boats”, so users can surf a better web. I design fluid and responsive websites for the future. Let’s have a chat!</p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About;
