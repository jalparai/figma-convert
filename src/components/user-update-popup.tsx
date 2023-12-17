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
import { addNewUser, getUserById, updateUserById } from "../pages/users/api";

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
  role: "pos", // Default role
  permissions: [],
};

export default function UserUpdate({ userId }: any) {
  const [user, setUser] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik<FormValues>({
    initialValues: initialFormValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const res = await updateUserById(userId, {
        ...user,
        name: values.firstName,
        lastname: values.lastName,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        role: values.role,
        permissions: values.permissions,
      });
      console.log(res);
      handleClose()
    },
  });

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("role", event.target.value);
  };

  const handleCheckboxChange = (permissionId: number, checked: boolean) => {
    const { permissions } = formik.values;
    const updatedPermissions = checked
      ? [...permissions, permissionId]
      : permissions.filter((id) => id !== permissionId);

    formik.setFieldValue("permissions", updatedPermissions);
  };

  const renderCheckboxes = (start: number, end: number) => (
    <div>
      {permissions[formik.values.role]?.slice(start, end).map((permission) => (
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);

        formik.setValues({
          firstName: userData.name,
          lastName: userData.lastname,
          password: userData.password,
          passwordConfirmation: userData.password,
          role: userData.role,
          permissions: userData.permissions || [],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [userId]);

  return (
    <div>
      <button
        className="list_btn_edit_dlt edit opt_edit_btn"
        onClick={handleOpen}
      >
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
            <h4>Update User</h4>

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
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Last name"
                    name="lastName"
                    id="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
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
                        Math.ceil(permissions[formik.values?.role]?.length / 2)
                      )}
                    </div>
                    <div>
                      {renderCheckboxes(
                        Math.ceil(permissions[formik.values?.role]?.length / 2),
                        permissions[formik.values?.role]?.length
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
