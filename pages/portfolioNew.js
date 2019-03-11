import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioForm from '../components/portfolios/PortfolioForm';

import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions/index';

class PortfolioNew extends Component {

  constructor(props) {
    super();

    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this);
  }

  savePortfolio(portfolioData) {
    createPortfolio(portfolioData).then((portfolio) => {
      this.setState({error: undefined})
    }).catch ((err) => {
      this.setState({error: err.message})
    })
  }

  render() {
    const { error } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create new Portfolio">
          <Row>
            <Col md="6">
              <PortfolioForm error={error} onSubmit={this.savePortfolio}/>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew);
