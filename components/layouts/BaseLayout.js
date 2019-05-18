import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = props => {

  const { className, children, isAuthenticated, isSiteOwner, cannonical} = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'Istvan Acs';

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="My name is Istvan Acs and I make the front-end world better every day." />
        <meta name="keywords" content="istvan portfolio, istvan developer, istvan front-end" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Istvan Acs - programmer, developer" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="My name is Istvan Acs and I make the front-end world better every day."/>
        <link rel="apple-touch-icon" sizes="180x180" href="../static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon-16x16.png" />
        { cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/> }
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <div className="layout-container">
        <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} isSiteOwner={isSiteOwner}/>
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
        <footer>
          <div className="footer">
            <div className="footer-icons">
              <a href="https://github.com/St3ve89" target="_blank"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/istvan-acs-b24479160/" target="_blank"><i className="fab fa-linkedin"></i></a>
            </div>
            <div className="footer-text">
              Made with ❤️ by Istvan Acs
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;