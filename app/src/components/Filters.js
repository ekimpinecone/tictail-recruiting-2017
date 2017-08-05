import React from 'react';

export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.renderFilters = this.renderFilters.bind(this);
  }

  renderFilters() {
    if (this.props.filters) {
      return this.props.filters.map(filter => <FilterItem key={filter.name} name={filter.name} active={filter.active} toggleFilter={this.props.toggleFilter} />);
    }
  }

  render() {
    return (
      <div className="filters">
        <div className="filter-list">
          {this.renderFilters()}
        </div>
      </div>
    );
  }
}

function FilterItem(props) {
  const name = props.name.split("_").join(" ");

  return (
    <button className={`btn-primary ${props.active ? "active" : ""}`} data-name={props.name} onClick={props.toggleFilter}>{name}</button>
  )
}
