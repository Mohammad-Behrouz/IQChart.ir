'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode, LineStyle, CandlestickSeries } from 'lightweight-charts';
import { toJalaali } from 'jalaali-js';

const CandleChart = ({ candleData }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const tooltipRef = useRef(null);

  const formatJalaliDate = (time) => {
    // time ممکن است عدد timestamp ثانیه یا رشته ISO باشد
    const date = typeof time === 'number' ? new Date(time * 1000) : new Date(time);
    const { jy, jm, jd } = toJalaali(date);
    return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // ایجاد چارت
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 220,
      layout: {
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#000000',
        fontFamily: 'IranYekan',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => formatJalaliDate(time),
      },
      crosshair: {
        mode: 1,
      },
    });

    // افزودن سری کندل‌استیک (نسخه ۵)
    seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current.applyOptions({
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: '#000000',
          style: LineStyle.Solid,
          labelBackgroundColor: '#000000',
        },
        horzLine: {
          width: 1,
          color: '#000000',
          style: LineStyle.Solid,
          labelBackgroundColor: '#000000',
        },
      },
    });



    // ایجاد تولتیپ
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position: absolute;
      display: none;
      background-color: rgba(0, 15, 81, 0.85);
      color: white;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      direction: rtl;
      font-family: IranYekan;
      z-index: 10;
    `;
    chartContainerRef.current.appendChild(tooltip);
    tooltipRef.current = tooltip;

    // رویداد حرکت موس روی کراس‌هیر
    chartRef.current.subscribeCrosshairMove(param => {
      if (
        !param.time ||
        !param.seriesData ||
        !tooltipRef.current
      ) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const date = new Date(param.time * 1000);
      const { jy, jm, jd } = toJalaali(date);
      const jalaliDate = `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;

      const priceData = param.seriesData.get(seriesRef.current);
      if (!priceData) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      tooltipRef.current.style.display = 'block';
      tooltipRef.current.innerHTML = `
        <div>تاریخ: ${jalaliDate}</div>
        <div>باز: ${priceData.open.toLocaleString('fa-IR')}</div>
        <div>بالا: ${priceData.high.toLocaleString('fa-IR')}</div>
        <div>پایین: ${priceData.low.toLocaleString('fa-IR')}</div>
        <div>بسته: ${priceData.close.toLocaleString('fa-IR')}</div>
      `;

      const chartRect = chartContainerRef.current.getBoundingClientRect();
      const left = param.point.x + 15;
      const top = param.point.y + 15;
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${top}px`;
    });

    // پاکسازی هنگام unmount
    return () => {
      chartRef.current.remove();
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && candleData && candleData.length > 0) {
      const formattedData = candleData
        .map(item => ({
          time: item.time || (typeof item.x === 'string' ? Math.floor(new Date(item.x).getTime() / 1000) : item.x),
          open: item.o,
          high: item.h,
          low: item.l,
          close: item.c,
        }))
        .sort((a, b) => a.time - b.time)
        .filter((item, index, arr) => {
          if (index === 0) return true;
          return item.time > arr[index - 1].time;
        });

      seriesRef.current.setData(formattedData);
    }
  }, [candleData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '95%', height: '90%', position: 'relative' }}
      className="light-wight-chart bourse-light-weight-chart"
    />
  );
};

export default CandleChart;
