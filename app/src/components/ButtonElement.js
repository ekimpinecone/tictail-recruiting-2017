import React from 'react';

export default class ButtonElement extends React.Component {
  render() {
    return (
      <button className="btn-primary" data-type={this.props.action} onClick={this.props.handleClick}>{this.props.title}</button>
    );
  }
}
