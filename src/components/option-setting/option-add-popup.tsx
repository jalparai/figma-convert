import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Form from "react-bootstrap/Form";
// import DeleteMod from './delete-btn';
import { useState } from "react";
import { addNewOption, getAllAllergen, getAllCategories } from "./api";
import { showErrorMsg, showSuccessMsg } from "../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../pages/product/api";
import "../../asserts/css/product.css";
import "../../asserts/css/delete-popup.css";
import { useTranslation } from 'react-i18next';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Categories {
  id: string;
  title: string;
  isSubCategory: string;
  rank: string;
}
interface ListItem {
  item_name: string;
  price: string;
}
interface Allergens {
  id: string;
  special_name: string;
  name: string;
}

interface AllProducts {
  id: string;
  name: string;
}

const OptionAdd = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState([
    { lang: "en", name: "", special_name: "" },
  ]);
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");
  const [productBased, setProductBased] = useState(false);
  const [unlimitedChoice, setUnlimitedChoice] = useState(false);
  const [limit, setLimit] = useState("1");
  const [items, setItems] = useState<ListItem[]>([
    { item_name: "", price: "" },
  ]);

  //  const [item_name, setitemName] = useState([{item_name:""}]);

  const [categories, setCategories] = useState<Categories[]>([]);
  const [allAllergens, setAllAllergens] = useState<Allergens[]>([]);
  const [allProducts, setAllProducts] = useState<AllProducts[]>([]);
  const handleLocale = (type: string, value: string, index: number) => {
    let localeData = locale;
    let currentObj = locale[index];
    switch (type) {
      case "name":
        currentObj.name = value;
        break;
      case "special_name":
        currentObj.special_name = value;

      // case 'lang':
      //   currentObj.lang = value;
    }

    localeData[index] = currentObj;
    setLocale(localeData);
    console.log(currentObj.name);
  };

  const handleSave = async () => {
    setLoading(true);
    // const xobj = {
    //   name: "atome1",
    //   special_name: "atom1s",
    //   type: 2,
    //   choose_limit: 5,
    //   state: 2,
    //   unlimitedChoice: false,
    //   productBased: true,
    //   languages: [
    //     {
    //       lang: "tr",
    //       name: "atome1",
    //       special_name: "atom1s",
    //       items: [],
    //     },
    //   ],
    //   items: [],
    // };
    // const y = {
    //   name: "atom3n",
    //   special_name: "atom3s",
    //   type: 2,
    //   choose_limit: 6,
    //   state: 2,
    //   unlimitedChoice: false,
    //   productBased: true,
    //   languages: [
    //     {
    //       lang: "tr",
    //       name: "atom3n",
    //       special_name: "atom3s",
    //       items: [],
    //     },
    //   ],
    //   items: [],
    // };
    try {
      const payload = {
        name: locale[0].name,
        special_name: locale[0].special_name,
        type: 2, // productBased ? 2 : 1, // Need to confirm as well
        state: 1, // Need to confirm!
        choose_limit: unlimitedChoice ? 1 : limit,
        productBased,
        unlimitedChoice,
        languages: [
          {
            lang: locale[0].lang,
            name: locale[0].name,
            special_name: locale[0].special_name,
            items: [],
          },
        ],
        items: productBased ? [] : items,
      };
      console.log(payload);

      const response = await addNewOption(payload);
      console.log("== response ===", response);
      if (response.response) {
        if (response?.response?.status === 400) {
          showErrorMsg("Please fill all required fields");
        } else {
          showErrorMsg(response.message);
        }
      } else if (response?.data) {
        showSuccessMsg("Product added successfully");
        navigate("/option");
      } else {
        showErrorMsg("Something went wrong");
      }
    } catch (err) {
      console.log("=== err ===", err);
    } finally {
      setLoading(false);
      handleClose();
    }

  };

  useEffect(() => {
    (async function(){
      const allCat = await getAllCategories();
      setCategories(allCat)
    })()
    getAllAllergen(setAllAllergens);
  }, []);

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, [productBased]);

  const handleAddItem = () => {
    setItems([...items, { item_name: "", price: "" }]);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleInputChange = (
    index: number,
    field: keyof ListItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
  const { t } = useTranslation();

  return (
    <div>
      <button className="product_add add_opt_btn" onClick={handleOpen}>
      {t('addOption')}

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.5C9.22562 1.53347 6.57431 2.65047 4.61239 4.61239C2.65047 6.57431 1.53347 9.22562 1.5 12C1.53347 14.7744 2.65047 17.4257 4.61239 19.3876C6.57431 21.3495 9.22562 22.4665 12 22.5C14.7744 22.4665 17.4257 21.3495 19.3876 19.3876C21.3495 17.4257 22.4665 14.7744 22.5 12C22.4665 9.22562 21.3495 6.57431 19.3876 4.61239C17.4257 2.65047 14.7744 1.53347 12 1.5ZM18 12.75H12.75V18H11.25V12.75H6V11.25H11.25V6H12.75V11.25H18V12.75Z"
            fill="white"
          />
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="add_opt_modal_box"
      >
        <Box sx={style} className="opt_add_main">
          {/* Close button */}
          <button className="close-button close_btn" onClick={handleClose}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z"
                fill="#E31927"
                fill-opacity="0.5"
              />
            </svg>
          </button>

          <div className="add_option_style">
            <h4>  {t('addOption')}
</h4>

            <select
              name="Categories"
              id=""
              className="add_language"
              onChange={(e) => setType(e.target.value)}
            >
              <option value=""> {t('categories')}</option>
              <option value="1">English</option>
              <option value="2">Turkish</option>
            </select>
            <input
              type="text"
              name=""
              id=""
              placeholder= {t('name')}
              className="input"
              onChange={(e) => handleLocale("name", e.target.value, 0)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder= {t('specialName')}
              className="input"
              onChange={(e) => handleLocale("special_name", e.target.value, 0)}
            />
            <div className="d-flex " style={{justifyContent:'space-around'}}>
              <div className="d-flex  check_sec">
                <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                  <div className="d-flex m-auto ">
                    <Form.Check
                      type="checkbox"
                      label= {t('productBased')}
                      onChange={(e) => setProductBased(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </div>
              {/* <div className="d-flex m-auto check_sec"></div> */}
              <div className="d-flex  check_sec">
                <Form.Group className="mb-3 " controlId="formBasicCheckbox1">
                  <div className="d-flex m-auto check_sec">
                    <Form.Check
                      type="checkbox"
                      label= {t('unlimitedChoice')}
                      onChange={(e) => setUnlimitedChoice(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
            {!unlimitedChoice && (
              <input
                type="number"
                name="limit"
                id="limit"
                className="input"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            )}

            {productBased ? (
              <select
                name="product-list"
                id=""
                className="add_language"
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                {allProducts.map((product) => (
                  <option value={product.id}>{product.name}</option>
                ))}
              </select>
            ) : (
              <>
                {items.map((item, index) => (
                  <>
                    <div key={index} className="list_add_sec_language">
                      <input
                        type="text"
                        placeholder= {t('name')}
                        className="input"
                        value={item.item_name}
                        onChange={(e) =>
                          handleInputChange(index, "item_name", e.target.value)
                        }
                        // onChange={(e) => setitemName(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder= {t('price')}
                        className="input"
                        value={item.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                      />{" "}
                      <button
                        className="list_btn_edit_dlt delt"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                ))}
                <button className="add_languages mt-2" onClick={handleAddItem}>
                {t('add')}
                </button>
              </>
            )}

            <button className="btn_to_add_list mt-3"> {t('addLanguage')}</button>
          </div>
          {/* Move the closing tag for <Box> outside of add_option_style */}
          <button className="saved_product" onClick={handleSave}>
          {t('save')}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default OptionAdd;
