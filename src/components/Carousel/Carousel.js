import classNames from 'classnames';
import React, { Children } from 'react';

import './Carousel.css';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeChild: 0 };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.nextChild(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  displayChildIndex(index) {
    this.setState({ activeChild: index });
  }

  nextChild() {
    const { children } = this.props;
    const { activeChild } = this.state;
    this.setState({
      activeChild: (activeChild + 1) % Children.count(children),
    });
  }

  onIndicatorClick(index) {
    clearInterval(this.timer);
    this.timer = null;
    this.displayChildIndex(index);
  }

  render() {
    const { children } = this.props;
    const { activeChild } = this.state;

    const indicatorDots = Children.map(children, (child, index) => (
      <button
        className={classNames('dot', { 'dot--active': index === activeChild })}
        type="button"
        onClick={() => this.onIndicatorClick(index)}
      />
    ));

    return (
      <div className="Carousel">
        {children[activeChild]}
        <div className="indicators">{indicatorDots}</div>
      </div>
    );
  }
}
