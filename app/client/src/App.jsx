import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TodoListCard } from './components/TodoListCard';
import { Greeting } from './components/Greeting';

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
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <Greeting />
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
                            Upload
                        </Button>
                    </Form>


                </Col>
            </Row>
        </Container>
    );
}

export default App;
