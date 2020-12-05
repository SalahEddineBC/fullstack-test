// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from '../components/Main'
import Form from '../components/Form'
const Hello = props => (
  <div>Hello {props.name}!</div>
)
const Feedback = (props) => (
  <div>HWYYY {props.name}!</div>
)


Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}
const App = (props) => {
  return (<BrowserRouter>
    <Switch>
      <Route exact path="/feedback/new" component={Form} />
      <Route exact path="/" component={Main} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>)
}
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})
