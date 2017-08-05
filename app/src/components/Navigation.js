import React from 'react';
import ButtonElement from './ButtonElement';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adminButtons: [
        {
          title: "Toggle View",
          action: "toggle_view"
        },
        {
          title: "Add New Member",
          action: "add"
        }
      ]
    }

    this.handleClick = this.handleClick.bind(this);
    this.renderLinkList = this.renderLinkList.bind(this);
  }

  handleClick(e) {
    console.log(e.target.dataset.type)
  }

  renderLinkList() {
    if (this.props.isAdmin) {
      return this.state.adminButtons.map(btn => <ButtonElement handleClick={this.handleClick} key={btn.action} {...btn} />)
    }
  }

  render() {
    return (
      <div className="nav-primary">
        {this.renderLinkList()}
      </div>
    );
  }
}
