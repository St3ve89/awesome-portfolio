import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import { Container, Row, Col } from 'reactstrap';
import { Link } from '../routes';

import { getBlogs } from '../actions';

import { shortenText } from '../helpers/utils';

import moment from 'moment';

class Blogs extends Component {
  static async getInitialProps({req}) {
    let blogs = []
    try {
      blogs = await getBlogs(req)
    }catch(err) {
      console.error(err)
    }

    return {blogs}
  }

  renderBlogs = (blogs) => (
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link route={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">
              {blog.title}
            </h2>
            <h3 className="post-subtitle">
              {shortenText(blog.subTitle)}
            </h3>
          </a>
        </Link>
        <p className="post-meta">Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format('LL')}</p>
      </div>
    ))
  )

  render() {
    const { blogs } = this.props

    return (
      <BaseLayout {...this.props.auth} headerType={'landing'} className="blog-listing-page" title="Istvan Acs - Newest Blogs to Read">
        <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {
                this.renderBlogs(blogs)
              }
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Blogs
