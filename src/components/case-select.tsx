import { useNavigate, useParams } from "react-router-dom";
import ReceiptList from "./receipt-list";
import { useEffect, useState } from "react";
import { getCaseById } from "../pages/Cases/api";

const convertToCSV = (data: any[]) => {
  const header = Object.keys(data[0]).join(",");
  const csv = data.map((row) => Object.values(row).join(",")).join("\n");

  return `${header}\n${csv}`;
};

const downloadCSV = (data: any[]) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const CaseSelect = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState<any>(null);


  const handleButtonClick = () => {
    navigate("/edit-rank");
  };

  useEffect(() => {
    getCaseById(caseId, setCaseData)
    console.log("caseData: ", caseData)
    return () => {}
  }, [])

  return (
    <>
      <div>
        <div className="import_strip case_select">
          <div>
            <h2 className="title_tag">
              Case Detail (10 Ağustos 2023 12:56 - 15 Eylül 2023 17:40)
            </h2>
          </div>
          <div className="d-flex">
            <ReceiptList />
          </div>
        </div>

        <div className="cards_selected">
          <div className="row">
            <div className="col-md-6">
              <div className="card_text_area">
                <div className="hding">
                  <h3>Total price</h3>
                </div>
                <ul>
                  <li>Total</li>
                  <li>Total</li>
                </ul>
                <ul>
                  <li>Total</li>
                  <li>Total</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card_text_area">
                <div className="hding">
                  <h3>Other Operations</h3>
                </div>
                <ul>
                  <li>Total</li>
                  <li>{caseData?.balance[0].amount} {caseData?.balance[0].currency}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card_text_area">
                <div className="hding">
                  <h3>Payments</h3>
                </div>
                <ul>
                  <li>Total</li>
                  <li>Total</li>
                </ul>
                <ul>
                  <li>Total</li>
                  <li>Total</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card_text_area">
                <div className="hding">
                  <h3>Tick Payments</h3>
                </div>
                <ul>
                  <li>Total</li>
                  <li>Total</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CaseSelect;
