import React, { Component, PropTypes } from 'react';

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
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {process.env.NODE_ENV === 'production' ? <link rel="stylesheet" href="/dist/app.css" /> : null}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.renderInitialState()}
          {head.script.toComponent()}
          {process.env.NODE_ENV === 'production' ? <script src="/dist/app.js" /> : <script src="/app.js" />}
        </body>
      </html>
    );
  }
}