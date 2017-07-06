const React = require('react');
const { render } = require('react-dom')
const { Hello } = require('./components/Hello');

render(
  <Hello/>,
  document.getElementById('root')
);
