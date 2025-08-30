import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
    deleteCartItem
  } = useGlobalContext()

  const addressList = useSelector(state => state.addresses.addressList)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()
  const [selectAddress, setSelectAddress] = useState(0)

  const handleCashOnDelivery = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
           userId : userId,
           
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) fetchCartItem()
        if (fetchOrder) fetchOrder()
        navigate('/success', {
          state: {
            text: "Order"
          }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleRemoveFromCart = async (cartId) => {
    try {
      await deleteCartItem(cartId)
      toast.success("Item removed from cart")
      if (fetchCartItem) fetchCartItem()
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen bg-white p-6">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full lg:w-1/2 p-6 border shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-6 mb-6">
            {cartItemsList.map((item, index) => (
              <div key={index} className="flex gap-4 items-start border-b pb-4">
                <img
                  src={item?.productId?.image[0]}
                  alt={item?.productId?.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item?.productId?.name}</h3>
                  
                  <p className="font-medium">
                    {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                  </p>
                  <p className="text-sm text-gray-600">Farmer: {item?.productId?.username}</p>
                  <p className="text-sm text-gray-500">Contact no: {item?.productId?.mobile}</p>
                  <p className="text-sm text-gray-500">
  Qty: {item?.quantity}{item?.productId?.unit?.replace(/^\d+/, "").trim()}
</p>

                
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item?._id)}
                  className="text-blue-500 underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>{DisplayPriceInRupees(totalPrice)}</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>{DisplayPriceInRupees(totalPrice)}</p>
          </div>
          <button
            onClick={handleCashOnDelivery}
            className="w-full bg-green-300 hover:bg-green-500 text-black font-semibold py-2"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage
