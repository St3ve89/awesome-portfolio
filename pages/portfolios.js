import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Card, CardText, CardBody,
  CardTitle, Row, Col, CardHeader, Button } from 'reactstrap';

import { Router } from '../routes';

import { getPortfolios } from '../actions/index';



class Portfolios extends Component {

  static async getInitialProps() {
    let portfolios = [];

    try {
      portfolios = await getPortfolios();
    } catch(err) {
      console.error(err);
    }

    return {portfolios};
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

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
                  <div className="readMore">
                  { isAuthenticated && isSiteOwner &&
                    <React.Fragment>
                      <Button onClick={() => Router.pushRoute(`/portfolios/${portfolio._id}/edit`)} color="warning">Edit</Button>{' '}
                      <Button color="danger">Delete</Button>
                    </React.Fragment>
                  }
                  </div>
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
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
        { isAuthenticated && isSiteOwner &&
          <Button onClick={() => Router.pushRoute('/portfolioNew')} color="success" className="create-port-btn">Create Portfolio</Button>
        }
          <Row>
            {this.renderPortfolios(portfolios)}
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios
