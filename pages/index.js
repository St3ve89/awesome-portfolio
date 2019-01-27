import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';


class Index extends React.Component {

  constructor() {
    super();

    this.state = {
      title: 'I am index page'
    }
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  changeTitle() {
    debugger;
    this.setState({title: 'I am updated index page!!!!!!'});
  }

  render() {
    console.log('render');
    debugger;
    const {title} = this.state;
    return (
      <BaseLayout>
        <h1>{title}</h1>
        <button onClick={() => this.changeTitle()}>Change title</button>
      </BaseLayout>
    )
  }
}

export default Index;