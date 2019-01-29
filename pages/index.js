import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';


class Index extends React.Component {

  static getInitialProps() {
    console.log(' I am get inital props')

    return {initialData: [1,2,3,4]};
  }

  constructor() {
    super();

    this.state = {
      title: 'I am index page'
    }
   
    // this.changeTitle = this.changeTitle.bind(this);
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

  changeTitle = () => {
    // debugger;
    // console.log('update title')
    this.setState({title: 'I am updated index page!!!!!!'});
  }

  render() {
    console.log('render');
    debugger;
    const {title} = this.state;
    const initialData = this.props.initialData;
    return (
      <BaseLayout>
        <h1>{title}</h1>
        <button onClick={this.changeTitle}>Change title</button>
      </BaseLayout>
    )
  }
}

export default Index;