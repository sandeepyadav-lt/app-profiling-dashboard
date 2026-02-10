import type { ChartOptions } from 'chart.js';

export const baseLineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f2328',
      titleColor: '#ffffff',
      bodyColor: '#d1d9e0',
      titleFont: { family: 'Mona Sans', size: 12, weight: 600 },
      bodyFont: { family: 'Mona Sans', size: 11 },
      padding: { top: 8, bottom: 8, left: 12, right: 12 },
      cornerRadius: 6,
      displayColors: true,
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        font: { family: 'Mona Sans', size: 10 },
        color: '#6e7781',
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
      },
    },
    y: {
      grid: {
        color: '#e8ecf0',
      },
      border: { display: false },
      ticks: {
        font: { family: 'Mona Sans', size: 10 },
        color: '#6e7781',
        padding: 8,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 4,
      hitRadius: 20,
    },
    line: {
      tension: 0.3,
      borderWidth: 2,
    },
  },
};

export const baseBarOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f2328',
      titleColor: '#ffffff',
      bodyColor: '#d1d9e0',
      titleFont: { family: 'Mona Sans', size: 12, weight: 600 },
      bodyFont: { family: 'Mona Sans', size: 11 },
      padding: { top: 8, bottom: 8, left: 12, right: 12 },
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#e8ecf0',
      },
      border: { display: false },
      ticks: {
        font: { family: 'Mona Sans', size: 10 },
        color: '#6e7781',
      },
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        font: { family: 'Mona Sans', size: 11 },
        color: '#1f2328',
        padding: 8,
      },
    },
  },
};
