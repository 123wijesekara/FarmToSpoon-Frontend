import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`

  const renderStars = (rating) => {
    const stars = []
    const rounded = Math.round(rating * 2) / 2 // round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />)
      } else if (i - 0.5 === rounded) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-xs" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-xs" />)
      }
    }
    return stars
  }

  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
          alt={data.name}
        />
      </div>

      {Boolean(data.discount) && (
        <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
          {data.discount}% discount
        </p>
      )}

      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>

      {/* Rating stars */}
      <div className="px-2 lg:px-0 flex items-center gap-1">
        {renderStars(data.avgRating)}
        {data.ratingCount > 0 && (
          <span className="text-xs text-gray-500">({data.ratingCount})</span>
        )}
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.username}
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.location}
      </div>

      <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base">
        {data.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div>
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default CardProduct
