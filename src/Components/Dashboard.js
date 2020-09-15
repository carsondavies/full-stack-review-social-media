import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../dux/authReducer'
import axios from 'axios'
import PostContainer from './PostContainer'

//TODO Write all methods, connect to store, connect methods to jsx.
class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      userInput: '',
    }
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.getUser().catch((err) => {
        this.props.history.push('/')
      })
    }
    this.getPosts()
  }

  getPosts = () => {
    axios.get('/api/posts').then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  handleClick = () => {
    const { userInput: content } = this.state
    axios.post('/api/posts', { content }).then(res => {
      this.setState({
        posts: res.data,
        userInput: ''
      })
    })
  }

  handleEdit = (postId, content) => {
    axios.put(`/api/posts/${postId}`, { content }).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  handleDelete = (postId) => {
    axios.delete(`api/posts/${postId}`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const mappedPosts = this.state.posts.map((post, index) => {
      return (
        <PostContainer post={post} key={post.id} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
      )
    })
    return (
      <>
        <div className="input-container">
          <textarea
            id="new-post"
            cols="60"
            rows="2"
            placeholder="New post..."
            value={this.state.userInput}
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
          <button
            onClick={() => {
              this.handleClick()
            }}
            className="input-container-button"
          >
            Post
          </button>
        </div>

        <section className="app-body">
          <div className="padding" />
          <ul className="flex-vertical-center post-feed">{mappedPosts}</ul>
        </section>
      </>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Dashboard)
