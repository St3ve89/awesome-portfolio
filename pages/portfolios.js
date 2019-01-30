import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';



class Portfolios extends Component {
  static async getInitialProps() {
    let posts = {}
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      posts = response.data;
    } catch(err) {
      console.error(err);
    }

    return {posts: posts.splice(0,10)};
  }

  renderPosts(posts) {
    return posts.map(post => {
      return (
        <li>{post.title}</li>
      )
    })
  }


  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>i am portfolio page</h1>
        <ul>
          {this.renderPosts(posts)}
        </ul>
      </BaseLayout>
    )
  }
}

export default Portfolios
