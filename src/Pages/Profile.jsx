import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import firebase from './firebase';
import QRCode from "react-qr-code";
import './scss/Profile.scss'
import Navbar from '../Components/Navbar';
import { BarLoader } from 'react-spinners';


function Profile() {
    const [isLoading, setLoading] = useState(true);
    const username = localStorage.getItem('name');
    const useremail = localStorage.getItem('email');
    const useruid = localStorage.getItem('userid');
    const navigate = useNavigate();
    const db = firebase.firestore();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('users').doc(user.uid).get().then((doc) => {
                localStorage.setItem('email', doc.data().email)
                localStorage.setItem('name', doc.data().username)
                localStorage.setItem('userid', user.uid)
            })
        }
    });

    function Logout() {
        localStorage.clear();
        firebase.auth().signOut();
        navigate('/');
    }

    function DeleteUser() {
        let user = firebase.auth().currentUser;
        user.delete().then(() => {
            db.collection('users').doc(useruid).delete().then(() => {
                navigate('/');
            })
        })
    }

    return (
        <div>
            <Navbar />
            <div className="profile-form">
                <h3>桃園安親班會員資料</h3>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${useruid}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                {
                    isLoading
                        ?
                        <div className='loader'>
                            <BarLoader color="#36d7b7" />
                        </div>
                        :
                        <div className='userinfo'>
                            <span>
                                Email : {useremail}
                            </span>
                            <span>
                                姓名 : {username}
                            </span>
                        </div>
                }
                <button className='logoutbtn' onClick={Logout}>登出</button>
                <button className='deletebtn' onClick={DeleteUser}>刪除帳號</button>
            </div>

        </div>
    )
}


export default Profile