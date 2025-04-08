import React from 'react'
import { useSelector } from 'react-redux'
import isFarmer from '../utils/isFarmer'
 

const AdminPermision = ({children}) => {
    const user = useSelector(state => state.user)


  return (
    <>
        {
            isFarmer(user.role) ?  children : <p className='text-red-600 bg-red-100 p-4'>Do not have permission</p>
        }
    </>
  )
}

export default AdminPermision