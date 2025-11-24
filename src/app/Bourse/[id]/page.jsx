'use client';

import CandleChart from '@/Components/CandleChart';
import LineChart from '@/Components/LineChart';
import { Long_Cang } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import "../../../style/Bourse.css"
import Nav from '@/Components/Nav';
import dynamic from "next/dynamic";
import Modal from 'react-modal';



export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState();
  const [bestLimits, setBestLimits] = useState();
  const [power, setPower] = useState();
  const { id } = React.use(params);
  const [BuyPower, setBuyPower] = useState(50);
  const [SellPower, setSellPower] = useState(50);
  const [codal, setCodal] = useState([])
  const [priceHistory, setPriceHistory] = useState([])
  const [candleData, setCandleData] = useState([]);
  const [showChart, setShowChart] = useState('line');
  const [addAnalysis, setAddAnalisys] = useState(false)
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);  // فقط وقتی روی کلاینت هستیم این مقدار true می‌شود
    if (typeof window !== 'undefined') {
      // Modal.setAppElement('#__next');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stocks');
      const json = await res.json();
      const stock = json.find(item => item.insCode === id);
      setData(stock);
    };
    const fetchInfo = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/Instrument/GetInstrumentInfo/" + id)
      const json = await res.json()
      setInfo(json)
    }
    const fetchBestLimits = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/BestLimits/" + id)
      const json = await res.json()
      setBestLimits(json.bestLimits);

    }
    const fetchPower = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/ClientType/GetClientType/" + id + "/1/0")
      const json = await res.json()
      setPower(json.clientType)
    }
    const fetchCodal = async () => {
      const res = await fetch("https://cdn.tsetmc.com/api/Codal/GetPreparedDataByInsCode/5/" + id)
      const json = await res.json()
      setCodal(json.preparedData)
    }
    fetchData();
    fetchInfo();
    fetchBestLimits();
    fetchPower();
    fetchCodal()


    console.log(codal);

    const interval = setInterval(fetchData, 5000);
    const intervalBestLimits = setInterval(fetchBestLimits, 1000);
    const intervalPower = setInterval(fetchPower, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(intervalBestLimits);
      clearInterval(intervalPower);
    }
  }, [id]);
  useEffect(() => {
    if (power) {
      const buyP = power.buy_I_Volume / power.buy_CountI;
      const sellP = power.sell_I_Volume / power.sell_CountI;
      const sum = buyP + sellP;

      setBuyPower((buyP / sum) * 100)
      setSellPower((sellP / sum) * 100)


    }
  }, [power]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const res = await fetch(
          "https://cdn.tsetmc.com/api/ClosingPrice/GetClosingPriceDailyList/" + id + "/150"
        );
        const json = await res.json();
        setPriceHistory(json.closingPriceDaily || []);
      } catch (error) {
        console.error("Error fetching price history:", error);
      }
    };

    fetchPriceHistory();
  }, [id]);

  useEffect(() => {
    if (priceHistory.length === 0) return;

    const transformed = priceHistory
      .map((item) => ({
        x: `${item.dEven.toString().slice(0, 4)}-${item.dEven
          .toString()
          .slice(4, 6)}-${item.dEven.toString().slice(6, 8)}`,
        o: item.priceFirst,
        h: item.priceMax,
        l: item.priceMin,
        c: item.pClosing,
      }))
      .filter(item => item.o !== 0 && item.h !== 0 && item.l !== 0) // فیلتر کردن مقادیر نامعتبر
      .map(item => ({
        ...item,
        time: Math.floor(new Date(item.x).getTime() / 1000),
      }))
      .sort((a, b) => a.time - b.time);

    setCandleData(transformed);
  }, [priceHistory]);

  useEffect(() => {
    console.log("Candle Data:", candleData);
  }, [candleData]);


  const openAddingAnalisys = () => {
    setAddAnalisys(true)
  }
  const closeAddingAnalisys = () => {
    setAddAnalisys(false)
  }


  if (!isClient) {
    // تا زمانی که روی سرور هستیم هیچ چیز رندر نشود تا خطا نگیریم
    return null;
  }

  if (!data) return <div>در حال بارگذاری...</div>;

  return (
    <div className='saham-container'>
      <div className='saham-div-container' >
        {/* سطر اول */}
        <div className='saham-info-1st-row'>
          {/* اطلاعات اولیه */}
          <div className='saham-primary-info bourse-containers'>
            <table style={{ width: "100%", borderCollapse: "collapse", }}>
              <thead>
                <tr>
                  <th style={{ width: "70%" }}></th>
                  <th style={{ width: "30%" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.lVal18AFC}</td>
                  <td>: نام سهام</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "IranSans", fontWeight: 'bold' }}>
                    <span style={{ color: data.percent > 0 ? "green" : "red" }}>
                      {data.percent}%
                    </span>
                    &nbsp;{data.pDrCotVal.toLocaleString('en-US')}
                  </td>
                  <td>: آخرین معامله</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "IranSans", fontWeight: 'bold' }}>
                    <span style={{ color: data.priceChangePercent > 0 ? "green" : "red" }}>
                      {data.priceChangePercent}%
                    </span>
                    &nbsp;{data.pClosing.toLocaleString('en-US')}
                  </td>
                  <td>: قیمت پایانی</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '15px' }}>{info.instrumentInfo.cgrValCotTitle}</td>
                  <td>: بازار سهام</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '15px' }}>{info.instrumentInfo.lVal30}</td>
                  <td>: نام شرکت</td>
                </tr><tr>
                  <td style={{ fontSize: '15px' }}>{info.instrumentInfo.sector.lSecVal}</td>
                  <td>: گروه سهم</td>
                </tr>
              </tbody>
            </table>

          </div>
          {/* بست لیمیت ها */}
          <div className='saham-best-limits bourse-containers'>
            <h5>جدول معاملات</h5>
            <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%", justifyContent: "center" }} className='order-table-container'>
              {/* جدول خرید */}
              <table className="buy-order">
                <tbody>
                  <tr className='texts-for-bestLimits'>
                    <td className="saham-price-show">قیمت</td>
                    <td className="saham-amount-show">حجم خرید</td>
                    <td className="saham-count-show">تعداد</td>
                  </tr>
                  {bestLimits.map((item, index) => (
                    <tr className='buy-v-c-tr' key={`buy-${index}`}>
                      <td className="saham-price-show">{item.pMeDem.toLocaleString('en-US')}</td>
                      <td className="saham-amount-show">{item.qTitMeDem.toLocaleString()}</td>
                      <td className="saham-count-show">{item.zOrdMeDem.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* جدول فروش */}
              <table className="sell-order">

                <tbody>
                  <tr className='texts-for-bestLimits' >
                    <td className="saham-count-show">تعداد</td>
                    <td className="saham-amount-show">حجم فروش</td>
                    <td className="saham-price-show">قیمت</td>
                  </tr>
                  {bestLimits.map((item, index) => (
                    <tr className='sell-v-c-tr' key={`sell-${index}`}>
                      <td className="saham-price-show">{item.zOrdMeOf.toLocaleString('en-US')}</td>
                      <td className="saham-amount-show">{item.qTitMeOf.toLocaleString()}</td>
                      <td className="saham-count-show">{item.pMeOf.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
          {/* حجم و تعداد معاملات */}
          <div className='bourse-containers' style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ marginBottom: "10px" }}>عرضه و تقاضا</h5>
            {/* جدول عرضه و تقاضا */}
            <div className='power-bourse-container-div' style={{ display: "flex", direction: "rtl", gap: "15px", width: "100%", marginLeft: "22px" }}>
              {/* ستون اول */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <br />
                <span style={{ width: "70px", textAlign: "left" }}>حقیقی</span>
                <span style={{ width: "70px", textAlign: "left" }}>حقوقی</span>
                <span style={{ width: "70px", textAlign: "left" }}>مجموع</span>
              </div>
              {/* ستون خرید */}
              <div style={{ display: "flex", flexDirection: "column", width: "37%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <span style={{ width: "80%", textAlign: "center", fontWeight: "bold" }}>حجم خرید</span>
                  <span style={{ fontWeight: "bold" }}>تعداد</span>
                </div>
                <div style={{ backgroundColor: "#8ddfc4", height: "100px", borderRadius: "5px", display: "flex", paddingTop: "7px" }}>
                  <div style={{ width: "75%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.buy_I_Volume?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.buy_N_Volume?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power ? (power.buy_I_Volume + power.buy_N_Volume).toLocaleString() : '-'}</span>

                  </div>
                  <div style={{ width: "25%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.buy_CountI?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.buy_CountN?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power ? (power.buy_CountI + power.buy_CountN).toLocaleString() : '-'}</span>

                  </div>
                </div>
              </div>
              {/* ستون فروش */}
              <div style={{ display: "flex", flexDirection: "column", width: "37%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <span style={{ width: "80%", textAlign: "center", fontWeight: "bold" }}>حجم خرید</span>
                  <span style={{ fontWeight: "bold" }}>تعداد</span>
                </div>
                <div style={{ backgroundColor: "#eda8a5", height: "100px", borderRadius: "5px", display: "flex", paddingTop: "7px" }}>
                  <div style={{ width: "75%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.sell_I_Volume?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.sell_N_Volume?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power ? (power.sell_N_Volume + power.sell_I_Volume).toLocaleString() : '-'}</span>

                  </div>
                  <div style={{ width: "25%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.sell_CountI?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power?.sell_CountN?.toLocaleString() || '-'}</span>
                    <span style={{ textAlign: "center", fontFamily: "IranSans" }}>{power ? (power.sell_CountN + power.sell_CountI).toLocaleString() : '-'}</span>

                  </div>
                </div>
              </div>
            </div>
            {/* قدرت خرید و فروش */}
            <h5 style={{ marginTop: "10px" }}>قدرت خرید و فروش</h5>
            <div id='powe-show-div-bourse'>
              <span>قدرت فروشنده</span>

              <span>قدرت خریدار</span>
            </div>
            <div id='power-show-div'>
              <div style={{ width: SellPower.toString() + "%", backgroundColor: "#eda8a5" }}>
                <span className='sells-color'>{parseInt(SellPower)}%</span>
              </div>
              <div style={{ width: BuyPower.toString() + "%", justifyContent: "end", backgroundColor: "#8ddfc4" }}>
                <span className='buys-color' >{parseInt(BuyPower)}%</span>
              </div>
            </div>


          </div>
        </div>
        {/* سطر دوم */}
        <div id='saham-info-2nd-row'>
          {/* کدال */}
          <div id='codal-container'>
            <div id='codal-container-header'>
              <a href='#'>...بیشتر</a>
              <h5>آخرین اخبار کدال</h5>
            </div>
            <div id='codal-bourse-thead'>
              <span>تاریخ</span>
              <span>موضوع</span>
              <span>مستندات</span>
            </div>
            <table id='codal-table-body'>
              <tbody>

                {codal.map((item, index) => {
                  const href = "https://cdn.tsetmc.com/api/Codal/GetContentFileByTracingNo/" + item.tracingNo + "/1";
                  return (
                    <tr className='codal-Bourse-tr' key={`sell-${index}`}>
                      <td className="codal-Bourse-td-data">{item.publishDateTime_DEven}</td>
                      <td className="codal-Bourse-td-title">{item.title}</td>
                      <td className="saham-count-show">
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          <i className="fa-solid fa-file-pdf"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
          {/* نمودار */}
          <div id='bourse-chart-container'>
            <div id='header-of-bourse-chart-container'>
              {/* باتن ها */}
              <div>

                <button onClick={() => setShowChart('line')} style={showChart === "candle" ? { backgroundColor: "white" } : { backgroundColor: "#000f51" }}><i style={showChart === "candle" ? { color: "#000f51" } : { color: "white" }} className="fa-solid fa-chart-line"></i></button>
                <button
                  onClick={() => setShowChart('candle')}
                  style={showChart === "candle" ? { backgroundColor: "#000f51" } : { backgroundColor: "white" }}
                >
                  <img
                    src={showChart === "line" ? "/svg/candle-blue.svg" : "/svg/candle-white.svg"}
                    alt="Candle Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>

              <h5>نمودار سه ماهه سهم</h5>

              <button className='common-button'>نمودار پیشرفته</button>
            </div>
            <div id='container-of-chart'>
              {showChart == "line" ? <LineChart data={candleData} /> : <CandleChart candleData={candleData} />}
            </div>


          </div>

        </div>
      </div>

      {/* <Modal
        isOpen={addAnalysis}
        onRequestClose={closeAddingAnalisys}
        contentLabel="مثال مودال"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>سلام 👋</h2>
        <p>این یک مودال ساده است.</p>
        <button onClick={closeAddingAnalisys}>بستن</button>
      </Modal> */}
    </div>
  );
}
