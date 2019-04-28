import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class BlogDetail extends Component {
  
  static getInitialProps() {
    
  }

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-detail-page" title="BlogDetail page">
          
        </BasePage>
      </BaseLayout>
    )
  }
}

export default BlogDetail;
