import React from 'react'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <Nav fill >
            <Nav.Item>
                <Nav.Link as={Link} to="/profile">會員資訊</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/scanner">掃描QR Code</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/paymentrecord">繳費紀錄</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar