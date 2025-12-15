"use client";


import { useEffect, useState } from "react";
import WaveSvg from "@/Components/waveUp";
import Link from "next/link";
import Nav from '@/Components/Nav'
import { Love_Light } from "next/font/google";
import SpotlightCard from "@/Components/SpotlightCard";
import CardSwap, { Card } from "@/Components/CardSwap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../style/article.css";
import Foooter from '@/Components/Foooter';
import { api_token_sourceArena } from '@/JavaScript/defaultFuncs';

export default function Home() {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goldPrices, setGoldPrices] = useState([])
  const [bourseIndex, setBourseIndex] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const fetchData = () => {
    fetch(api_token_sourceArena() + "crypto_v2=all")
      .then((res) => res.json())
      .then((json) => {
        const allCrypto = json.data || [];
        const targetSymbols = ["BTC", "ETH", "DOGE", "ADA", "TRX"];
        const targetNames = ["Bitcoin", "Ethereum", "Dogecoin", "Cardano", "TRON"];

        const filtered = allCrypto.filter(crypto =>
          targetSymbols.includes(crypto.symbol) || targetNames.includes(crypto.name)
        );

        const sortedCrypto = [];
        const symbolOrder = ["BTC", "ETH", "DOGE", "ADA", "TRX"];

        for (const symbol of symbolOrder) {
          const matched = filtered.find(c => c.symbol === symbol);
          if (matched) {
            sortedCrypto.push({
              id: matched.symbol.toLowerCase(),
              name: matched.name,
              symbol: matched.symbol,
              current_price: parseFloat(matched.price) || 0,
              price_change_percentage_24h: parseFloat(matched.change_percent_24h) || 0,
              market_cap: parseFloat(matched.market_cap) || 0
            });
          }
        }

        setCryptoPrices(sortedCrypto);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchGoldData = async () => {
    try {
      const res = await fetch(api_token_sourceArena() + "&currency");
      const json = await res.json();
      const goldSlugs = ["SEKE_EMAMI", "SEKE_BAHAR", "SEKE_ROB", "SEKE_NIM", "TALA_18"];
      const filtered = json.data.filter(gold => goldSlugs.includes(gold.slug));
      const sortedGold = [];
      for (const slug of goldSlugs) {
        const matched = filtered.find(g => g.slug === slug);
        if (matched) {
          sortedGold.push(matched);
        }
      }
      setGoldPrices(sortedGold);
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    fetchData();
    fetchGoldData();
    const interval = setInterval(() => {
      fetchData();
      fetchGoldData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const res = await fetch("https://localhost:7282/api/article/all", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setArticles(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setArticlesLoading(false);
      }
    };
    fetchArticles();
  }, []);
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  function namesInFarsi(name) {
    if (name === "Bitcoin")
      return (
        <>
          <img src="/Images/Home/bitcoin.png" alt="" />
          (BTC) بیت کوین
        </>
      );
    if (name === "Ethereum")
      return (
        <>
          <img src="/Images/Home/ethereum.png" alt="" />
          (ETH) اتریوم
        </>
      );
    if (name === "Dogecoin")
      return (
        <>
          <img src="/Images/Home/doge.png" alt="" />
          (Doge) دوج کوین
        </>
      );
    if (name === "Cardano")
      return (
        <>
          <img src="/Images/Home/ada.png" alt="" />
          (ADA) کاردانو
        </>
      );
    if (name === "TRON")
      return (
        <>
          <img src="/Images/Home/trx.png" alt="" />
          (TRX) ترون
        </>
      );
    return name;
  }

  function goldNamesInFarsi(slug) {
    if (slug === "SEKE_EMAMI") return "سکه امامی";
    if (slug === "SEKE_BAHAR") return "سکه بهار آزادی";
    if (slug === "SEKE_ROB") return "ربع سکه";
    if (slug === "SEKE_NIM") return "نیم سکه";
    if (slug === "TALA_18") return "طلای 18 عیار";
    return slug;
  }

  return (
    <>
      <div className="section_1 flex flex-col-reverse md:flex-row! gap-4">
        <img src="/Images/candleChart.png" className="w-full" alt="candle chart" />
        <div className="section_content">
          <h1>به فایننشال سیتی خوش آمدید</h1>
          <p>
            رمز ارزها رو دنبال کن و بهترین تصمیم‌ها رو بگیر ! <br />
            روی شروع کلیک کن و اشتراک رایگان بگیر !
          </p>
          <div className="flex  gap-1">
            <Link href="/login" className="box-shadow">شروع کنید</Link>
            <Link href="/Chart" className="box-shadow">نمودار ها</Link>
          </div>
        </div>
      </div>
      <WaveSvg />
      <h2 className="title_mainPage">دورنمای بازار های جهانی</h2>

      <section className="section_2">
        <div className=" flex flex-col! md:flex-row! gap-4 price-table-container">
          <div className="table right-table">

            <table className="table crypto-table w-full h-full">
              <thead>
                <tr>
                  <th>قیمت ارزدیجیتال</th>
                  <th>قیمت </th>
                  <th>تغییرات</th>
                  <th className="hidden md:block">مارکت کپ</th>

                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td>در حال دریافت اطلاعات...</td>
                    <td></td>
                    <td className="hidden md:block"></td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {cryptoPrices.map((coin) => (
                    <tr key={coin.id}>
                      <td className="coinName">{namesInFarsi(coin.name)}</td>
                      <td>${coin.current_price.toLocaleString()}</td>
                      <td
                        style={{
                          color:
                            coin.price_change_percentage_24h >= 0
                              ? "green"
                              : "red",
                        }}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="hidden md:block">${coin.market_cap.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

          </div>
          <div className="table">

            <table className="table gold-table w-full h-full">
              <thead>
                <tr>
                  <th>قیمت طلا</th>
                  <th>قیمت</th>
                  <th>تغییرات</th>
                  <th className="hidden md:block">تغییرات عددی</th>

                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td>در حال دریافت اطلاعات...</td>
                    <td></td>
                    <td className="hidden md:block"></td>

                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {goldPrices.map((coin) => {
                    const price = parseFloat(coin.price) || 0;
                    const changePercent = parseFloat(coin.change_percent) || 0;
                    const changeAmount = (price * changePercent) / 100;
                    const low = parseFloat(coin.low) || 0;
                    const high = parseFloat(coin.high) || 0;
                    return (
                      <tr key={coin.slug || coin.id}>
                        <td>{goldNamesInFarsi(coin.slug)}</td>
                        <td>{price.toLocaleString()}</td>
                        <td
                          style={{
                            color: changePercent >= 0 ? "green" : "red",
                          }}
                        >
                          {changePercent.toFixed(2)}%
                        </td>
                        <td className="hidden md:block"
                          style={{
                            color: changeAmount >= 0 ? "green" : "red",
                          }}
                        >
                          {changeAmount >= 0 ? '+' : ''}{changeAmount.toFixed(0).toLocaleString()}
                        </td>
                        {/* <td className="iran-sans-font hidden md:block">{low > 0 ? low.toLocaleString() : '-'}</td> */}
                        {/* <td className="iran-sans-font hidden md:block">{high > 0 ? high.toLocaleString() : '-'}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </section>
      <section id="section-4" >
        <h3 className="mb-3">ویژگی های آیکیو چارت</h3>

        <div id="section-4-spotlight-container" className=" flex flex-col gap-4 md:flex-row">
          <SpotlightCard
            aos="fade-left"
            aosDuration="800"
            aosDelay="0"
            className="custom-spotlight-card"
            spotlightColor="#ffc0cb"
          >
            <strong><i className="fa-solid fa-chalkboard"></i> پشتیبانی و آموزش درون‌برنامه‌ای</strong><br />
            <span>راهنمای قدم‌به‌قدم، ویدیوهای کوتاه و پشتیبانی چت برای کاهش زمان یادگیری و حل سریع مشکلات..</span>
          </SpotlightCard>
          <SpotlightCard
            aos="fade-left"
            aosDuration="800"
            aosDelay="200"
            className="custom-spotlight-card"
            spotlightColor="#ffc0cb"
          >
            <strong><i className="fa-solid fa-chart-mixed-up-circle-currency"></i> نمایش قیمت های لحظه ای</strong><br />
            <span>میتوانید به قیمت های لحظه ای بازارهای خودرو ، ارز  ، کریپتو ، فارکس  و بورس در هر لحظه دسترسی داشته باشید</span>
          </SpotlightCard>
          <SpotlightCard
            aos="fade-left"
            aosDuration="800"
            aosDelay="400"
            className="custom-spotlight-card"
            spotlightColor="#ffc0cb"
          >
            <strong><i className="fa-solid fa-chart-candlestick"></i> نمایش نمودار لحظه ای</strong><br />
            <span>نمودارها به‌صورت خودکار به‌روزرسانی می‌شوند تا همیشه نمایی دقیق از وضعیت بازار داشته باشید.</span>
          </SpotlightCard>
          <SpotlightCard
            aos="fade-left"
            aosDuration="800"
            aosDelay="600"
            className="custom-spotlight-card"
            spotlightColor="#ffc0cb"
          >
            <strong><i className="fa-solid fa-sparkles"></i> استفاده از هوش مصنوعی</strong><br />
            <span>مدل‌های یادگیری ماشین داده‌های گذشته را تحلیل می‌کنند تا الگوهای بازار سریع‌تر شناسایی شوند.</span>
          </SpotlightCard>
        </div>
      </section>

      <section className="section_3 flex flex-col md:flex-row  mt-10 ">
        <div
          className="w-full md:w-1/2 flex flex-col text-justify rtl justify-center items-center"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="0"
        >
          <h3 className="w-[90%] text-2xl text-right font-bold ">آیکیو چارت چیست؟</h3>
          <p className="w-[90%] text-lg text-justify ">
            آیکیو چارت یک سیستم تحلیل تکنیکال است که برای تحلیل بازارهای مالی استفاده می‌شود. این سیستم از مدل‌های یادگیری ماشینی و هوش مصنوعی برای تحلیل بازارهای مالی استفاده می‌شود.
          </p>
        </div>
        <div
          className="card-swap-div flex justify-center items-center w-full md:w-1/2 relative"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
            className="w-full absolute left-[5%] "
          >
            <Card>
              <img className="card-swap-img w-full h-full object-cover" src="/Images/Home/slider-1.png" alt="" />
            </Card>
            <Card>
              <img className="card-swap-img w-full h-full object-cover" src="/Images/Home/slider-2.png" alt="" />
            </Card>
          </CardSwap>
        </div>
      </section>


      <section className="animated-background-section w-full min-h-[100px] mt-99 py-20 flex flex-col gap-5 items-center justify-center relative overflow-hidden" style={{ color: 'white', marginTop: "150px" }}>
        <div className="animated-bg-gradient"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="max-w-6xl flex flex-col gap-8 w-full mx-auto text-center relative z-10" style={{ color: 'white' }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'white' }}>
            آماده شروع سرمایه‌گذاری هوشمند هستید؟
          </h2>
          {/* <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: 'white' }}>
            به هزاران کاربر موفق بپیوندید و از تحلیل‌های پیشرفته هوش مصنوعی برای تصمیم‌گیری‌های بهتر استفاده کنید
          </p> */}

          <div className="flex items-center justify-center flex-col md:flex-row gap-20 mb-12 ">
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="0"
            >
              <div className="text-5xl font-bold mb-2" style={{ color: 'white' }}>10K+</div>
              <div className="text-lg" style={{ color: 'white' }}>کاربر فعال</div>
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="text-5xl font-bold mb-2" style={{ color: 'white' }}>95%</div>
              <div className="text-lg" style={{ color: 'white' }}>دقت پیش‌بینی</div>
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div className="text-5xl font-bold mb-2" style={{ color: 'white' }}>24/7</div>
              <div className="text-lg" style={{ color: 'white' }}>پشتیبانی آنلاین</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ width: '100%', padding: '64px 0', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div className="text-center mb-8" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1f2937' }}>آخرین مقالات</h2>
            <p className="text-lg" style={{ color: '#4b5563', maxWidth: '672px', margin: '0 auto' }}>
              جدیدترین مطالب و تحلیل‌های تخصصی در زمینه بازارهای مالی
            </p>
          </div>

          {articlesLoading ? (
            <div className="flex justify-center items-center" style={{ padding: '80px 0' }}>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>در حال بارگذاری مقالات...</div>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex justify-center items-center" style={{ padding: '80px 0' }}>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>مقاله‌ای یافت نشد</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center" style={{ gap: '32px' }}>
              {articles.map((article, index) => (
                <Link
                  href={`/Blogs/${article.slug}`}
                  key={article.id || index}
                  className="group"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    display: 'block',
                    width: '100%',
                    maxWidth: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={index * 100}
                >
                  <div style={{ position: 'relative', height: '224px', overflow: 'hidden' }}>
                    <img
                      src={`https://localhost:7282/${article.coverImageUrl}`}
                      alt={article.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  <div className="rtl" style={{ padding: '24px' }}>
                    <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#1f2937' }}>
                      {article.title}
                    </h3>
                    <p className="text-sm md:text-base mb-4" style={{ color: '#4b5563', lineHeight: '1.75' }}>
                      {article.summary?.slice(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#2563eb', fontWeight: '600', fontSize: '16px' }}>
                        مطالعه بیشتر
                      </span>
                      <svg
                        style={{ width: '20px', height: '20px', color: '#2563eb' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {articles.length > 0 && (
            <div className="text-center mt-5" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
              <Link
                href="/Blogs"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                مشاهده همه مقالات
              </Link>
            </div>
          )}
        </div>
      </section>

      <Foooter />
    </>
  );
}
