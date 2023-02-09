import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Login.scss';
import firebase from './firebase';

const Login = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    navigate('/profile')
                })
                .catch(() => {
                    setError('帳號密碼錯誤');
                });

        } catch (err) {
            setError('Incorrect username or password');
        }
    };


    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h3>桃園安親班會員登入</h3>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    className="username-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input"
                />
                <button type="submit" className="submit-button">
                    Login
                </button>
                <Link to='/signup' className='signuplink'>註冊</Link>
            </form>
        </>
    );
};

export default Login;
