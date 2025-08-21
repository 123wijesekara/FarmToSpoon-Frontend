import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const MORATUWA_AREAS = [
  "Katubedda",
  "Rawatawatta",
  "Egoda Uyana",
  "Lunawa",
  "Koralawella",
  "Ratmalana",
  "Moratuwa City"
];

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unitType: "",
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    location: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory);

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((prev) => ({ ...prev }));
  };

  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1);
    setData((prev) => ({ ...prev }));
  };

  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => ({ ...prev }));
  };

  const handleAddField = () => {
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" }
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (!userId) {
      alert("User ID is missing or invalid. Please log in again.");
      return;
    }

    try {
      const payload = { ...data, userId, username };
      console.log("Submitting product:", payload);
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: payload
      });

      if (response.data.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unitType: "",
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          location: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Location */}
          <div className="grid gap-1">
            <label className="font-medium">Location</label>
            <select
              name="location"
              value={data.location}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            >
              <option value="">Select product location</option>
              {MORATUWA_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="font-medium">Image</p>
            <label
              htmlFor="productImage"
              className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
            >
              <div className="text-center flex justify-center items-center flex-col">
                {imageLoading ? <Loading /> : <>
                  <FaCloudUploadAlt size={35} />
                  <p>Upload Image</p>
                </>}
              </div>
              <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>

            <div className="flex flex-wrap gap-4 mt-2">
              {data.image.map((img, index) => (
                <div key={img + index} className="h-20 w-20 bg-blue-50 border relative group">
                  <img
                    src={img}
                    alt={img}
                    className="w-full h-full object-scale-down cursor-pointer"
                    onClick={() => setViewImageURL(img)}
                  />
                  <div
                    onClick={() => handleDeleteImage(index)}
                    className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="grid gap-1">
            <label className="font-medium">Category</label>
            <select
              className="bg-blue-50 border w-full p-2 rounded"
              value={selectCategory}
              onChange={(e) => {
                const category = allCategory.find(c => c._id === e.target.value);
                if (category) {
                  setData(prev => ({
                    ...prev,
                    category: [...prev.category, category]
                  }));
                }
                setSelectCategory("");
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <div className="flex flex-wrap gap-3 mt-2">
              {data.category.map((c, index) => (
                <div key={c._id + index} className="text-sm flex items-center gap-1 bg-blue-50 p-1 rounded">
                  <p>{c.name}</p>
                  <IoClose className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveCategory(index)} />
                </div>
              ))}
            </div>
          </div>

          {/* SubCategory */}
          <div className="grid gap-1">
            <label className="font-medium">Sub Category</label>
            <select
              className="bg-blue-50 border w-full p-2 rounded"
              value={selectSubCategory}
              onChange={(e) => {
                const subCategory = allSubCategory.find(c => c._id === e.target.value);
                if (subCategory) {
                  setData(prev => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory]
                  }));
                }
                setSelectSubCategory("");
              }}
            >
              <option value="">Select Sub Category</option>
              {allSubCategory.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <div className="flex flex-wrap gap-3 mt-2">
              {data.subCategory.map((c, index) => (
                <div key={c._id + index} className="text-sm flex items-center gap-1 bg-blue-50 p-1 rounded">
                  <p>{c.name}</p>
                  <IoClose className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveSubCategory(index)} />
                </div>
              ))}
            </div>
          </div>

          {/* Unit Type and Quantity */}
          <div className="grid gap-1">
            <label className="font-medium">Select Unit Type</label>
            <select
              name="unitType"
              value={data.unitType}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            >
              <option value="">Select Unit Type</option>
              <option value="Unit">Unit</option>
              <option value="Kg">Kg</option>
            </select>
          </div>

          {data.unitType && (
            <div className="grid gap-1">
              <label className="font-medium">Quantity ({data.unitType})</label>
              <input
                type="number"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                placeholder={`Enter quantity in ${data.unitType}`}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
          )}

          {/* Stock */}
          <div className="grid gap-1">
            <label className="font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              placeholder="Enter product stock"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Price */}
          <div className="grid gap-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Discount */}
          <div className="grid gap-1">
            <label className="font-medium">Discount</label>
            <input
              type="number"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              placeholder="Enter discount"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* More Details */}
          {Object.keys(data.more_details).map((k, index) => (
            <div className="grid gap-1" key={index}>
              <label className="font-medium">{k}</label>
              <input
                type="text"
                value={data.more_details[k]}
                onChange={(e) =>
                  setData(prev => ({
                    ...prev,
                    more_details: { ...prev.more_details, [k]: e.target.value }
                  }))
                }
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
          ))}

          <div
            onClick={() => setOpenAddField(true)}
            className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>

          <button className="bg-green-200 hover:bg-green-600 py-2 rounded font-semibold">Submit</button>
        </form>
      </div>

      {ViewImageURL && <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
