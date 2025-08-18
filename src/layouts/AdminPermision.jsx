import React from 'react'
import { useSelector } from 'react-redux'
import isFarmer from '../utils/isFarmer'
import isAdmin from '../utils/isAdmin'

const AdminPermision = ({children}) => {
    const user = useSelector(state => state.user)


  return (
    <>
      {
        (isFarmer(user.role) || isAdmin(user.role))
          ? children
          : <p className='text-red-600 bg-red-100 p-4'>Do not have permission</p>
      }
    </>
  )
}

export default AdminPermision