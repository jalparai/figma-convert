import "../../asserts/css/product.css";
import { useNavigate } from "react-router-dom";
import Casestable from "../../components/cases-table";
import { useEffect, useState } from "react";
import { getAllCasesByBranchId } from "./api";
import { useTranslation } from 'react-i18next';

const Cases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([])

  const handleButtonClick = () => {
    navigate("/edit-rank");
  };

  useEffect(() => {
    getAllCasesByBranchId("632427b087113b5ddaecac66",0, 10, setCases)
  }, [])
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">  {t('caseList')}</h2>
          </div>
          <div className="d-flex"></div>
        </div>

        <Casestable cases={cases} />
      </div>
    </>
  );
};
export default Cases;
