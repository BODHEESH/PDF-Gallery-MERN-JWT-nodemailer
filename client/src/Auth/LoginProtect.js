import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function LoginProtect() {
    let auth = {"token":localStorage.getItem("usertoken")}
    console.log(auth)
    return (
        !auth.token ? <Outlet /> : <Navigate to={"/home"} />
        )
}

export default LoginProtect