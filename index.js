const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({
    extended: true
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/parent-prompt', (req, res) => {
    // gets state from the Auth0 action
    const state = req.query.state;

    res.render('pages/person', { state });
  })
  .post('/parent-prompt', (req, res) => {
    console.log(req.body)
    const { state, person } = req.body;

    console.log("Redirecting with state ", state);

    res.redirect(`https://devrel.us.auth0.com/continue?state=${state}&person=${person}`);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
