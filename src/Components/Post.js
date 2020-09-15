import React from 'react'
import { connect } from 'react-redux'

//TODO Fill out post content

const Post = (props) => {
  return (
    <li className="post-container">
      <div>
        <p className="post-text">
          {
            props.post.content
          }
        </p>
      </div>
      <div className="post-buttons">
        {props.user.id === props.post.author_id && (

          <button
            className="input-container-button-small"
            onClick={() => {
              props.toggleEdit()
            }}
          >
            Edit
          </button>
        )}
        {props.user.id === props.post.author_id && (

          <button
            className="input-container-button-small"
            onClick={() => {
              props.handleDelete(props.post.id)
            }}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post)
