import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'; // Import PieArcLabel
import '../asserts/css/panel.css';
import api from '../utils/axios';
import { URLS } from '../utils/constants';
import { useTranslation } from 'react-i18next';

const size = {
  width: 400,
  height: 200,
};

interface PieChartData {
  label: string;
  value: number;
}

export default function PieArcLabel() {
  const { t } = useTranslation();

  const [data, setData] = useState<PieChartData[]>([
    { label: t('lastWeekLabel'), value: 0 },
    { label: t('todayLabel'), value: 0 },
  ]);

  const getData = async () => {
    try {
      const response = await api.get(URLS.dashboard.todayAndLastWeek);
      const lastWeek =
        (response?.data?.data?.availableTables || 0) +
        (response?.data?.data?.busyTables || 0);
      const today = response?.data?.data?.busyTables || 0;
      setData([
        { label:t('lastWeekLabel'), value: lastWeek },
        { label: t('todayLabel'), value: today },
      ]);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PieChart
      colors={['#ff7777', '#0dcaf0']}
      series={[
        {
          // arcLabel: (item: PieChartData) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          innerRadius: 49,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
