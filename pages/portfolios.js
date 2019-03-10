import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Card, CardText, CardBody,
  CardTitle, Row, Col, CardHeader } from 'reactstrap';

import { getPortfolios } from '../actions/index';


class Portfolios extends Component {
  static async getInitialProps({req}) {
    let portfolios = [];

    try {
      portfolios = await getPortfolios(req);
    } catch(err) {
      console.error(err);
    }

    return {portfolios};
  }

  renderPortfolios(portfolios) {
    return portfolios.map((portfolio, index) => {
      return (
        <Col key={index} md="4">
          <React.Fragment>
            <span>
              <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
                <CardBody>
                  <p className="portfolio-card-city">{portfolio.location}</p>
                  <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                  <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                  <div className="readMore"> </div>
                </CardBody>
              </Card>
            </span>
          </React.Fragment>
        </Col>
      )
    })
  }

  render() {
    const { portfolios } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          <Row>
            {this.renderPortfolios(portfolios)}
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios
