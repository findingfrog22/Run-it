import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Header } from './components/Header';

function App() {
    const [newFile, setNewFile] = useState('')

    const uploadFile = function(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", newFile);

        fetch('/api/upload', {
            method: "POST",
            body: formData,
        }).then(function(res) {
            return res.json()
        }).then(function(data){
            console.log(data)
        })
    }

    return (
        <>
            <Header />
            <Container fluid id="home-container" className="text-center">
                <Row className="h-100">
                    <Col />

                    <Col className="d-flex flex-column align-items-center" id="home-center-content">
                        <h1 className="text-light home-title">Run-It</h1>
                        <p className="text-light-emphasis home-subtext">For all your testing needs. Run all of your programs with a specified amount of CPU power and RAM and benchmark them easily.</p>
                        <Button variant="secondary" className="home-main-cta-button" href="#5">Register Now</Button>

                        <Form onSubmit={uploadFile}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload one file:</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    accept=".py" 
                                    onChange={function(e) { setNewFile(e.target.files[0])} }
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Upload & Run
                            </Button>
                        </Form>
                    </Col>

                    <Col />
                </Row>
            </Container>

            <Container fluid id="benchmarking-container" className="text-center">
                <Row className="d-flex align-items-center h-100">
                    <Col />

                    <Col className="d-flex flex-column align-items-center">
                        <p className='text-light-emphasis home-subtext'>Benchmark your software with specs up to 64GB of RAM and 72 CPU cores with a detailed log and output of your program.</p>
                        <Button variant="secondary" className="home-main-cta-button" href="#5">Start Benchmarking</Button>
                    </Col>

                    <Col />
                </Row>
            </Container>

            <Container fluid id="information-container" className="text-container">
                <Row className="h-100">
                    <Col>

                    </Col>
                    
                    <Col>

                    </Col>
                </Row>
            </Container>

            <Container fluid id="aboutus-container" className="text-container">
                <Row className="h-100">
                    <Col>

                    </Col>

                    <Col>

                    </Col>
                </Row>
            </Container>

            {/* Footer goes here */}
        </>
    );
}

export default App;
