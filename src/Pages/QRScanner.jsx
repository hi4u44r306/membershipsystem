// QRScanner.js
import React, { useEffect, useRef, useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import './scss/QRScanner.scss';
import Quagga from 'quagga';


const QRScanner = () => {

    const scannerContainer = useRef(null);
    useEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: 'environment'
                },
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers: ['code_128_reader']
            },
            locate: true
        }, function (err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });

        Quagga.onDetected(function (result) {
            console.log(result.codeResult.code);
        });

        return () => {
            Quagga.stop();
        };
    }, []);
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
            <h3>會員掃描</h3>
            <div ref={scannerContainer} id="scanner-container"></div>
            {/* <QrReader
                delay={300}
                facingMode={"environment"}
                style={{
                    height: 256,
                    width: 256,
                }}
                onError={handleError}
                onScan={handleScan}
            /> */}
            {/* </canvas> */}

            {/* {result && (
                <p className="result">Scanned Result: {result}</p>
            )} */}
            <p className="result">會員編號: {result || '無資料'}</p>
        </div>
    );
};

export default QRScanner;
