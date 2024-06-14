import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../slices/productApiSlice'

const ProductListScreen = () => {
const {data: products , isLoading, error, refetch} = useGetProductsQuery();
const [createProduct , {isLoading: loadingCreate}] = useCreateProductMutation();
console.log(products)
const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();


const deleteHandler = async (id) => {
    if(window.confirm('Are you sure')){
        try {
            await deleteProduct(id);
            refetch();
            toast.success("Product deleted!")
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
}

const createProductHandler = async () => {
    if(window.confirm("are you sure want to create a new Product?")){
        try {
            await createProduct();
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
}

return (
    <>
     <Row className="align-items-center">
        <Col>
            <h1>Products</h1>
        </Col>
        <Col  className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
                <FaPlus /> Create Product
            </Button>
        </Col>
        </Row> 
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? (
            <Loader/>
        ): error ? (
            <Message variant ='danger'>
            </Message>
        ) : (
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map ((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' style={{color:'white'}} onClick={() => deleteHandler(product._id)}>
                                        <FaTrash/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/**Paginated placeholder */}
            </>
        )}
    </>
  )
}

export default ProductListScreen
