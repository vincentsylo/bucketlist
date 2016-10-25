import React, { Component, PropTypes } from 'react';
import assets from 'assets';

export default class Root extends Component {
  static propTypes = {
    content: PropTypes.string,
    initialState: PropTypes.object,
    head: PropTypes.object,
  };

  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }
    return null;
  }

  render() {
    const {
      head,
      content,
    } = this.props;

    return (
      <html lang="en">
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" />
          <link rel="stylesheet" href={assets.app.css} />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.renderInitialState()}
          {head.script.toComponent()}
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDottDEdpNSNOHxXVMJda8kU4Jk0zSPvvg&libraries=places" async defer />
          <script src={assets.app.js} />
        </body>
      </html>
    );
  }
}
