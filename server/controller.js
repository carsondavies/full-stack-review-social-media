const getAllPosts = async (db) => {
  const posts = await db.get_posts()
  return posts
}

module.exports = {
  //TODO Get all posts
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },


  //TODO Create new post
  addPost: async (req, res) => {
    /*
      TODO Pull user's id from session
      TODO get content from req.body
      TODO save post to the db
      TODO send back all posts.
    */

    const db = req.app.get('db')
    //pull user id from session
    const { id } = req.session.user

    //get content from req.body
    const { content } = req.body

    //save post to db
    await db.add_post([id, content])

    //send back all posts and confirmation
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },


  //TODO Edit existing post
  editPost: async (req, res) => {
    /*
    TODO get content from req.body
    TODO get post_id from req.params
    TODO save the updated post to the db
    TODO Send back all the posts
    */
    const db = req.app.get('db')

    //get content from req.body
    const { content } = req.body

    //got post_id from req.params
    const { post_id } = req.params

    //save updated post
    await db.edit_post([content, post_id])

    //send array of posts
    const posts = await getAllPosts(db)
    res.status(200).send(posts)

  },


  //TODO Delete existing post
  deletePost: async (req, res) => {
    /*
      TODO get post_id from req.params
      TODO delete post from db
      TODO send back updated posts array
    */
    const db = req.app.get('db')

    //get post_id from params
    const { post_id } = req.params

    //delete post
    await db.delete_post([post_id])

    //send back updated array
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  }
};
