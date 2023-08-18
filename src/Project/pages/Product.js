import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Product() {
    const navigate = useNavigate()
    const [total, setTotal] = useState(0);
    // const [data, setData] = useState();

    const userinput = JSON.parse(localStorage.getItem("userinput")) || []
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const handleInc = (id) => {
        const updatedData = userinput.map((item) => {
            if (item.id === id) {
                return {
                    ...item, quantity: item.quantity + 1
                }
            }
            return item
        })
        localStorage.setItem("userinput", JSON.stringify(updatedData))
        navigate("/")
    }
    const handleDec = (id) => {
        const updatedData = userinput.map((item) => {
            if (item.id === id) {
                return {
                    ...item, quantity: item.quantity - 1
                }
            }
            return item
        })
        localStorage.setItem("userinput", JSON.stringify(updatedData))
        navigate("/")
    }

    const handlecart = (id) => {
        const updatedCart = userinput.map((item) => {
            if (item.id === id) {
                return {
                    ...item
                }
            }
            return item
        })

        localStorage.setItem("cart", JSON.stringify(updatedCart))
        navigate("/")
    }

    useEffect(() => {
        const addTotal = cart?.reduce((accumulator, item) => {
            return accumulator + item.prodprice * item.quantity
        }, 0)
        setTotal(addTotal)
    }, [userinput]);

    const handleRemove = (id) => {
        const updateCart = cart.filter((item) => item.id !== id)
        localStorage.setItem("cart", JSON.stringify(updateCart))
        navigate("/")
    }



    // useEffect(() => {
    //     const cart = JSON.parse(localStorage.getItem("cart")) || []
    // }, [cart]);


    return (
        <>
            <section className="text-gray-600 body-font my-3 ">
                <div className="container mx-auto ">
                    <div className='row'>

                        {userinput?.map((item) => {

                            return <div className='col-md-4 mt-5'>

                                <div class="card text-center" >
                                    <img src={item.prodimg} class="card-img-top img-responsive" alt="..." />
                                    <div class="card-body">
                                        <div className="mt-2">
                                            <h3 className="text-gray-500 text-capitalize text-xs tracking-widest title-font mb-3">{item.prodtname}</h3>
                                            <h5 className="mb-3 text-danger">${item.prodprice}</h5>
                                        </div>
                                        <div className='d-flex countbtn text-center'>
                                            <button className='btn btn-outline-secondary' onClick={() => handleDec(item.id)}>-</button>
                                            <h2>{item.quantity}</h2>
                                            <button className='btn btn-outline-secondary' onClick={() => handleInc(item.id)}>+</button>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" onClick={() => handlecart(item.id)} className='btn btn-primary px-4 mt-3 '>Add to bag</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        })}


                    </div>

                </div>
            </section>
            <section className='my-5 mb-0' >
                <div className='container mt-5'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price Details</th>
                                <th scope="col">Order Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {cart?.map((item) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{item.prodtname}</th>
                                        <td>{item.quantity}</td>
                                        <td>${item.prodprice}</td>
                                        <td className='text-danger'>${item.prodprice * item.quantity}</td>
                                        <td><span onClick={() => handleRemove(item.id)} className='text-danger '><HighlightOffIcon /></span></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                        <tbody>
                            <tr>
                                <th scope="row" colSpan="3" className='flot-right'>Total</th>
                                <td>${total}</td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Product
