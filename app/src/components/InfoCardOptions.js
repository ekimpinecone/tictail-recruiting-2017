import React from 'react';
import IconButton from './IconButton';

export default class InfoCardOptions extends React.Component {
  render() {
    const showingMore = this.props.showingMore;

    return (
      <div className="info-card-options">
        <div className="info-card-list">
          <IconButton handleClick={this.props.handleClick} action={"more"} icon={showingMore ? "close" : "add"} />
          {showingMore ? "" : <IconButton handleClick={this.props.handleClick} action={"edit"} icon="edit" />}
        </div>
      </div>
    );
  }
}
