
import { useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';

const ProductScreen = () => {
    const {id:productId} = useParams();
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        dispatch(addToCart({...product,qty}));
        navigate('/cart');
    }

    const {data:product, isLoading, error} = useGetProductDetailsQuery(productId);
    return(
        <>
            <Link to="/" className='btn btn-light my-3'>
                Go Back
            </Link>
        {isLoading ? (<Loader/>):error?(
           <Message variant='danger'/>
        ):(
            <>
             <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid className='rounded'/>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush' className=' rounded'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating}
                        text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price:${product.price} </ListGroup.Item>
                        <ListGroup.Item>Description:{product.description} </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3} >
                    <Card className='border-0'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'InStock':'Out of stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange = {(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x+1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler} >Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>
        )}       
        </>
    )
}

export default ProductScreen;