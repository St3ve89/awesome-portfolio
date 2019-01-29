import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';


class Index extends React.Component {

  static async getInitialProps() {
    let userData = {}
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      userData = response.data;
    } catch(err) {
      console.error(err);
    }

    return {initialData: [1,2,3,4], userData};
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
    const {userData, initialData} = this.props;
    return (
      <BaseLayout>
        <h1>{title}</h1>
        <h2>{userData.title}</h2>
        <h2>{initialData}</h2>
        <button onClick={this.changeTitle}>Change title</button>
      </BaseLayout>
    )
  }
}

export default Index;