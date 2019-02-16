import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';

class Secret extends Component {

  // renderSecretPage() {
  //   const { isAuthenticated } = this.props.auth;

  //   if(isAuthenticated) {
  //     return (
  //       <BaseLayout {...this.props.auth}>
  //         <BasePage>
  //           <h1>i am Secret page</h1>
  //           <p> Secret content</p>
  //         </BasePage>
  //       </BaseLayout>
  //     )
  //   } else {
  //     return (
  //       <BaseLayout {...this.props.auth}>
  //         <BasePage>
  //           <h1>You are not authenticated. Please login to access this page.</h1>
  //         </BasePage>
  //       </BaseLayout>
  //     )
  //   }
  // }

  render() {
    debugger;
    console.log(this.props);

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>You are not authenticated. Please login to access this page.</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(Secret);
