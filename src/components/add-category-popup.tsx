import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../asserts/css/product.css";
import "../asserts/css/delete-popup.css";
// import Img from "../asserts/imgs/category.png";
import { addNewCategory } from "../pages/categorey/api";
import { useState, ChangeEvent, useEffect } from "react";
import { getAllCategories } from "../pages/product/api";
import { showErrorMsg, showSuccessMsg } from "../utils/notifications";
import { useNavigate } from "react-router-dom";
import DummyProduct from "../asserts/imgs/images.png";
import { useTranslation } from "react-i18next";

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

interface Category {
  title: string;
  image: string;
  is_sub_category: boolean;
  parent_category: string;
}

interface Locale {
  lang: string;
  title: string;
}

interface CategoryPayload {
  category: Category;
  lang: {
    locale: Locale[];
  };
}

export default function CategoryAdd() {
  const navigate = useNavigate();

  const initialPayload: CategoryPayload = {
    category: {
      title: "",
      image: "",
      is_sub_category: false,
      parent_category: "",
    },
    lang: {
      locale: [
        {
          lang: "en",
          title: "English",
        },
      ],
    },
  };
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [product, setProduct] = useState<CategoryPayload>(initialPayload);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageChange = (newLang: string) => {
    setProduct((prevPayload) => ({
      ...prevPayload,
      lang: {
        locale: [
          {
            lang: newLang,
            title: prevPayload.lang.locale[0].title,
          },
        ],
      },
    }));
  };
  const handleParentCategoryChange = (newParentCategory: string) => {
    console.log(newParentCategory);
    setProduct((prevPayload) => ({
      ...prevPayload,
      category: {
        ...prevPayload.category,
        parent_category: newParentCategory,
        is_sub_category: Boolean(newParentCategory),
      },
    }));
  };

  // Update title function
  const handleTitleChange = (newTitle: string) => {
    setProduct((prevPayload) => ({
      ...prevPayload,
      category: {
        ...prevPayload.category,
        title: newTitle,
      },
      lang: {
        ...prevPayload.lang,
        locale: [
          {
            ...prevPayload.lang.locale[0],
            title: newTitle,
          },
        ],
      },
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevPayload) => ({
          ...prevPayload,
          category: {
            ...prevPayload.category,
            image: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const response = await addNewCategory(product);
    if (response.response) {
      if (response?.response?.status === 400) {
        showErrorMsg("Please fill all required fields");
      } else {
        showErrorMsg(response.message);
      }
    } else if (response?.data) {
      showSuccessMsg("Category added successfully");
      navigate("/category");
    } else {
      showErrorMsg("Something went wrong");
    }

    handleClose();
    window.location.reload();
  };

  useEffect(() => {
    async function fetchData() {
      const allCat = await getAllCategories();
      setCategories(allCat);
    }
    fetchData();
  }, []);
  // img
  const { t } = useTranslation();

  return (
    <div>
      <button
        className="product_add add_opt_btn add_cat_opt"
        onClick={handleOpen}
      >
        {t("addOption")}

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
            <h4> {t("addOption")}</h4>
            <div className="cate_img">
              {/* {product.category.image && (
              <img
                src={product.category.image}
                alt="Selected"
                style={{ maxWidth: "100px" }}
              />
            )} */}
              <div className="file-input-container">
                <input
                  type="file"
                  id="imageInput"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
                <label
                  htmlFor="imageInput"
                  className="file-input-container__file-selector-button"
                >
                  {product.category.image ? (
                    <img
                      src={product.category.image}
                      alt="Selected File"
                      className="file-input-container__icon"
                    />
                  ) : (
                    <img
                      src={DummyProduct}
                      alt="Default File"
                      className="file-input-container__icon"
                    />
                  )}
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 5H3C2.46957 5 1.96086 5.21071 1.58579 5.58579C1.21071 5.96086 1 6.46957 1 7V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H12C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16V15"
                      stroke="#1E1E1E"
                      stroke-opacity="0.55"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13 3.00011L16 6.00011M17.385 4.58511C17.7788 4.19126 18.0001 3.65709 18.0001 3.10011C18.0001 2.54312 17.7788 2.00895 17.385 1.61511C16.9912 1.22126 16.457 1 15.9 1C15.343 1 14.8088 1.22126 14.415 1.61511L6 10.0001V13.0001H9L17.385 4.58511Z"
                      stroke="#1E1E1E"
                      stroke-opacity="0.55"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="cateory_add_field">
              <select
                name="languageSelect"
                className="add_language"
                id="languageSelect"
                value={product.lang.locale[0].lang}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="tr">Turkish</option>
              </select>
              <input
                type="text"
                name="titleInput"
                id="titleInput"
                value={product.category.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Category Tilte"
                className="input"
              />
            </div>
            <button className="btn_to_add_list mt-3">Add Language</button>
            <select
              name="parentCategorySelect"
              className="add_language"
              id="parentCategorySelect"
              value={product.category.parent_category}
              onChange={(e) => handleParentCategoryChange(e.target.value)}
            >
              {categories?.map((item) => (
                <option value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
          <button className="saved_product" onClick={handleSave}>
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
}
//  export default
