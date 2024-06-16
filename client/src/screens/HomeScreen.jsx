
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Meta from "../components/Meta";

const HomeScreen = () => {
    const {pageNumber , keyword} = useParams();
    const {data, isLoading, error} = useGetProductsQuery({keyword , pageNumber});


    return (
        <>
        { !keyword && !pageNumber ?(
        <ProductCarousel />
        ): 
        (
            <Link to='/' className='btn btn-light mb-4'>
                Go Back
            </Link>
        )}
        {isLoading ? (
            <Loader/>
        ):error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):(
            <>  
            <Meta title={"E-Commerce"} />
            <h1>Latest Products</h1>
                <Row >
                    {data.products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <div className="d-flex justify-content-center ">
                <Paginate pages={data.pages} page={data.page} />
                </div>

            </>
        )}
        </>
    )
}

export default HomeScreen;