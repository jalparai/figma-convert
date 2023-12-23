import React, { useEffect, useRef } from "react";
import "../../asserts/css/product.css";
import Form from "react-bootstrap/Form";
import ProductImg from "../../asserts/imgs/not-available.png";
import "../../asserts/css/add-product.css";
import AddOpt from "../../components/add-option-modal";
import { useState } from "react";
import {
  addNewProduct,
  getAllAllergen,
  getAllCategories,
  getProductById,
  updateProductById,
} from "./api";
import { showErrorMsg, showSuccessMsg } from "../../utils/notifications";
import { useNavigate, useParams } from "react-router-dom";

interface Categories {
  id: string;
  title: string;
  isSubCategory: string;
  rank: string;
}

interface Allergens {
  id: string;
  title: string;
}

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [stockCode, setStockCode] = useState("");
  const [locale, setLocale] = useState([
    { lang: "en", title: "", description: "" },
  ]);
  const [type, setType] = useState("");
  const [calories, setCalories] = useState<any>(0);
  const [favorite, setFavorite] = useState(false);
  const [opportunity, setOpportunity] = useState(false);
  const [activeList, setActiveList] = useState([1]);
  const [prices, setPrices] = useState([
    {
      priceName: "",
      currency: "TL",
      order_type: [1],
      amount: 0,
      vat_rate: 0,
      price: 0,
    },
  ]);
  const [allergens, setAllergens] = useState("");
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [categories, setCategories] = useState<Categories[]>([]);
  const [allAllergens, setAllAllergens] = useState<Allergens[]>([]);
  const [curentData, setCurrentData] = useState<any>({});

  const handleLocale = (type: string, value: string, index: number) => {
    let localeData = locale;
    let currentObj = locale[index];
    switch (type) {
      case "title":
        currentObj.title = value;
        break;
      case "description":
        currentObj.description = value;
        break;
      case "lang":
        currentObj.lang = value;
    }

    localeData[index] = currentObj;
    setLocale([...localeData]);
    console.log(value);
  };

  const handleActiveList = (type: boolean, value: number) => {
    let active = activeList;
    if (type) {
      if (!active.includes(value)) {
        active.push(value);
      }
    } else {
      if (active.includes(value)) {
        active = active.filter((ele) => ele !== value);
      }
    }
    setActiveList([...active]);
  };
  console.log("===activeactive=========>", activeList);

  const getPriceDetails = (type: string, index: number) => {
    const price = prices[index];
    switch (type) {
      case "name":
        return price.priceName;
      case "listingName":
        return price.order_type[0];
      case "quantity":
        return price.amount;
      case "currency":
        return price.currency;
      case "vat":
        return price.vat_rate;
    }
  };

  const setPriceDetails = (type: string, value: any, index: number) => {
    const allPrices = prices;
    const price = prices[index];
    switch (type) {
      case "name":
        price.priceName = value;
        break;
      case "listingName":
        price.order_type[0] = parseInt(value);
        break;
      case "quantity":
        price.amount = value;
        break;
      case "price":
        price.price = value;
        break;
      case "currency":
        price.currency = value;
        break;
      case "vat":
        price.vat_rate = value;
        break;
    }

    allPrices[index] = price;
    setPrices([...allPrices]);
  };

  const increaseQuantity = (index: number) => {
    let qty = getPriceDetails("quantity", index);

    if (qty) {
      qty = parseInt(qty as string, 10) + 1;
    } else {
      qty = 1;
    }

    setPriceDetails("quantity", qty, index);
  };

  const decreaseQuantity = (index: number) => {
    let qty = getPriceDetails("quantity", index);

    if (qty) {
      qty = parseInt(qty as string, 10) - 1;
    } else {
      qty = 1;
    }
    setPriceDetails("quantity", qty, index);
  };

  const handleAddPrice = () => {
    const newPrice = {
      priceName: "",
      currency: "TL",
      order_type: [1],
      amount: 0,
      vat_rate: 0,
      price: 0,
    };
  
    setPrices((prevState) => [...prevState, newPrice]); // Spread and add new element
  };

  const handleRemovePrice = (index: number) => {
    if (index > 0) {
      let priceList = prices;
      priceList = priceList.filter((_, ind) => ind !== index);
      setPrices(priceList);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event?.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    console.log(curentData);
    try {
      const payload = {
        product: {
          title: locale[0].title,
          description: locale[0].description,
          category: category,
          image: image === null ? "" : image,
          start_time: "",
          end_time: "",
          stock_code: stockCode,
          options: [],
          active_list: activeList,
          sale_type: type,
          prices: prices,
          favorite: favorite,
          opportunity: opportunity,
          calorie: calories,
          allergen: [allergens],
        },
        lang: {
          locale: locale,
        },
      };

      const response = await updateProductById(id, payload);
      if (response.response) {
        if (response?.response?.status === 400) {
          showErrorMsg("Please fill all required fields");
        } else {
          showErrorMsg(response.message);
        }
      } else if (response?.data) {
        showSuccessMsg("Product added successfully");
        navigate("/products");
      } else {
        showErrorMsg("Something went wrong");
      }
    } catch (err) {
      console.log("=== err ===", err);
    } finally {
      setLoading(false);
    }
  };

  const setAllContent = () => {
    setStockCode(curentData?.stock_code);
    setLocale([
      {
        lang: "en",
        title: curentData?.title,
        description: curentData?.description,
      },
    ]);
    setType(curentData?.sale_type);
    setCalories(curentData?.calorie || 0);
    setFavorite(curentData?.favorite);
    setOpportunity(curentData?.opportunity);
    setActiveList(curentData?.active_list);
    setPrices((curentData?.prices && curentData?.prices) || []);
    setAllergens(
      curentData?.allergen && curentData?.allergen.length > 0
        ? curentData?.allergen[0]
        : ""
    );
    setOptions(curentData?.options);
    setCategory(curentData?.category);
    setImage(curentData?.image);
  };

  useEffect(() => {
    (async function(){
      const allCat = await getAllCategories();
      setCategories(allCat)
    })()
    getProductById(id, setCurrentData);
    getAllAllergen(setAllAllergens);
  }, []);

  useEffect(() => {
    setAllContent();
  }, [curentData]);

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">Product Add</h2>
          </div>

          <div></div>
        </div>
        <div className="add_product_form">
          <h2>Add Product</h2>
          <div className="product_data">
            <div className="row">
              <div className="col-lg-6">
                <div className="fields">
                  <div className=" ">
                    <select name="Languages" id="" className="add_language">
                      <option value="en">English</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Product Name "
                    className="input"
                    onChange={(e) => handleLocale("title", e.target.value, 0)}
                    value={locale[0].title}
                  />

                  <textarea
                    name=""
                    id=""
                    className="text_area"
                    onChange={(e) =>
                      handleLocale("description", e.target.value, 0)
                    }
                    value={locale[0].description}
                    placeholder="Write Description"
                  ></textarea>
                  <button className="add_languages">Add Language</button>

                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Stock Code "
                    className="input"
                    onChange={(e) => setStockCode(e.target.value)}
                    value={stockCode}
                  />

                  <select
                    name="Type"
                    id=""
                    className="add_language"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value="">-- Select Type --</option>
                    <option value="1">Quantity</option>
                    <option value="2">Kilogram</option>
                    <option value="3">Liter</option>
                    <option value="4">Meter</option>
                    <option value="4">Portion</option>
                  </select>

                  <select
                    name="Categories"
                    id=""
                    className="add_language"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((ele) => (
                      <option value={ele.id}>{ele.title}</option>
                    ))}
                  </select>

                  <select
                    name="Allergens"
                    id=""
                    className="add_language"
                    onChange={(e) => setAllergens(e.target.value)}
                    value={allergens}
                  >
                    <option value="">-- Select Allergens --</option>
                    {allAllergens.map((ele) => (
                      <option value={ele.id}>{ele.title}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Calorie"
                    className="input"
                    onChange={(e) => setCalories(e.target.value)}
                    value={calories}
                  />

                  <div>
                    <Form.Group
                      className="mb-3 check_btn"
                      controlId="formBasicCheckbox"
                    >
                      <label
                        htmlFor="Add product to favourite products?"
                        className="mt-3"
                      >
                        Add product to favourite products?
                      </label>
                      <div>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          onChange={(e) => setFavorite(e.target.checked)}
                          checked={favorite}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div>
                    <Form.Group
                      className="mb-3 check_btn"
                      controlId="formBasicCheckbox"
                    >
                      <label
                        htmlFor="Add product to opportunity products?"
                        className="mt-3"
                      >
                        Add product to opportunity products?
                      </label>
                      <div>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          onChange={(e) => setOpportunity(e.target.checked)}
                          checked={opportunity}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="prod_img_sec">
                  {image ? (
                    <img
                      src={image}
                      alt="Selected Image"
                      className="img-fluid"
                    />
                  ) : (
                    <img src={ProductImg} alt="" className="img-fluid" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <button onClick={openFileInput}>Change Image</button>
                </div>

                <div className="add_opt">
                  {/* when opt not selected */}
                  <h4>No option add</h4>

                  {/* when opt is selected */}

                  <AddOpt />
                </div>
              </div>
            </div>

            <label htmlFor="Active" className="mt-3 mb-3">
              Active
            </label>
            <div className="active_status mb-3">
              <Form.Group className=" " controlId="formBasicCheckbox3">
                <Form.Check
                  checked={activeList && activeList.includes(1)}
                  type="checkbox"
                  label="Waiter/Pos Odrer"
                  onChange={(e) => handleActiveList(e.target.checked, 1)}
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicCheckbox4">
                <Form.Check
                  checked={activeList && activeList.includes(2)}
                  type="checkbox"
                  label="Qr Code Order"
                  onChange={(e) => handleActiveList(e.target.checked, 2)}
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicCheckbox5 ">
                <Form.Check
                  checked={activeList && activeList.includes(3)}
                  type="checkbox"
                  label="Home delivery"
                  onChange={(e) => handleActiveList(e.target.checked, 3)}
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicCheckbox6">
                <Form.Check
                  checked={activeList && activeList.includes(4)}
                  type="checkbox"
                  label="Take away"
                  onChange={(e) => handleActiveList(e.target.checked, 4)}
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicCheckbox7">
                <Form.Check
                  checked={activeList && activeList.includes(5)}
                  type="checkbox"
                  label="Case sale"
                  onChange={(e) => handleActiveList(e.target.checked, 5)}
                />
              </Form.Group>
            </div>
            <button className="add_p_btn" onClick={handleAddPrice}>
              Add Price type
            </button>

            {prices.map((ele, index) => (
              <div className="price_added_link" key={index}>
                <div className="add_pricing_inpt">
                  <label htmlFor="Price Name">Price Name</label>
                  <input
                    type="text"
                    name={`priceName-${index}`}
                    id={`priceName-${index}`}
                    placeholder={ele.priceName}
                    //value={getPriceDetails('name', index)}
                    onChange={(e) =>
                      setPriceDetails("name", e.target.value, index)
                    }
                  />
                </div>

                <div className="add_pricing_inpt">
                  <label htmlFor="Price Name">Listing Name</label>
                  <select
                    name="Take way"
                    id=""
                    // value={getPriceDetails('listingName', index)}
                    onChange={(e) =>
                      setPriceDetails("listingName", e.target.value, index)
                    }
                  >
                    <option value="1">Waiter/Pos Odrer</option>
                    <option value="2">Qr Code Order</option>
                    <option value="3">Home delivery</option>
                    <option value="4">Take away</option>
                    <option value="5">Case sale</option>
                  </select>
                </div>

                <div className="add_pricing_inpt">
                  <label htmlFor="Price Name">Quanity</label>
                  <br />
                  <div className="increaser_decreaser" key={index}>
                    <button onClick={() => increaseQuantity(index)}>+</button>

                    <span>{getPriceDetails("quantity", index)}</span>
                    <button onClick={() => decreaseQuantity(index)} key={index}>
                      -
                    </button>
                  </div>
                </div>

                <div className="add_pricing_inpt">
                  <label htmlFor="Price">Price</label>
                  <input
                    type="number"
                    placeholder={ele.price.toString()}
                    // value={getPriceDetails('price', index)}
                    onChange={(e) =>
                      setPriceDetails("price", e.target.value, index)
                    }
                  />
                </div>

                <div className="add_pricing_inpt">
                  <label htmlFor="Price Name">Currency</label>
                  <select
                    name="Take way"
                    id=""
                    onChange={(e) =>
                      setPriceDetails("currency", e.target.value, index)
                    }
                    // </div>value={getPriceDetails('currency', index)}
                  >
                    <option value="TL">TL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="add_pricing_inpt">
                  <label htmlFor="Price">VAT</label>
                  <input
                    type="number"
                    // value={getPriceDetails('vat', index)}
                    onChange={(e) =>
                      setPriceDetails("vat", e.target.value, index)
                    }
                  />
                </div>

                <div className="">
                  <button
                    onClick={() => handleRemovePrice(index)}
                    className="delet_btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <button className="saved_product" onClick={handleSave}>
              Save
            </button>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};
export default EditProduct;
