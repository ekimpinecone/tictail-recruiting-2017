import React from 'react';

export default class IconButton extends React.Component {
  render() {
    const btnStyle = {
      width: this.props.size,
      height: this.props.size
    }

    return (
      <button style={btnStyle} className="btn-icon" data-type={this.props.action} onClick={this.props.handleClick}><i className="material-icons">{this.props.icon}</i></button>
    );
  }
}

IconButton.defaultProps = {
  size: 75
}
