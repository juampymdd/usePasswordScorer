import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <header className="custom-header">
      <h1>Password Scorer</h1>
      <p>A simple, multilingual JavaScript library for password strength checking.</p>
    </header>
    <App />
    <footer className="custom-footer">
        <a href="https://www.npmjs.com/package/password-scorer" target="_blank">
          <img src="npm.svg" alt="npm" className="img-button" />
        </a>
        <a href="https://github.com/juampymdd/password-scorer" target="_blank">
          <img src="github.svg" alt="github" className="img-button" />
        </a>
      </footer>
  </React.StrictMode>,
)
