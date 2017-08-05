import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import InfoCard from './components/InfoCard';
import Filters from './components/Filters';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: true,
      dataLoaded: false,
      rows: []
    }

    this.createFilters = this.createFilters.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.saveCardContents = this.saveCardContents.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.alertUser = this.alertUser.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  componentWillMount() {
    fetch(`http://127.0.0.1:5000/contacts`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          dataLoaded: true,
          rows: data,
          filters: this.createFilters(data)
        });
      });
  }

  createFilters(data) {
    let filters = [];

    data.forEach(item => {
      if (item.location) {
        item.location.split("/").forEach(str => {
          let filterExists = filters.map(filter => filter.name).indexOf(str) !== -1;

          if (!filterExists) {
            let filterItem = {name: str, active: false};
            filters.push(filterItem);
          }
        });
      }
    });

    return filters;
  }

  toggleFilter(e) {
    let updatedFilters = this.state.filters.slice();

    updatedFilters.forEach(filter => {
      if (filter.name === e.target.dataset.name) {
        filter.active = !filter.active;
      }
    });

    this.setState({
      filters: updatedFilters
    });
  }

  alertUser(msg, color) {
    console.warn("Edit Message", msg, color)
  }

  updateRow(record) {
    let updatedRows = this.state.rows.slice();
    let indexOfRecord = this.state.rows.map(row => row.id).indexOf(record.id);

    updatedRows[indexOfRecord] = record;

    this.setState({
      rows: updatedRows,
      filters: this.createFilters(updatedRows)
    });
  }

  updateRecord(record) {
    var request = new Request(`http://127.0.0.1:5000/contacts/${record.id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(record),
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request)
    .then((response) => {
      if (response.status === 200) {
        this.alertUser("Success!", "green");
        this.updateRow(record);
      } else {
        this.alertUser("An Error Has Occurred, Please Try Again", "red");
      }
    })
    .catch(err => {
      this.alertUser("An Error Has Occurred, Please Try Again", "red");
    });
  }

  saveCardContents(record) {
    // sanitize fields before submitting
    // validate url
    for (const field of Object.keys(record)) {
      if (typeof record[field] !== "string") {
        // warn user something went wrong
        console.warn(`Update Failed on ${record.string}`)
        return;
      }
    }

    this.updateRecord(record);
  }

  renderRows() {
    let rows = this.state.rows;
    let activeFilters = this.state.filters.filter(f => f.active).map(n => n.name);
    let filteredRows;

    // If any filters are enabled, filter by string
    if (activeFilters.length > 0) {
      filteredRows = rows.filter(row => {
        let shouldShow = false;
        if (row.location) {
          row.location.split("/").forEach(loc => {
            if (activeFilters.indexOf(loc) >= 0){
              shouldShow = true;
            }
          });
        }
        return shouldShow;
      });
    } else {
      filteredRows = rows;
    }

    return filteredRows.map((row, index) => <InfoCard key={row.id} index={index} data={row} saveCardContents={this.saveCardContents} />); // filter cards
  }

  render() {
    return (
      <div className="App">
        <Navigation isAdmin={this.state.isAdmin} />
        {
          (() => {
            if (this.state.filters) {
              return <Filters filters={this.state.filters} toggleFilter={this.toggleFilter} />;
            }
          })()
        }
        <div className="container">
          {
            (() => {
              if (this.state.dataLoaded) {
                return this.renderRows();
              }
            })()
          }
        </div>
      </div>
    );
  }
}
