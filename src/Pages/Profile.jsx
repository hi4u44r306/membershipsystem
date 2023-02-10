import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import firebase from './firebase';
import QRCode from "react-qr-code";
import './scss/Profile.scss'


function Profile() {
    let { id } = useParams();
    const [userinfo, setUserInfo] = useState({});
    const [useruid, setUserUID] = useState();
    const navigate = useNavigate();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const dbRef = firebase.database().ref();
            setUserUID(user.uid)
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    setUserInfo(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            navigate('/');
        }
    });

    function Logout() {
        firebase.auth().signOut();
    }

    function DeleteUser() {
        const user = firebase.auth().currentUser;
        firebase.database().ref('users/' + useruid).remove().then(() => {
            user.delete().then(() => {
                alert("User deleted")
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        })
    }

    return (
        <div>
            <form className="login-form">
                <h3>桃園安親班會員資料</h3>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${useruid},${userinfo.username}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='userinfo'>
                    <span>
                        Email : {userinfo.email}
                    </span>
                    <span>
                        姓名 : {userinfo.username || '無'}
                    </span>
                </div>
                <button className='logoutbtn' onClick={Logout}>登出</button>
                <button className='deletebtn' onClick={DeleteUser}>刪除帳號</button>
                {id}
            </form>

        </div>
    )
}


export default Profile