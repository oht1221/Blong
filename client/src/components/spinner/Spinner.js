import React, { Fragment } from 'react'
import { Row, Spinner } from 'reactstrap'

const BorderSpinner = (
    <Fragment>
        <Row className="d-flex justify-content-center m-5">
        <Spinner 
            style={{width: "2rem", height: "2rem"}}
            animation="border"
            role='status'>Loading...</Spinner>
        </Row>
    </Fragment>
        
);

export default BorderSpinner