import React from 'react'
import './scss/PaymentRecord.scss'
import firebase from './firebase';
import Navbar from '../Components/Navbar';

class PaymentRecord extends React.Component {
    state = {
        paymentrecord: null,
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const db = firebase.firestore();
                db.collection('users').doc(user.uid).collection('Paymentrecord').get().then((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        data.push(doc.data())
                    })
                    this.setState({ paymentrecord: data });
                }).catch((err) => {
                    console.log(err);
                })
            } else {
            }
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className='recordbox'>
                    <div className='boxtitle'>
                        <h3>
                            繳費紀錄
                        </h3>
                    </div>
                    <table>
                        <thead>
                            <tr className='titlepart'>
                                <th className='title'>月份</th>
                                <th className='title'>繳費狀態</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.paymentrecord && this.state.paymentrecord.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <td key={record.月份}>
                                                <div className='d-flex justify-content-center'>
                                                    <div className="align-self-center pl-3">
                                                        <b><span className='font-weight-bold'>{record.月份}</span></b>
                                                    </div>
                                                </div>
                                            </td>
                                            <td key={record.繳費紀錄}>
                                                <div className='d-flex justify-content-center'>
                                                    <div className="align-self-center pl-3">
                                                        <b><span className={record.繳費紀錄 ? 'text-danger' || '' : 'text-success'}>{record.繳費紀錄 || '已繳費'}</span></b>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}

export default PaymentRecord