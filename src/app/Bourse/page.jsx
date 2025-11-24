"use client";



import LineChart from '@/Components/LineChart';
import React, { useEffect, useState } from 'react';
import Nav from "../../Components/Nav";
import "../../style/Bourse.css";
import Link from "next/link";
import LineChartForIndexBourse from '@/Components/LineChartForIndexBourse';



const Page = () => {
  const [bourseInfo, setBourseInfo] = useState([]);
  const [FarabourseInfo, setFaraBourseInfo] = useState([]);
  const [EffectivesBourse, setEffectivesBourse] = useState([])
  const [EffectivesFaraBourse, setEffectivesFaraBourse] = useState([])

  const [BourseDataForChart, setBourseDataForChart] = useState([]);
  const [FaraBourseDataForChart, setFaraBourseDataForChart] = useState([]);


  useEffect(() => {
    const fetchBourseBasics = async () => {
      try {
        const res = await fetch("https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/1");
        const json = await res.json();
        setBourseInfo(json.indexB1 || []);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات بورس:", error);
      }
    };
    const fetchFaraBourseBasics = async () => {
      try {
        const res = await fetch("https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/2");
        const json = await res.json();
        setFaraBourseInfo(json.indexB1 || []);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات بورس:", error);
      }
    };
    const fetchEffectivesBourse = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/Index/GetInstEffect/0/1/7")
      const json = await res.json()
      setEffectivesBourse(json.instEffect)
    }
    const fetchEffectivesFaraBourse = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/Index/GetInstEffect/0/2/7")
      const json = await res.json()
      setEffectivesFaraBourse(json.instEffect)
    }
    const fetchChartData = async () => {
      try {
        const res = await fetch('https://cdn.tsetmc.com/api/Index/GetIndexB1LastDay/32097828799138957');
        const json = await res.json();

        const filteredData = json.indexB1
          .filter(item => item.hEven <= 123000)
          .map(item => {
            const hEvenStr = item.hEven.toString().padStart(6, '0'); // مثلا 083000

            const hour = parseInt(hEvenStr.slice(0, 2));
            const minute = parseInt(hEvenStr.slice(2, 4));

            const totalMinutes = hour * 60 + minute;
            const timestampInSeconds = totalMinutes * 60;

            return {
              x: timestampInSeconds,
              c: item.xDrNivJIdx004
            };
          })
        // .sort((a, b) => a.x - b.x); // مرتب‌سازی صعودی بر اساس زمان
        console.log(filteredData);

        setBourseDataForChart(filteredData);
      } catch (error) {
        console.error('خطا در دریافت داده:', error);
      }
    };
    const fetchFaraBourseData = async () => {
      try {
        const res = await fetch('https://cdn.tsetmc.com/api/Index/GetIndexB1LastDay/43685683301327984');
        const json = await res.json();

        // تبدیل اولیه: محاسبه ثانیه از hEven (HHMMSS)
        const tempMap = new Map(); // برای حذف تکراری‌ها (key = secondsSinceMidnight)

        json.indexB1
          .filter(item => item.hEven <= 123000) // فیلتر زمان (اگه لازمه)
          .forEach(item => {
            const hEvenStr = item.hEven.toString().padStart(6, '0'); // مثال: "083000"
            const hour = Number(hEvenStr.slice(0, 2));
            const minute = Number(hEvenStr.slice(2, 4));
            const second = Number(hEvenStr.slice(4, 6));
            const secondsSinceMidnight = hour * 3600 + minute * 60 + second; // <-- مهم: ثانیه هم اضافه شد

            // مقدار شاخص به عدد تبدیل میشه
            const value = item.xDrNivJIdx004 === null || item.xDrNivJIdx004 === undefined
              ? NaN
              : Number(item.xDrNivJIdx004);

            // اگر نیاز داری آخرین مقدار برای timestamp نگه داشته بشه، اینجا replace کن
            tempMap.set(secondsSinceMidnight, { x: secondsSinceMidnight, c: value, raw: item });
          });

        // ساخت آرایه مرتب و فیلتر NaN
        const filteredData = Array.from(tempMap.values())
          .map(it => ({ x: it.x, c: it.c }))
          .filter(it => !Number.isNaN(it.c))
          .sort((a, b) => a.x - b.x);

        console.log('Fara filteredData sample (first 10):', filteredData.slice(0, 10));
        // چند چک برای دیباگ:
        if (filteredData.length === 0) console.warn('فیلتر شده خالیه!');
        else {
          console.log('first time(seconds):', filteredData[0].x, 'last time:', filteredData[filteredData.length - 1].x);
          const vals = filteredData.map(d => d.c);
          const min = Math.min(...vals);
          const max = Math.max(...vals);
          console.log('value range:', min, max);
        }

        // تبدیل به فرمت چارت (اگر در کامپوننت baseDate ثابت می‌گیرید، همین x رو استفاده کن)
        setFaraBourseDataForChart(filteredData);
      } catch (error) {
        console.error('خطا در دریافت داده:', error);
      }
    };
    



    fetchFaraBourseData()
    fetchChartData()
    fetchBourseBasics();
    fetchFaraBourseBasics()
    fetchEffectivesBourse();
    fetchEffectivesFaraBourse();


    const interval = setInterval(fetchBourseBasics, 20000);

    return () => clearInterval(interval);
  }, []); // ✅ dependency array اضافه شد

  return (
    <section className='bourse-container'>

      <div className='first-row'>
        <div className='bourse-talar-table'>
          <div className='index-bourse-thead'>
            <span>بازار بورس</span>
            <span>میزان</span>
            <span>تغییرات</span>
          </div>
          <table className='indexes-table'>

            <tbody>

              {bourseInfo.map((value, index) => (
                <tr key={index}>
                  <td className='bourse-index-title'>{value.lVal30}</td>
                  <td className='bourse-index-value'>{parseInt(value.xDrNivJIdx004).toLocaleString('fa-IR')}</td>
                  <td className='bourse-index-change' style={{ color: value.indexChange > 0 ? "green" : "red" }}>
                    {value.xVarIdxJRfV}%  ({parseInt(value.indexChange).toLocaleString()})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bourse-talar-table'>
          <div className='index-bourse-thead'>
            <span>موثر در شاخص</span>
            <span>قیمت پایانی</span>
            <span>میزان تاثیر</span>
          </div>
          <table className='Effectives-table indexes-table'>
            <tbody>
              {Array.isArray(EffectivesBourse) && EffectivesBourse.length > 0 ? (
                EffectivesBourse.map((value, index) => (
                  <tr key={index}>
                    <td className='bourse-index-title ' >
                      <Link href={`/Bourse/${value.insCode}`}>
                        {value.instrument?.lVal18AFC || "نام نامشخص"}
                      </Link>
                    </td>
                    <td className='bourse-index-value'>
                      {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                    </td>
                    <td
                      className='bourse-index-change'
                      style={{ color: value.instEffectValue > 0 ? "green" : "red" }}
                    >
                      {value.instEffectValue?.toLocaleString('fa-IR') ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
              )}


            </tbody>
          </table>
        </div>
        <div className='bourse-talar-table'>
          <div id='header-of-bourse-chart-container' style={{ justifyContent: "left" }}>


            <h6> نمودار روزانه شاخص بورس  </h6>

            <button className='common-button light-blue'>نمودار پیشرفته</button>
          </div>
          <div id='container-of-chart'>
            <LineChartForIndexBourse data={BourseDataForChart} />
          </div>

        </div>
      </div>

      <div className='first-row'>
        <div className='bourse-talar-table'>
          <div className='index-bourse-thead'>
            <span>بازار فرابورس</span>
            <span>میزان</span>
            <span>تغییرات</span>
          </div>
          <table className='indexes-table'>
            <tbody>

              {FarabourseInfo.map((value, index) => (
                <tr key={index}>
                  <td className='bourse-index-title'>{value.lVal30}</td>
                  <td className='bourse-index-value'>{parseInt(value.xDrNivJIdx004).toLocaleString('fa-IR')}</td>
                  <td className='bourse-index-change' style={{ color: value.indexChange > 0 ? "green" : "red" }}>
                    {value.xVarIdxJRfV}%  ({parseInt(value.indexChange).toLocaleString()})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bourse-talar-table'>
          <div className='index-bourse-thead'>
            <span>موثر در شاخص</span>
            <span>قیمت پایانی</span>
            <span>میزان تاثیر</span>
          </div>
          <table className='Effectives-table indexes-table'>
            <tbody>
              {Array.isArray(EffectivesFaraBourse) && EffectivesFaraBourse.length > 0 ? (
                EffectivesFaraBourse.map((value, index) => (
                  <tr key={index}>
                    <td className='bourse-index-title ' >
                      <Link href={`/Bourse/${value.insCode}`}>
                        {value.instrument?.lVal18AFC || "نام نامشخص"}
                      </Link>
                    </td>
                    <td className='bourse-index-value'>
                      {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                    </td>
                    <td
                      className='bourse-index-change'
                      style={{ color: value.instEffectValue > 0 ? "green" : "red" }}
                    >
                      {value.instEffectValue?.toLocaleString('fa-IR') ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
              )}


            </tbody>
          </table>
        </div>
        <div className='bourse-talar-table'>
          <div id='header-of-bourse-chart-container' style={{ justifyContent: "left" }}>
            <h6>نمودار روزانه شاخص فرابورس</h6>

            <button className='common-button light-blue'>نمودار پیشرفته</button>
          </div>
          <div id='container-of-chart'>
            <LineChartForIndexBourse data={FaraBourseDataForChart} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Page;
