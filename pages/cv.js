import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Row, Col } from 'reactstrap';

class Cv extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="Preview of my CV" className="cv-page">
          <Row>
            <Col md={{size: 8, offset: 2}}>
              <div className="cv-title">
                <a download="Istvan_Acs-resume.pdf" className="btn btn-success" href="/static/Istvan_Acs-resume.pdf">
                  Download
                </a>
              </div>
              <iframe style={{width: '100%', height: '800px'}} src="/static/Istvan_Acs-resume.pdf"></iframe>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Cv
