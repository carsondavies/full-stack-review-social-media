const bcrypt = require('bcryptjs')

module.exports = {
  //TODO Register new user
  register: async (req, res) => {
    /*
      TODO get email, password from req.body
      TODO check if user already exists, if exists, reject the request
      TODO salt and hash password
      TODO create the user in the db
      TODO put the user on session
      TODO send confirmation
    */
    const db = req.app.get('db')

    //destructure values from body
    const { email, password } = req.body

    //db.functions always return an array, brackets allow you to pull the first item off the array, checking if user exists, and storing to variable user.
    const [user] = await db.check_user([email])

    //if user exists, use return to stop your code from firing below, rejecting the request
    if (user) {
      return res.status(409).send('user already exists')
    }

    //salting the password (adds extra unique characters)
    const salt = bcrypt.genSaltSync(10)

    //hashing the password.
    const hash = bcrypt.hashSync(password, salt)

    // create the new user in the db.
    const [newUser] = await db.register_user([email, hash])

    //put the new user on the session
    req.session.user = newUser

    //send confirmation
    res.status(200).send(req.session.user)
  },


  //TODO Login existing user
  login: async (req, res) => {
    /*
      TODO get email and password from req.body
      TODO See if user exists. if they dont reject request
      TODO compare the password and hash. if there is mismatch, reject request
      TODO put user on session
      TODO send confirmation
    */
    const db = req.app.get('db')
    //get email and password from the body(front end)
    const { email, password } = req.body
    // check if user exists
    const [existingUser] = await db.check_user([email])
    //if they don't exists, reject the login request
    if (!existingUser) {
      return res.status(404).send('user not found')
    }

    //compare password and hash
    const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

    // if there is a mismatch, reject the login request
    if (!isAuthenticated) {
      return res.status(403).send('incorrect email or password')
    }

    delete existingUser.hash

    //put user on session
    req.session.user = existingUser

    //send confirmation
    res.status(200).send(req.session.user)
  },


  //TODO Logout user
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },


  //TODO Get user from session
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }
  },
}
