import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioForm from '../components/portfolios/PortfolioForm';

import { Row, Col } from 'reactstrap';

class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create new Portfolio">
          <Row>
            <Col md="6">
              <PortfolioForm />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew);