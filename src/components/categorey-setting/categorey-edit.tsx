import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";

import "../../asserts/css/product.css";
import "../../asserts/css/delete-popup.css";
import { getCategoryById, updateCategoryById } from "../../pages/categorey/api";
import { getAllCategories } from "../../pages/add-product/api";

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
  id: string;
  title: string;
  isSubCategory: string;
  rank: string;
  image: string;
  createdAt: string;
}
interface FormValues {
  imageFile: File | null;
  category: {
    title: string;
    parent_category: string;
  };
  lang: {
    locale: any[];
  };
}
const CategoryEdit: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState<any>();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [formValues, setFormValues] = React.useState<FormValues>({
    imageFile: null,
    category: {
      title: "",
      parent_category: "",
    },
    lang: {
      locale: [],
    },
  });

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: async (values) => {
      console.log("values", values);
      await updateCategoryById(categoryId, values);
      handleClose();
    },
    enableReinitialize: true,
  });
  // const fetchCategories = async () => {
  //   const allCategories = await getAllCategories();
  //   setData(allCategories)
  // };
  // const fetchCategory = async (catId: string) => {
  //   const responseData = await getCategoryById(catId);
  //   console.log("responseData", responseData);
  //   setData(responseData);
  //   formik.setValues({
  //     ...formik.values,
  //     category: responseData,
  //     lang: { locale: [{ title: responseData.title, lang: "en" }] },
  //   });
  // };

  // const handleAddLanguage = async () => {
  //   setFormValues((prevValues: any) => ({
  //     ...prevValues,
  //     lang: {
  //       ...prevValues.lang,
  //       locale: [...prevValues.lang.locale, { title: "", lang: "en" }],
  //     },
  //   }));
  //   formik.setFieldValue("lang.locale[-1].title", "");
  // };
  React.useEffect(() => {
    const fetchData = async () => {
      const category = await getCategoryById(categoryId);
      const allCategories = await getAllCategories();
      setData(category);
      // setFormValues({
      //   category,
      //   lang: { locale: [{ title: category.title, lang: "en" }] },
      // });
      // formik.setValues({
      //   ...formik.values,
      //   category: category,
      //   lang: { locale: [{ title: category.title, lang: 'en' }] },
      // });
      setCategories(allCategories);
    };
    fetchData();
  }, []);

  const handleAddLanguage = () => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      lang: {
        ...prevValues.lang,
        locale: [...prevValues.lang.locale, { title: "", lang: "en" }],
      },
    }));
    // Focus on the newly added language input
    // const lastInput = document.querySelector(
    //   `[name="lang.locale[${formik.values.lang.locale.length - 1}].title"]`
    // );
    // if (lastInput) {
    //   lastInput?.focus();
    // }
  };

  return (
    <div>
      <button className="product_add add_opt_btn" onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 5L19 8M20.385 6.585C20.7788 6.19115 21.0001 5.65698 21.0001 5.1C21.0001 4.54302 20.7788 4.00885 20.385 3.615C19.9912 3.22115 19.457 2.99989 18.9 2.99989C18.343 2.99989 17.8088 3.22115 17.415 3.615L9 12V15H12L20.385 6.585Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <form onSubmit={formik.handleSubmit}>
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
              <h4>Edit Category</h4>
              <div className="cate_img category_edit_input">
                {formik.values?.imageFile ? (
                  <img
                    src={URL.createObjectURL(formik.values?.imageFile)}
                    alt="Preview"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : (
                  <img
                    src={data?.image}
                    alt="Selected"
                    style={{ maxWidth: "100px" }}
                  />
                )}{" "}
                <input
                  type="file"
                  id="image"
                  name="category.image"
                 
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      formik.setFieldValue(
                        "imageFile",
                        event.currentTarget.files[0]
                      );
                      formik.setFieldValue(
                        "category.image",
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                />{" "}
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
              </div>
              <div className="cateory_add_field">
                <select name="language" id="language" className="add_language">
                  <option value="en">English</option>
                  <option value="tr">Turkish</option>
                </select>
                <input
                  type="text"
                  id="title"
                  name="category.title"
                  onChange={formik.handleChange}
                  value={formik.values?.category?.title}
                  placeholder="category Tilte"
                  className="input"
                />
              </div>
              {formValues.lang?.locale.length > 1 &&
                formik.values.lang.locale.map((lang: any, index: number) => (
                  <div className="cateory_add_field">
                    <select
                      name="language"
                      id="language"
                      className="add_language"
                    >
                      <option value="en">English</option>
                      <option value="tr">Turkish</option>
                    </select>
                    <input
                      type="text"
                      id={`category[${index + 1}].title`}
                      name={`category[${index + 1}].title`}
                      onChange={formik.handleChange}
                      value={formik.values?.lang.locale[index + 1]?.title}
                      placeholder="Category Tilte"
                      className="input"
                    />
                  </div>
                ))}

              <button
                className="btn_to_add_list mt-3"
                type="button"
                onClick={handleAddLanguage}
              >
                Add Language
              </button>
              <select
                name="category.parent_category"
                id="categories"
                value={formik.values?.category?.parent_category}
                className="add_language"
                onChange={formik.handleChange}
              >
                {categories.map((cat: Category) => (
                  <option value={cat?.id}>{cat?.title}</option>
                ))}
              </select>
            </div>
            <button className="saved_product" type="submit">
              Save
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryEdit;

// const x = {
//   category: {
//     _id: "656bb631f07b5a2b78e68316",
//     is_sub_category: true,
//     title: "Green",
//     image:
//       "https://api.digigarson.org/Images/632427b087113b5ddaecac66/category/656bb631f07b5a2b78e68316.png",
//     parent_category: "64ea0e244d2b970a977ad432",
//     branch: "632427b087113b5ddaecac66",
//     rank: 14,
//     createdAt: "2023-12-02T22:56:49.237Z",
//     updatedAt: "2023-12-15T07:41:05.748Z",
//     slug: "green",
//   },
//   lang: {
//     _id: "656bb631f07b5a2b78e6831b",
//     locale: [
//       {
//         lang: "en",
//         _id: "656bb631f07b5a2b78e6831c",
//         title: "Green",
//         items: [],
//       },
//     ],
//     type: 2,
//     itemId: "656bb631f07b5a2b78e68316",
//   },
// };
