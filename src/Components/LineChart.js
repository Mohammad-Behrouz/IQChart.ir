'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { toJalaali } from 'jalaali-js';

const LineChart = ({ data }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const tooltipRef = useRef(null);

    const formatJalaliDate = (isoString) => {
        const date = new Date(isoString);
        const { jy, jm, jd } = toJalaali(date);
        return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;

        chartRef.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 220,
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
                tickMarkFormatter: (time) => formatJalaliDate(time),
            },
            crosshair: {
                mode: 1,
            },
        });

        seriesRef.current = chartRef.current.addSeries(AreaSeries, {
            lineColor: '#000f51',
            lineWidth: 2,
            topColor: 'rgba(0, 15, 81, 0.4)',
            bottomColor: 'rgba(0, 15, 81, 0)',
        });

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.style = `
            position: absolute;
            display: none;
            background-color: rgba(0, 15, 81, 0.85); /* تغییر یافته */
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
            if (
                !param.time ||
                !param.seriesData ||
                !tooltipRef.current
            ) {
                tooltipRef.current.style.display = 'none';
                return;
            }

            const date = new Date(param.time * 1000); // یا بدون ضرب در 1000، بسته به نوع داده
            const { jy, jm, jd } = toJalaali(date);
            const jalaliDate = `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
            const price = param.seriesData.get(seriesRef.current)?.value;

            if (price === undefined) return;

            tooltipRef.current.style.display = 'block';
            tooltipRef.current.innerHTML = `
                <div>تاریخ: ${jalaliDate}</div>
                <div>قیمت: ${price.toLocaleString('fa-IR')}</div>
            `;

            const chartRect = chartContainerRef.current.getBoundingClientRect();
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
            const formattedData = data
                .map(item => ({
                    time: item.time || Math.floor(new Date(item.x).getTime() / 1000),
                    value: item.c,
                }))
                .sort((a, b) => a.time - b.time)
                .filter((item, index, arr) => {
                    if (index === 0) return true;
                    return item.time > arr[index - 1].time;
                });

            seriesRef.current.setData(formattedData);
        }
    }, [data]);

    return (
        <div
            ref={chartContainerRef}
            style={{ width: '95%', height: '90%', position: 'relative' }}
            className="light-wight-chart bourse-light-weight-chart"
        />
    );
};

export default LineChart;
