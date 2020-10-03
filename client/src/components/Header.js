import { Col, Row } from "reactstrap"
import React from 'react'

const Header = () => {
    return (
        <div id="page-header" className="mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto text-white">
                    <h1> Blong </h1>
                    <p> Hong's blog, Blong</p>
                </Col>
            </Row>
        </div>
    );
};

export default Header;
