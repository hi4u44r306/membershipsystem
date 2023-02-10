// QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import './scss/QRScanner.scss';

const QRScanner = () => {
    const [result, setResult] = useState('');

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="qr-reader">
            <h3>會員掃描</h3>
            {/* <canvas> */}
            <QrReader
                delay={300}
                facingMode={"front"}
                style={{
                    height: 256,
                    width: 256,
                }}
                onError={handleError}
                onScan={handleScan}
            />
            {/* </canvas> */}

            {/* {result && (
                <p className="result">Scanned Result: {result}</p>
            )} */}
            <p className="result">會員編號: {result || '無資料'}</p>
            <p className="result">會員姓名: {result.split(',')[1] || '無資料'}</p>
        </div>
    );
};

export default QRScanner;
