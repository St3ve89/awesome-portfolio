import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = props => {

  const { className, children, isAuthenticated, isSiteOwner, title, cannonical} = props;
  const headerType = props.headerType || 'default';

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="My name is Istvan Acs and I make the front-end world better every day." />
        <meta name="keywords" content="istvan portfolio, istvan developer, istvan front-end" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Istvan Acs - programmer, developer" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:url" content="http://localhost:3000"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="My name is Istvan Acs and I make the front-end world better every day."/>
        <link rel="apple-touch-icon" sizes="180x180" href="../static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon-16x16.png" />
        { cannonical && <link rel="cannonical" href={`http://localhost:3000${cannonical}`}/> }
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
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;