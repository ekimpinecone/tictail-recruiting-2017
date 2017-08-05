import React from 'react';
import IconButton from './IconButton';

export default class EditCardContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.data;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateCardContents = this.updateCardContents.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateCardContents(e) {
    e.preventDefault();
    this.props.saveCardContents(this.state);
  }

  render() {
    return (
      <div className="info-card-edit">
        <IconButton action="edit" handleClick={this.props.handleClick} icon={"close"} size={30} />
        <h3>Edit</h3>
        <form onSubmit={this.updateCardContents}>
          <FormField title="First Name" value={this.state.first_name} name={"first_name"} handleInputChange={this.handleInputChange} />
          <FormField title="Last Name" value={this.state.last_name} name={"last_name"} handleInputChange={this.handleInputChange} />
          <FormField title="Location" value={this.state.location} name={"location"} handleInputChange={this.handleInputChange} />
          <FormField title="Team" value={this.state.team} name={"team"} handleInputChange={this.handleInputChange} />
          <FormField title="Title" value={this.state.title} name={"title"} handleInputChange={this.handleInputChange} />
          <FormField title="Favorite Color" value={this.state.color} name={"color"} handleInputChange={this.handleInputChange} />
          <FormField title="ID" value={this.state.id} name={"id"} handleInputChange={this.handleInputChange} />
          <FormField title="Image URL" value={this.state.image} name={"image"} handleInputChange={this.handleInputChange} />
          <input className="btn-primary info-card-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


function FormField(props) {
  return (
    <div className="info-card-edit-field">
      <label>
        {props.title}
        <input type="text" value={props.value || ""} name={props.name} onChange={props.handleInputChange} />
      </label>
    </div>
  )
}
