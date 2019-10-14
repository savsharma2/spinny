const React = require('react');
const express = require('express');
const { createSSRMiddleware } = require('react-scripts-ssr');
const { renderToString } = require('react-dom/server');
var cookieParser = require('cookie-parser');

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from './App';

const server = express();

function renderFullPage(html, css) {
  //
  return `
          
          <style id="jss-server-side">${css}</style>
          <div id="ssr">${html}</div>
    `;
}

server.use(cookieParser());
app.use(function(req, res, next) {
  // check if client sent cookie
  // var cookie = req.cookies.cookieName;
  // if (cookie === undefined) {
  //   res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
  //   console.log('cookie created successfully');
  // } else {
  //   // yes, cookie was already present
  //   console.log('cookie exists', cookie);
  // }
  next(); 
});

server.use(
  createSSRMiddleware((req, res, next) => {
    const sheets = new ServerStyleSheets();
    // const body = renderToString(<App />);
    const html = renderToString(
      sheets.collect(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      )
    );
    console.log('aaaaaaaaaa');
    const css = sheets.toString();
    const body = (html, css);
    next({ body }, req, res);
  })
);

const PORT = process.env.REACT_APP_SERVER_SIDE_RENDERING_PORT || 8888;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
