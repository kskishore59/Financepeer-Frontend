import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom';

import "./index.css"

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isPasswordVisible: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    try {
      const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://finanbackend.herokuapp.com/register/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
          
      }
    }
    const response = await fetch(url, options)
    const data = await response.text()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
      
    } catch (error) {
      console.log( error.message)
    }
    
  }

  onClickCheckbox = () => {
    this.setState(prev => ({isPasswordVisible: !prev.isPasswordVisible}))
  }

  renderPasswordField = () => {
    const {password, isPasswordVisible} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <div className="password-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="show-password"
            checked={isPasswordVisible}
            onChange={this.onClickCheckbox}
          />
          <label htmlFor="show-password" className="input-label">
            Show Password
          </label>
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
    history.replace('/')
    }
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
         <h1 className='brand'>FINANCEPEER</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Register
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
        <Link to="/login">
        <div>
          <p>Have an account ?</p>
          <button type='button'>Sign In</button>
        </div>
        </Link>
      
      </div>
    )
  }
}

export default SignUp