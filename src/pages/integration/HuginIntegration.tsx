import ProductCardReady from "./ProductCardReady";
import DeviceSetting from "./DeviceSetting";
import { useEffect, useState } from "react";
import { getAllProducts } from "../product/api";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateDepartmentCode } from "./api";

interface FormValues {
  departmentCode: string;
  search: string;
}

const initialFormValues: FormValues = {
  departmentCode: "01",
  search: "",
};
const validationSchema = Yup.object({
  departmentCode: Yup.string().required("Role is required"),
});
const HuginIntegration = () => {

  const [products, setProducts] = useState<any>([]);
  const formik = useFormik<FormValues>({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateDepartmentCode(values)
    },
  });
  const handleChangeDepartmentCode = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    formik.setFieldValue("departmentCode", event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("search", event.target.value);
  };
  useEffect(() => {
    getAllProducts(setProducts);
  }, []);
  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(formik.values.search.toLowerCase())
  );

  return (
    <>
      <div className="hugin_integration">
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">Hugin Integration</h2>
          </div>
          <div className="d-flex">
            <DeviceSetting />
          </div>
        </div>
        <form className="department_code" onSubmit={formik.handleSubmit}>
          <h4>Department Code:</h4>
          <select
            name="departmentCode"
            id="departmentCode"
            onChange={handleChangeDepartmentCode}
            value={formik.values.departmentCode}
            className="category"
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
          </select>

    
          <div className="searchbar hugin_integration_search">
        <span>
        <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M17.4375 15.75H16.5488L16.2338 15.4463C17.3744 14.1233 18.0012 12.4343 18 10.6875C18 9.24123 17.5711 7.82743 16.7676 6.6249C15.9641 5.42236 14.8221 4.4851 13.4859 3.93163C12.1497 3.37817 10.6794 3.23336 9.2609 3.51551C7.84242 3.79767 6.53946 4.49411 5.51678 5.51678C4.49411 6.53946 3.79767 7.84242 3.51551 9.2609C3.23336 10.6794 3.37817 12.1497 3.93163 13.4859C4.4851 14.8221 5.42236 15.9641 6.6249 16.7676C7.82743 17.5711 9.24123 18 10.6875 18C12.4988 18 14.1638 17.3363 15.4463 16.2338L15.75 16.5488V17.4375L21.375 23.0513L23.0513 21.375L17.4375 15.75ZM10.6875 15.75C7.88625 15.75 5.625 13.4888 5.625 10.6875C5.625 7.88625 7.88625 5.625 10.6875 5.625C13.4888 5.625 15.75 7.88625 15.75 10.6875C15.75 13.4888 13.4888 15.75 10.6875 15.75Z"
                  fill="#1E1E1E"
                  fill-opacity="0.55"
                />
              </svg>
        </span>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={formik.values.search}
          onChange={handleSearchChange}
        />
      </div>
          <button className="device_btn" type="submit">
            Save Integration
          </button>
        </form>
      </div>

      <div className="hugin_integration_card">
        {filteredProducts.length === 0 ? (
          <CircularProgress />
        ) : (
          filteredProducts.map((product: any) => (
            <ProductCardReady key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default HuginIntegration;
