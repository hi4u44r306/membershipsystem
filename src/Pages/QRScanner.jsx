// QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import './scss/QRScanner.scss';

const QRScanner = () => {
    const [result, setResult] = useState(null);

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
            <QrReader
                delay={300}
                style={{
                    height: 256,
                    width: 256,
                }}
                onError={handleError}
                onScan={handleScan}
            />

            {result && (
                <p className="result">Scanned Result: {result}</p>
            )}
        </div>
    );
};

export default QRScanner;
