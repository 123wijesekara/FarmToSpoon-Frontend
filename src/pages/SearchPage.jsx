 // import React, { useEffect, useState } from 'react'
// import CardLoading from '../components/CardLoading'
// import SummaryApi from '../common/SummaryApi'
// import Axios from '../utils/Axios'
// import AxiosToastError from '../utils/AxiosToastError'
// import CardProduct from '../components/CardProduct'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import { useLocation } from 'react-router-dom'
// import noDataImage from '../assets/react.svg'

// const SearchPage = () => {
//   const [data,setData] = useState([])
//   const [loading,setLoading] = useState(true)
//   const loadingArrayCard = new Array(10).fill(null)
//   const [page,setPage] = useState(1)
//   const [totalPage,setTotalPage] = useState(1)
//   const params = useLocation()
//   const searchParams = new URLSearchParams(location.search)
//  const searchText = searchParams.get('q') || ''
//   const fetchData = async() => {
//     try {
//       setLoading(true)
//         const response = await Axios({
//             ...SummaryApi.searchProduct,
//             data : {
//               search : searchText ,
//               page : page,
//             }
//         })

//         const { data : responseData } = response

//         if(responseData.success){
//             if(responseData.page == 1){
//               setData(responseData.data)
//             }else{
//               setData((preve)=>{
//                 return[
//                   ...preve,
//                   ...responseData.data
//                 ]
//               })
//             }
//             setTotalPage(responseData.totalPage)
//             console.log(responseData)
//         }
//     } catch (error) {
//         AxiosToastError(error)
//     }finally{
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setPage(1) // Reset page when search text changes
//   }, [searchText])

//   useEffect(()=>{
//     fetchData()
//   },[page,searchText])

//   console.log("page",page)

//   const handleFetchMore = ()=>{
//     if(totalPage > page){
//       setPage(preve => preve + 1)
//     }
//   }

//   return (
//     <section className='bg-white'>
//       <div className='container mx-auto p-4'>
//         <p className='font-semibold'>Search Results: {data.length}  </p>

//         <InfiniteScroll
//               dataLength={data.length}
//               hasMore={true}
//               next={handleFetchMore}
//         >
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
//               {
//                 data.map((p,index)=>{
//                   return(
//                     <CardProduct data={p} key={p?._id+"searchProduct"+index}/>
//                   )
//                 })
//               }

//             {/***loading data */}
//             {
//               loading && (
//                 loadingArrayCard.map((_,index)=>{
//                   return(
//                     <CardLoading key={"loadingsearchpage"+index}/>
//                   )
//                 })
//               )
//             }
//         </div>
//         </InfiniteScroll>

//               {
//                 //no data 
//                 !data[0] && !loading && (
//                   <div className='flex flex-col justify-center items-center w-full mx-auto'>
//                     <img
//                       src={noDataImage} 
//                       className='w-full h-full max-w-xs max-h-xs block'
//                     />
//                     <p className='font-semibold my-2'>No Data found</p>
//                   </div>
//                 )
//               }
//       </div>
//     </section>
//   )
// }

// export default SearchPage
import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nodata.jpg'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchText = searchParams.get('q') || '' // Get the search query parameter

  const fetchData = async() => {
    if (!searchText) {
      setData([])
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        }
      })

      const { data: responseData } = response

      if (responseData?.success) {
        if (responseData?.page === 1) {
          setData(responseData?.data || [])
        } else {
          setData((preve) => {
            return [
              ...preve,
              ...(responseData?.data || [])
            ]
          })
        }
        setTotalPage(responseData?.totalPage || 1)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1) // Reset page when search text changes
  }, [searchText])

  useEffect(() => {
    fetchData()
  }, [page, searchText])

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(preve => preve + 1)
    }
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Results: {data?.length || 0}</p>

        {loading && page === 1 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
            {loadingArrayCard.map((_, index) => (
              <CardLoading key={"loadingsearchpage" + index} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.length || 0}
            hasMore={page < totalPage}
            next={handleFetchMore}
            loader={
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
                {loadingArrayCard.map((_, index) => (
                  <CardLoading key={"loadingsearchpage" + index} />
                ))}
              </div>
            }
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
              {data?.map((p, index) => (
                <CardProduct data={p} key={p?._id + "searchProduct" + index} />
              ))}
            </div>
          </InfiniteScroll>
        )}

        {!loading && data?.length === 0 && (
          <div className='flex flex-col justify-center items-center w-full mx-auto'>
            <img
              src={noDataImage} 
              className='w-full h-full max-w-xs max-h-xs block'
              alt="No products found"
            />
            <p className='font-semibold my-2'>No products found</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchPage