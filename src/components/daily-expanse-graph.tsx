import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/plots';
import api from '../utils/axios';
import { URLS } from '../utils/constants';

interface ExpenseData {
  expense_amount: number;
 }
interface ChartConfig {
  percent: number;
  outline: {
    border: number;
    distance: number;
  };
  wave: {
    length: number;
  };
}

export const DailyExpense: React.FC = () => {
  const [expense, setExpense] = useState<number>(0);

  const getData = async () => {
    try {
      const response = await api.get<ExpenseData>(URLS.dashboard.expense);
      setExpense(response.data.expense_amount);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const config: ChartConfig = {
    percent: expense / 100,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };

  return <Liquid {...config} />;
};
