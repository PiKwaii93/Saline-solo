import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useSelector } from 'react-redux';



export default function Login() {

  const dispatch = useDispatch();

  const [infosConnection, setInfosConnexion] = useState({
    email: '',
    password: '',
  });


  const handleChange = ({ target }) => {
    setInfosConnexion((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(infosConnection))
  };

  const user = useSelector((state) => state.user);

    return (
      <>
      <div className="login-container-all">
        <div className="login-title-container">
          <span className="login-title">Login</span>
        </div>
        {user.errorMessage.length > 0 &&
          <div className="login-error-container">
            <span className="login-error-message">{user.errorMessage}</span>
          </div>
        }
        <div className="login-container">
          <form
            noValidate
            onSubmit={handleSubmit}
            className="form-container"
          >
            <div className="login-input-container-all">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Email address"
                required
                minLength={1}
                className="login-input"
              />
              <input
                type="text"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={1}
                className="login-input"
              />
              <div className="login-information-container-all">
                <div className="login-information-container-left">
                  <input className="login-checkbox" type="checkbox" />
                  <span className="login-information-text-left">Stay connected</span>
                </div>
                <div className="login-information-container-right">
                  <span className="login-information-text-rigth">Forgotten password</span>
                </div>
              </div>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <div className="login-register-container">
            <span className="login-register-text">Don't have an account?</span>
            <Link to="/register" className="menu-burger-link-prevent-style">
              <span className="login-register-link">&nbsp;Register today!</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="back-container">
        <Link to="/" className="menu-burger-link-prevent-style">
          <span className="back-text">Back</span>
        </Link>
      </div>
    </>
    );
  
}
