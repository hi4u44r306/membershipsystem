import React from 'react'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/profile">會員資訊</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/scanner">QR Code</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item> */}
        </Nav>
    )
}

export default Navbar