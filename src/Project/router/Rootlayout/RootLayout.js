import React from 'react'
import NavBar from '../../component/NavBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default RootLayout
