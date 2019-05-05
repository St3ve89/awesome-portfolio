import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col, Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

import { getPortfolios, deletePortfolio } from '../actions/index';



class Portfolios2 extends Component {

  static async getInitialProps() {
    let portfolios = [];

    try {
      portfolios = await getPortfolios();
    } catch(err) {
      console.error(err);
    }

    return {portfolios};
  }

  navigateToEdit(portfolioId, e) {
    e.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`)
  }

  displayDeleteWarning(portfolioId, e) {
    e.stopPropagation();
    const isConfirm =  confirm('Are you sure you want to delete this portfolio?')

    if(isConfirm) {
      // delete portfolio here
      this.deletePortfolio(portfolioId)
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId).then(() => {
      //  Decide what to do yet
      Router.pushRoute('/portfolios')
    })
    .catch(err => console.error(err)) 
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (
        <Col key={index} md="4">
          <PortfolioCard portfolio={portfolio}>
          { isAuthenticated && isSiteOwner &&
            <React.Fragment>
              <Button onClick={(e) => this.navigateToEdit(portfolio._id, e)} color="warning">Edit</Button>{' '}
              <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, e)} color="danger">Delete</Button>
            </React.Fragment>
            }
          </PortfolioCard>
        </Col>
      )
    })
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return (
      <BaseLayout {...this.props.auth} title="Istvan Acs - Learn about my experience" cannonical="/portfolios">
        <BasePage className="portfolio-page" title="Portfolios">
        { isAuthenticated && isSiteOwner &&
          <Button onClick={() => Router.pushRoute('/portfolios/new')} color="success" className="create-port-btn">Create Portfolio</Button>
        }
          <Row>
            {this.renderPortfolios(portfolios)}
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolios2;