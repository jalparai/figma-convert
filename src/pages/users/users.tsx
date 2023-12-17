import React, { useEffect, useState } from "react";
import "../../asserts/css/product.css";
import { useNavigate } from "react-router-dom";

import Userstable from "../../components/users-table";
import UserAdd from "../../components/user-add-popup";
import { getAllUsers } from "./api";

interface IUser {
  id: string;
  lastName: string;
  createdAt: string;
}

const Users = () => {
  const [data, setData] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/edit-rank");
  };

  const fetchData = () => {
    getAllUsers(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">
              Employee List
            </h2>
          </div>
          <div className="d-flex">
            <UserAdd />
          </div>
        </div>

        <Userstable data={data} />
      </div>
    </>
  );
};
export default Users;
