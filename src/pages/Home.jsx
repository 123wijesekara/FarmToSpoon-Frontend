 // import React from 'react';
// import banner from '../assets/bannerv.jpg';
// import bannerMobile from '../assets/bannerv.jpg';
// import { useSelector } from 'react-redux';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { Link, useNavigate } from 'react-router-dom';
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory);
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const navigate = useNavigate();
  
//   const handleRedirectProductListpage = (id, cat) => {
//     console.log(id, cat);
//     const subcategory = subCategoryData.find(sub => {
//       return sub.category.some(c => c._id === id) ? true : null;
//     });

//     if (subcategory) {
//       const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
//       navigate(url);
//       console.log(url);
//     }
//   };

//   return (
//     <section className='bg-white'>
//       <div className='container mx-auto'>
//         <div className={`w-full h-40 lg:h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
//           <img
//             src={banner}
//             className='w-full h-40 lg:h-48 object-cover rounded'
//             alt='banner' 
//           />
//           <img
//             src={bannerMobile}
//             className='w-full h-40 lg:h-48 object-cover rounded lg:hidden'
//             alt='banner' 
//           />
//         </div>
//       </div>
      
//       <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
//         {loadingCategory ? (
//           new Array(12).fill(null).map((_, index) => (
//             <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
//               <div className='bg-blue-100 min-h-24 rounded'></div>
//               <div className='bg-blue-100 h-8 rounded'></div>
//             </div>
//           ))
//         ) : (
//           categoryData.map((cat) => (
//             <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={() => handleRedirectProductListpage(cat._id, cat.name)}>
//               <div>
//                 <img 
//                   src={cat.image}
//                   className='w-full h-full object-scale-down'
//                   alt={cat.name}
//                 />
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/*** Display category products */}
//       {categoryData?.map((c) => (
//         <CategoryWiseProductDisplay 
//           key={c?._id+"CategorywiseProduct"} 
//           id={c?._id} 
//           name={c?.name}
//         />
//       ))}
//     </section>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import banner from '../assets/bannerv.jpg';
import bannerMobile from '../assets/bannerv.jpg';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

import '../pages/Home.css';

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale',
    'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
    'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya',
    'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa',
    'Badulla', 'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    );

    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    }
  };

  const handleSortChange = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setShowDistrictDropdown(false);
  };

  const clearDistrictFilter = () => {
    setSelectedDistrict('');
  };

  return (
    <section className="home-section">
      <div className="home-container">

        {/* Banner */}
        <div className={`home-banner-container ${!banner && "home-loading-animate my-2"}`}>
          <img src={banner} className="home-banner-image" alt="banner" />
          <img src={bannerMobile} className="home-banner-image lg:hidden" alt="banner" />
        </div>

      
        <div className="home-filter-container">

           
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Sort by:</p>
            <button
              onClick={() => handleSortChange('price')}
              className={`home-filter-button ${sortBy === 'price' ? 'active' : ''}`}
            >
              Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('district')}
              className={`home-filter-button ${sortBy === 'district' ? 'active' : ''}`}
            >
              District {sortBy === 'district' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>

        
          <div className="relative">
            <button
              onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              className={`home-filter-button ${selectedDistrict ? 'active' : ''}`}
            >
              {selectedDistrict || 'Filter by District'}
            </button>

            {showDistrictDropdown && (
              <div className="home-district-dropdown">
                <div className="py-1">
                  {districts.map((district) => (
                    <button
                      key={district}
                      onClick={() => handleDistrictSelect(district)}
                      className="home-district-item"
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            )}

           
{selectedDistrict && (
  <div className="flex items-center gap-4 mt-4">
    <input
      type="text"
      placeholder={`Search products in ${selectedDistrict}...`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="home-search-input"
    />
  </div>
)}

          </div>

       
        </div>

       
        <div className="home-category-grid">
          {loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div key={index + "loadingcategory"} className="home-loading-card">
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div
                key={cat._id + "displayCategory"}
                className="home-category-item"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <img src={cat.image} alt={cat.name} />
              </div>
            ))
          )}
        </div>

      
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
            sortBy={sortBy}
            sortOrder={sortOrder}
            district={selectedDistrict}
            searchTerm={searchTerm}  
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
