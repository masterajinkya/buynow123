import { useState } from 'react';
import './App.css';
import { Modal, ModalHeader } from "reactstrap"
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';


function App() {
    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        img: '',
        name: '',
        price: ''
    });
    const [data, setData] = useState([]);

    const [file, setFile] = useState();


    // const handleImgChange = (e) => {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

    const handleChange = (e) => {
        console.log(e.target.value);
        // setFile(URL.createObjectURL(e.target.files[0]));
        setFormData((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setData([...data, formData])
    }
    console.log(data);


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button onClick={() => setModal(true)} color="inherit">BuyNow</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Modal size='md' className='popup border border-primary ' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader className='p-5'>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label">Add Image</label>
                            <div class="col-sm-7">
                                <input className="form-control" type="file"
                                    // onChange={handleImgChange}
                                    onChange={handleChange}
                                    name='img'
                                    value={formData.img} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label">Product Name</label>
                            <div class="col-sm-7">
                                <input className="form-control" type="text"
                                    onChange={handleChange}
                                    name='name'
                                    value={formData.name} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label">Price (rs)</label>
                            <div class="col-sm-7">
                                <input className="form-control" type="text"
                                    onChange={handleChange}
                                    name='price'
                                    value={formData.price} />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Product</button>
                    </form>
                </ModalHeader>
            </Modal>
            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-24 mx-auto ">
                    <div className="flex flex-wrap -m-4 ">

                        {data?.map((item) => {
                            return <div className="lg:w-1/4 md:w-1/2 p-4 w-full border shadow ">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.img} />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.name}</h3>
                                    <p className="mt-1">${item.price}</p>
                                </div>
                                <div className='d-flex justify-content-between border p-0 '>
                                    {/* <button type="button" className='btn bg-secondary text-white ' onClick={decrement}>-</button> */}
                                    {/* <h5 className='mt-2'>{count}</h5> */}
                                    {/* <button type="button" className='btn bg-secondary text-white' onClick={increment}>+</button> */}
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-primary px-4 mt-3 '>Add to bag</button>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
