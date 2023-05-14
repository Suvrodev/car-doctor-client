import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user,loading}=useContext(AuthContext)

    const loc=useLocation();
  //  console.log(loc)

    if(loading){
        return <progress className="progress w-56 bg-green-500"></progress>
    }

    if(user?.email){
        return children
    }

    return <Navigate state={{from: loc}} to='/login' replace></Navigate>
};

export default PrivateRoute;