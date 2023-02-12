import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import firebase from './firebase';
import QRCode from "react-qr-code";
import './scss/Profile.scss'
import Navbar from '../Components/Navbar';


function Profile() {
    const [useruid, setUserUID] = useState();
    const [username, setUserName] = useState();
    const [useremail, setUserEmail] = useState();
    const navigate = useNavigate();
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserUID(user.uid)
            db.collection('users').doc(user.uid).get().then((doc) => {
                setUserEmail(doc.data().email)
                setUserName(doc.data().username)
            })
        } else {
            setTimeout(function () { window.location.href = "/" }, 1000)
        }
    });

    function Logout() {
        firebase.auth().signOut();
    }

    function DeleteUser() {
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
            db.collection('users').doc(useruid).delete().then(() => {
                navigate('/');
            })
        })
    }

    return (
        <div>
            <Navbar />
            <form className="login-form">
                <h3>桃園安親班會員資料</h3>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${useruid}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='userinfo'>
                    <span>
                        Email : {useremail || '讀取中...'}
                    </span>
                    <span>
                        姓名 : {username || '讀取中...'}
                    </span>
                </div>
                <button className='logoutbtn' onClick={Logout}>登出</button>
                <button className='deletebtn' onClick={DeleteUser}>刪除帳號</button>
            </form>

        </div>
    )
}


export default Profile