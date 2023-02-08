import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import firebase from './firebase';
// import Barcode from 'react-barcode';
import QRCode from "react-qr-code";


function Profile() {
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

    return (
        <div>
            <form className="login-form">
                <h1>桃園安親班會員資料</h1>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`https://taoyuancramschool.netlify.app/profile/${useruid}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>

                <h3>
                    {userinfo.email}
                </h3>
                <h3>
                    {userinfo.name || 'nousername'}
                </h3>
            </form>

        </div>
    )
}


export default Profile