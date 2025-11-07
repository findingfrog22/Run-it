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
        // <>
        //     <Header />
        //     <Container className="text-center" style={{ height: "91vh" }}>
        //         <Row className="h-100">
        //             <Col>
        //             </Col>

        //             <Col xs={6} className="d-flex flex-column align-items-center" id="home-center-content">
        //                 <h1 className="text-light home-title">Run-It</h1>
        //                 <p className="text-light-emphasis home-subtext">For all your testing needs. Run all of your programs with a specified amount of CPU power and RAM and benchmark them easily.</p>
        //                 <Button variant="primary" className="home-main-cta-button" href="#5">Start Benchmarking</Button>
        //             </Col>

        //             <Col>
        //             </Col>
        //         </Row>
        //     </Container>
        // </>

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    {/* <Greeting /> */}
                    {/* <TodoListCard /> */}
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
            </Row>
        </Container>
    );
}

export default App;
