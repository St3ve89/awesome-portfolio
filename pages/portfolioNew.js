import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioForm from '../components/portfolios/PortfolioForm';

import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions/index';
import { Router } from '../routes';


const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
}
class PortfolioNew extends Component {

  constructor(props) {
    super();

    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this);
  }

  savePortfolio(portfolioData, {setSubmitting}) {
    setSubmitting(true);

    createPortfolio(portfolioData).then((portfolio) => {
      setSubmitting(false);
      this.setState({error: undefined})
      Router.pushRoute('/portfolios');
    }).catch ((err) => {
      const error = err.message || 'Server Error!';
      setSubmitting(false);
      this.setState({error})
    })
  }

  render() {
    const { error } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create new Portfolio">
          <Row>
            <Col md="6">
              <PortfolioForm 
                initialValues={INITIAL_VALUES}
                error={error}
                onSubmit={this.savePortfolio}/>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew);
