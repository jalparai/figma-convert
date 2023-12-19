import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Rings from "../../asserts/imgs/rings.png";
import PieArcLabel from "../../components/pie-graph";
import MarkOptimization from "../../components/daily-income-graph";
import api from "../../utils/axios";
import { URLS } from "../../utils/constants";
import { getLocalStorageItem } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { DailyExpense } from "../../components/daily-expanse-graph";
import { ProfileState } from "../../stores/profile/state";
import { useProfileStore } from "../../stores";
import { getProfileData } from "./api";
import { useTranslation } from 'react-i18next';

interface CategoryData {
  title: string;
  sale: number;
  percentage: number;
}

const Panel: React.FC = () => {
  const navigate = useNavigate();
  const setProfile = useProfileStore((state: ProfileState) => state.setProfile);

  const [dailyIncome, setDailyIncome] = useState<number>(0);
  const [paidReceipt, setPaidReceipt] = useState<number>(0);
  const [cancelProducts, setCancelProducts] = useState<number>(0);
  const [dailyOpen, setDailyOpen] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  const checkUserStatus = () => {
    const token = getLocalStorageItem("token");
    if (token === null || token === "") {
      navigate("/");
    }
  };

  const getProfile = async () => {
    const data = await getProfileData();
    setProfile(data)
  };

  const getCardsData = async () => {
    try {
      const response = await api.get(URLS.dashboard.cards);
      const data = response.data?.data;
      setDailyIncome(0);
      setPaidReceipt(0);
      setCancelProducts(data?.cancelledOrders || 0);
      setDailyOpen(data?.unpaidChecks || 0);
    } catch (err) {}
  };

  const getCategoryData = async () => {
    try {
      const response = await api.get<any[]>(URLS.dashboard.category);
      const data = response.data[0]?.reports.map((ele: any) => ({
        title: ele.categoryTitle,
        sale: ele.saleCount,
        percentage: parseFloat(ele.salePercent).toFixed(2),
      }));
      setCategoryData(data);
    } catch (err) {}
  };

  useEffect(() => {
    checkUserStatus();
    getProfile();
    getCardsData();
    getCategoryData();
  }, []);
  const { t } = useTranslation();
  return (
    <div className="panel">
      <Row>
        <Col md={12} lg={4} className="p-1">
          <div className=" card_ card_one">
          
            <h6>{t('dailyIncomeTitle')}</h6>
                        <h2>{dailyIncome} {t('total')}</h2>

            <img src={Rings} alt="" />
          </div>
        </Col>
        <Col md={12} lg={4} className="p-1">
          <div className=" card_ card_two">
          <h6>{t('dailyPaidReceiptTitle')}</h6>
            <h2>{paidReceipt} {t('total')}</h2>
            <img src={Rings} alt="" />
          </div>
        </Col>
        <Col md={12} lg={4} className="p-1">
          <div className=" card_ card_three">
          <h6>{t('cancelledProductsTitle')}</h6>
         <h2>{cancelProducts} {t('total')}</h2>
            
            <img src={Rings} alt="" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={4} className="p-1">
          <div className=" card_ card_four">
          <h6>{t('dailyOpenOrderTitle')}</h6>
          <h2>{dailyOpen} {t('total')}</h2>

            <img src={Rings} alt="" />
          </div>
        </Col>
        <Col md={12} lg={8} className="p-1">
          <div className=" card_  last_week">
            <div className="flex_circle">
              <div>
                <div className="last_week_txt">
                  <h2>{t('lastWeekTitle')}</h2>
                  <p>
                  {t('lastWeekDescription')}    
                  </p>
                  <div>
                    <PieArcLabel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="hr_line"></div>
      <Row className="mt-3">
        <Col md={12} lg={6} className="">
          <div className="list_sec">
            <h3>{t('categorySalesRatesTitle')}</h3>
            <div className="table">
              <div className="table_hd">
              <span>{t('category')}</span>
               <span>{t('total')}</span>
              </div>
              <div className="table_listing">
                {categoryData.map((ele, index) => (
                  <div className="d-flex" key={index}>
                    <span>{ele.title}</span>
                    <span>{`${ele.sale} / ${ele.percentage} %`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col md={12} lg={6} className="">
          <div className="list_sec list_2">
              <h3>{t('bestSellingProductTitle')}</h3>

            <div className="table">
              <div className="table_hd2">
                <span>Not yet</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12} lg={6} className="">
          <div className="list_sec">
          <h2>{t('dailyIncomeSectionTitle')}</h2>
            <MarkOptimization />
          </div>
        </Col>
        <Col md={12} lg={6} className="">
          <div className="list_sec daily_expan">
          <h2 className='expanse'>{t('dailyExpensesSectionTitle')}</h2>
                      <DailyExpense />
            {/* <MarkOptimization /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Panel;
