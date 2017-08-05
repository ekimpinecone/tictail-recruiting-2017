import React from 'react';
import InfoCardOptions from './InfoCardOptions';
import EditCardContents from './EditCardContents';

export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      imageLoaded: false,
      showingOptions: false,
      showAltImg: false,
      placeholder: "https://vignette1.wikia.nocookie.net/cutemariobro/images/5/59/Person-placeholder.jpg/revision/latest?cb=20170131092134"
    }

    this.handleMissingImg = this.handleMissingImg.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  componentWillMount() {
    this.infoCardTimeout = setTimeout(() => {
      this.setState({
        visible: true
      })
    }, 50 * this.props.index);
  }

  componentWillUnmount() {
    clearTimeout(this.infoCardTimeout);
  }

  handleMissingImg() {
    this.setState({
      showAltImg: true
    });
  }

  handleMouseEnter() {
    this.setState({
      showingOptions: true
    });
  }

  handleMouseLeave() {
    this.setState({
      showingOptions: false
    });
  }

  handleClick(e) {
    this.setState({
      [e.target.dataset.type]: !this.state[e.target.dataset.type]
    });
  }

  closeEdit(record) {
    // close editing field and submit saved content
    this.setState({
      edit: false,
      showingOptions: false
    });

    this.props.saveCardContents(record);
  }

  render() {
    const cardStyle = {
      borderBottomColor: `#${this.props.data.color}`,
      background: this.state.showingOptions && !this.state.edit && !this.state.more ? `#${this.props.data.color}` : "#fff"
    }

    return (
      <ColumnContainer focused={this.state.edit || this.state.more}>
        <div style={cardStyle} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className={`info-card ${this.state.visible ? "visible" : "hidden"}`}>
          {
            (() => {
              if (this.state.edit) {
                return <EditCardContents {...this.props} handleClick={this.handleClick} saveCardContents={this.closeEdit} />
              } else {
                return <InfoCardContents {...this.props}  handleClick={this.handleClick}
                                                          showingOptions={this.state.showingOptions}
                                                          showingMore={this.state.more}
                                                          placeholder={this.state.placeholder}
                                                          showAltImg={this.state.showAltImg}
                                                          handleMissingImg={this.handleMissingImg} />
              }
            })()
          }
        </div>
      </ColumnContainer>
    );
  }
}

function InfoCardContents(props) {
  const team = props.data.team === "Teamless" ? "-" : props.data.team;
  const location = props.data.location ? props.data.location.split("_").join(" ") : "Nomad";

  return (
    <div className="info-card-contents">
      {
        (() => {
          if (props.showAltImg || !props.data.image) {
            return <img alt={`headshot of ${props.data.first_name}`} className="info-card-img" src={props.placeholder}  />
          } else {
            return <img alt={`headshot of ${props.data.first_name}`} className="info-card-img" src={props.data.image} onError={props.handleMissingImg} />
          }
        })()
      }

      <h3 className="info-card-title">{`${props.data.first_name} ${props.data.last_name}`}</h3>
      <h4>{team}</h4>
      <h4>{location}</h4>
      {
        (() => {
          if (props.showingMore) {
            return (
              <div className="info-card-more">
                <h4>Title: {props.data.title}</h4>
                <h4>ID: {props.data.id}</h4>
              </div>
            )
          }
        })()
      }
      {
        (() => {
          if (props.showingOptions) {
            return <InfoCardOptions showingMore={props.showingMore} handleClick={props.handleClick} />
          }
        })()
      }
    </div>
  )
}

// create from skeleton basics
function ColumnContainer(props) {
  return (
    <div className={`column ${props.focused ? "expanded" : ""}`}>
      {props.children}
    </div>
  )
}
