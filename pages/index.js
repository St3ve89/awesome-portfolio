import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import Typed from 'react-typed';

import { Container, Row, Col } from 'reactstrap';

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isFlipping: false
    }

    this.roles = ['Developer', 'Tech Lover', 'Team player', 'React', 'StencilJS', 'TypeScript'];
  }

  componentDidMount() {
    this.animateCard();
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      });
    }, 8000);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isFlipping } = this.state;

    return (
      <BaseLayout className={`cover ${isFlipping ? 'cover-1' : ''}` } {...this.props.auth} headerType="index" title="Istvan Acs - Portfolio">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" alt="Background welcome image"/>
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img className="image" src="/static/images/section-1.jpg" alt="Guy welcoming programming picture"/>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get your projects done </h2>
                        <div className="hero-section-content-intro">
                          Professional and top quality service in web development.
                        </div>
                      </div>
                      <img className="image" src="/static/images/section-2.jpg" alt="Guy welcoming programming picture"/>
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    { isAuthenticated && <span> <b>{user.name}</b> </span> }
                    Welcome to the portfolio website of Istvan Acs.
                    Get informed, collaborate and discover projects I was working on through the years!
                  </h1>
                </div>
                <Typed
                  className="self-typed"
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h2>
                    Let's take a look on my work.
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
          <span className="service-link">
            Vector Graphics by <a  target="_blank" href="https://www.vecteezy.com/">Vecteezy</a>
          </span>
        </div>
      </BaseLayout>
    )
  }
}

export default Index;