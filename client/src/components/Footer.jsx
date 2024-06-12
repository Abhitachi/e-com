import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return(
        <footer>
            <Container>
                <Row>
                    <Col>
                    <p>E-commerce &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;