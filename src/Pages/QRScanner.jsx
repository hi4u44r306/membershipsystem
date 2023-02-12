// QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import './scss/QRScanner.scss';
import firebase from './firebase';
import Navbar from '../Components/Navbar'

const QRScanner = () => {
    const [username, setUserName] = useState();
    const [userid, setUserId] = useState();
    const db = firebase.firestore();
    const [paymentrecord, setPaymentrecord] = useState(null);
    const currentMonth = new Date().toJSON().slice(0, 7);


    const handleScan = (data) => {
        if (data) {
            //讀取QR Code 取得用戶ID
            setUserId(data)
            db.collection('users').doc(userid).get().then((doc) => {
                setUserName(doc.data().username)
            })

            db.collection("users").doc(userid).collection("Paymentrecord").where('月份', '==', currentMonth).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    setPaymentrecord(doc.data().繳費紀錄);
                })
            })
        }
    };

    console.log(paymentrecord)

    const handleError = (err) => {
        console.error('this is an error', err);
    };


    return (
        <>
            <Navbar />
            <div className="qr-reader">
                <h3>會員掃描</h3>
                <QrReader
                    delay={500}
                    style={{
                        height: 256,
                        width: 256,
                    }}
                    onError={handleError}
                    onScan={handleScan}
                />

                <p className="result">當月是否繳費: {paymentrecord || '無資料'}</p>
                <p className="result">會員編號: {userid || '無資料'}</p>
                <p className="result">會員姓名: {username || '無資料'}</p>
            </div>
        </>
    );
};

export default QRScanner;
