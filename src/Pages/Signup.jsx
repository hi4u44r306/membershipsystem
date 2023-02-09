import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/Login.scss';
import firebase from './firebase';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username && email && password.trim().length !== 0) {
            try {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log(userCredential)
                        firebase.database().ref('users/' + userCredential.user.uid).set({
                            username: username,
                            email: email,
                            password: password,
                            繳費紀錄: {
                                繳費: '1月已繳費',
                            }
                        }).then(() => {
                            navigate('/profile')
                        })
                    })
                    .catch(() => {
                        setError('帳號已存在');
                    });


            } catch (err) {
                setError('Incorrect username or password');
            }
        } else {
            setError('每一個欄位都必須填寫');
        }
    };

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h3>桃園安親班會員註冊</h3>
                {error && <p className="error">{error}</p>}
                <input
                    id="username"
                    type="text"
                    placeholder="姓名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="username-input"
                />
                <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="username-input"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input"
                />
                <button type="submit" className="submit-button">
                    註冊
                </button>
                <Link to='/' className='loginlink'>登入</Link>
            </form>
        </>
    );
};

export default Signup;
