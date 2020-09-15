import React from 'react'
import { connect } from 'react-redux'

//TODO Write methods, connect to JSX

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: ''
    }
  }

  componentDidMount() {
    this.setState({
      userInput: this.props.post.content
    })
  }

  handleCancel = () => {
    this.props.toggleEdit()
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  handleSave = () => {
    this.props.handleEdit(this.props.post.id, this.state.userInput)
    this.props.toggleEdit()
  }

  render() {
    return (
      <li className="post-container">
        <div>
          <input
            className="post-text"
            value={this.state.userInput}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
        </div>
        <div className="post-buttons">
          <button
            className="input-container-button-small"
            onClick={() => {
              this.handleCancel()
            }}
          >
            Cancel
          </button>
          <button
            className="input-container-button-small"
            onClick={() => {
              this.handleSave()
            }}
          >
            Save
          </button>
        </div>
      </li>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Edit)
