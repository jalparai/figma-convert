import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../asserts/css/product.css";
import "../asserts/css/delete-popup.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewUser } from "../pages/users/api";

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

interface Permission {
  id: number;
  label: string;
}

interface Permissions {
  [key: string]: Permission[];
}

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  permissions: number[];
}

let permissions: Permissions = {
  waiter: [
    { id: 401, label: "create-order" },
    { id: 402, label: "add-product-to-order" },
    { id: 403, label: "update-order" },
    { id: 404, label: "delete-order" },
    { id: 405, label: "transfer-table" },
  ],
  pos: [
    { id: 501, label: "create-order" },
    { id: 502, label: "add-product-to-order" },
    { id: 503, label: "delete-product-from-order" },
    { id: 504, label: "delete-order" },
    { id: 505, label: "apply-discount" },
    { id: 506, label: "create-cover" },
    { id: 507, label: "take-payment" },
    { id: 508, label: "transfer-table" },
    { id: 509, label: "create-expense" },
    { id: 510, label: "close-table" },
    { id: 511, label: "close-case" },
    { id: 512, label: "x-report" },
    { id: 513, label: "move-product" },
    { id: 514, label: "create-catering" },
    { id: 515, label: "tick-operations" },
    { id: 516, label: "analysis-perm" },
    { id: 517, label: "manager-perm" },
    { id: 518, label: "check-perm" },
    { id: 519, label: "custom-table-perm" },
    { id: 520, label: "update-order" },
    { id: 521, label: "update-currencies" },
  ],
  accounting: [],
  courier: [],
  kitchen: [],
  "": [],
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.string().required("Role is required"),
});

const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
  role: "pos",
  permissions: [],
};

export default function UserAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik<FormValues>({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const res = await addNewUser({
        name: values.firstName,
        lastname: values.lastName,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        role: values.role,
        permissions: values.permissions,
      });
      console.log(res);
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          password: "",
          passwordConfirmation: "",
          role: "",
          permissions: [],
        },
      });
      handleClose();
      
      // window.location.reload()
    },
  });

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("role", event.target.value);
  };

  const handleCheckboxChange = (permissionId: number, checked: boolean) => {
    const { permissions } = formik.values;
    const updatedPermissions = checked
      ? [...permissions, permissionId]
      : permissions.filter((id: any) => id !== permissionId);

    formik.setFieldValue("permissions", updatedPermissions);
  };

  const renderCheckboxes = (start: number, end: number) => (
    <div>
      {permissions[formik.values.role].slice(start, end).map((permission) => (
        <div key={permission.id}>
          <label>
            <input
              type="checkbox"
              name={`permissions.${formik.values.role}.${permission.id}`}
              checked={formik.values.permissions.includes(permission.id)}
              onChange={(e) =>
                handleCheckboxChange(permission.id, e.target.checked)
              }
            />{" "}
            {permission.label
              .replace(/-([a-z])/g, (_, match) => ` ${match.toUpperCase()}`)
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <button
        className="product_add add_opt_btn add_cat_opt"
        onClick={handleOpen}
      >
        Add Employee
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
        <Box sx={style} className="user_add_popup">
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
          <div className="">
            <h4>User Add</h4>

            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="First name"
                    name="firstName"
                    id="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div>{formik.errors.firstName}</div>
                  )}
                </Col>

                <Col>
                  <Form.Control
                    placeholder="Last name"
                    name="lastName"
                    id="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div>{formik.errors.lastName}</div>
                  )}
                </Col>
              </Row>
              <select
                name="role"
                id="role"
                onChange={handleChangeRole}
                value={formik.values.role}
                className="add_language"
              >
                <option value="">Role</option>
                <option value="pos">POS User</option>
                <option value="waiter">Waiter</option>
                <option value="kitchen">Kitchen</option>
                <option value="accounting">Accounting</option>
                <option value="courier">Courier</option>
              </select>
              <br />
              {formik.touched.role && formik.errors.role && (
                <div>{formik.errors.role}</div>
              )}
              <Row>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                  />
                  {formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation && (
                      <div>{formik.errors.passwordConfirmation}</div>
                    )}
                </Col>
              </Row>
              <div>
                <h3>Permission</h3>
                <div className="radio_btn">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      {renderCheckboxes(
                        0,
                        Math.ceil(permissions[formik.values.role].length / 2)
                      )}
                    </div>
                    <div>
                      {renderCheckboxes(
                        Math.ceil(permissions[formik.values.role].length / 2),
                        permissions[formik.values.role].length
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="saved_product" type="submit">
                Save
              </button>
            </Form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
