import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';


class Callback extends Component {
  render() {
    return (
      <BaseLayout>
        <BasePage>
         <h1>You are logging in....</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Callback
