'use client';

import React, { useEffect, useRef } from 'react';
import { createChart ,AreaSeries } from 'lightweight-charts';

const LineChartForIndexBourse = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const tooltipRef = useRef(null);

  const formatTimeOnly = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 280,
      layout: {
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#000000',
        fontFamily: 'IranSans',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: formatTimeOnly,
      },
      crosshair: {
        mode: 1,
      },
    });

    seriesRef.current = chartRef.current.addSeries(AreaSeries, {
      lineColor: '#260599',
      lineWidth: 2,
      topColor: 'rgba(0, 15, 81, 0.4)',
      bottomColor: 'rgba(0, 15, 81, 0)',
    });

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.style = `
      position: absolute;
      display: none;
      background-color: rgba(0, 15, 81, 0.85);
      color: white;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      direction: rtl;
      font-family: IranSans;
      z-index: 10;
    `;
    chartContainerRef.current.appendChild(tooltip);
    tooltipRef.current = tooltip;

    chartRef.current.subscribeCrosshairMove(param => {
      if (!param.time || !param.seriesData || !tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const price = param.seriesData.get(seriesRef.current)?.value;
      if (price === undefined) return;

      tooltipRef.current.style.display = 'block';
      tooltipRef.current.innerHTML = `
        <div>ساعت: ${formatTimeOnly(param.time)}</div>
        <div>شاخص: ${price.toLocaleString('fa-IR')}</div>
      `;

      const left = param.point.x + 15;
      const top = param.point.y + 15;
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${top}px`;
    });

    return () => {
      chartRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      const baseDate = new Date('2025-06-03'); // تاریخ دیتات رو اینجا تنظیم کن
      baseDate.setHours(0, 0, 0, 0);
      const baseTimestamp = Math.floor(baseDate.getTime() / 1000);

      const formattedData = data
        .map(item => ({
          time: baseTimestamp + item.x,
          value: item.c,
        }))
        .sort((a, b) => a.time - b.time);

      // -- تعیین رنگ بر اساس تغییر آخر - اول --
      // اگر داده‌ها حداقل دو نقطه داشته باشند، تغییر آخرین نسبت به اولین محاسبه می‌شود.
      // منطق: diff < 0 => قرمز، در غیر این صورت => سبز (شامل diff === 0)
      if (formattedData.length >= 2) {
        const firstVal = Number(formattedData[0].value);
        const lastVal = Number(formattedData[formattedData.length - 1].value);
        const diff = lastVal - firstVal;

        const greenLine = '#16a34a';
        const redLine = '#ef4444';

        const lineColor = diff < 0 ? redLine : greenLine;
        const topColor = diff < 0 ? 'rgba(239,68,68,0.15)' : 'rgba(22,163,74,0.15)';
        const bottomColor = diff < 0 ? 'rgba(239,68,68,0.02)' : 'rgba(22,163,74,0.02)';

        // اعمال رنگ‌ها روی سری (بدون تغییر ساختار کلی)
        try {
          seriesRef.current.applyOptions({
            lineColor,
            topColor,
            bottomColor,
          });
        } catch (e) {
          // اگر نسخهٔ لایبرری این متد رو پشتیبانی نکنه، بی‌خطر نادیده گرفته می‌شه
          console.warn('applyOptions failed:', e);
        }
      }

      seriesRef.current.setData(formattedData);
      console.log('Formatted data:', formattedData); // برای چک کردن دیتا
    }
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '95%', height: '70%', position: 'relative' }}
      className="light-wight-chart bourse-light-weight-chart"
    />
  );
};

export default LineChartForIndexBourse;
