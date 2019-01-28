import React from 'react';

export default class Carousel extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="Carousel">{children}</div>;
  }
}
