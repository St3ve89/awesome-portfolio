import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioForm from '../components/portfolios/PortfolioForm';

class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create new Portfolio">
          <PortfolioForm onClick={(someVariables) => {
            console.log(someVariables)
          }}/>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew);
