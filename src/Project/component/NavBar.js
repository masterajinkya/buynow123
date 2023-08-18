import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Modal, ModalHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        prodimg: '',
        prodtname: '',
        prodprice: '',
        quantity: 1,
    });

    const userinput = JSON.parse(localStorage.getItem("userinput"))
    const [data, setData] = useState(userinput || []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 100 * 1024) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const baseImage = e.target.result;
                setFormData((prev) => ({ ...prev, prodimg: baseImage }))
                setError(false)
            };
            reader.readAsDataURL(file);
        } else {
            setError(true)
        }
    };

    const handleProductNameChange = (event) => {
        setFormData((prev) => ({ ...prev, prodtname: event.target.value }))
    }
    const handlePriceChange = (event) => {
        setFormData((prev) => ({ ...prev, prodprice: event.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!error) {
            const id = uuidv4()
            const newPro = { ...formData, id }
            setData([...data, newPro])
            const userdata = [...data, newPro]
            setFormData({
                prodimg: '',
                prodtname: '',
                prodprice: '',
                quantity: 1,
            });
            localStorage.setItem("userinput", JSON.stringify([...data, newPro]))
            navigate("/")
        } else {
            alert("Please upload a file below 100 kb")
        }
    }

    // useEffect(() => {
    //     const asd = JSON.parse(localStorage.getItem("userinput")) || [];
    //     setData(asd)
    // }, [data]);


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Ajinkya Giri</Typography>
                        <Button onClick={() => setModal(true)} color="inherit">BuyNow</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* -------------------------PopUp----------------------------*/}
            <Modal size='md' className='popup border border-primary ' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader className='p-5'>

                    <form onSubmit={handleSubmit}>
                        <div class="row">
                            <div class="form-group">
                                <label >Add Image</label>
                                <input className="form-control mb-3" type="file" accept="image/*" name='prodimg' required
                                    onChange={handleFileChange} />
                                {error && <Typography className='text-danger'>Please upload a file below 100 kb</Typography>}
                            </div>
                            <div class="form-group">
                                <label>Product Name</label>
                                <input className="form-control mb-3" type="text" name='name' value={formData.name}
                                    onChange={handleProductNameChange} required />
                            </div>
                            <div class="form-group">
                                <label>Price (rs)</label>
                                <input className="form-control mb-3 " type="text" name='price' value={formData.price}
                                    onChange={handlePriceChange} required />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary ">Add Product</button>
                    </form>
                </ModalHeader>
            </Modal>
        </>
    )
}

export default NavBar
