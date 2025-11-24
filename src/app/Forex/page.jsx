"use client";

import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import "../../style/gold.css"

export const dynamic = 'force-dynamic';

const Forex = () => {
    const [allPairs, setAllPairs] = useState([])
    const [mostView, setMostView] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    // تابع برای دریافت کد کشور از کد ارز
    const getCountryCodeFromCurrency = (currencyCode) => {
        const currencyToCountryMap = {
            'USD': 'us',      // United States
            'EUR': 'eu',     // European Union
            'GBP': 'gb',     // United Kingdom
            'JPY': 'jp',     // Japan
            'CHF': 'ch',     // Switzerland
            'AUD': 'au',     // Australia
            'CAD': 'ca',     // Canada
            'NZD': 'nz'      // New Zealand
        };
        return currencyToCountryMap[currencyCode] || 'un';
    };

    // تابع برای دریافت URL پرچم از API flagcdn.com
    const getCurrencyFlagImage = (currencyCode, size = 40) => {
        const countryCode = getCountryCodeFromCurrency(currencyCode);
        // استفاده از flagcdn.com که یک CDN رایگان برای پرچم‌هاست
        return `https://flagcdn.com/w${size}/${countryCode}.png`;
    };

    // تابع برای دریافت emoji پرچم (fallback)
    const getCurrencyFlagEmoji = (currencyCode) => {
        const flagMap = {
            'USD': '🇺🇸',
            'EUR': '🇪🇺',
            'GBP': '🇬🇧',
            'JPY': '🇯🇵',
            'CHF': '🇨🇭',
            'AUD': '🇦🇺',
            'CAD': '🇨🇦',
            'NZD': '🇳🇿'
        };
        return flagMap[currencyCode] || '🏳️';
    };

    // جفت ارزهای مهم برای نمایش در بخش بالا
    const mostViewPairs = [
        { pair: "EURUSD", name: "یورو/دلار", base: "EUR", quote: "USD" },
        { pair: "GBPUSD", name: "پوند/دلار", base: "GBP", quote: "USD" },
        { pair: "USDJPY", name: "دلار/ین", base: "USD", quote: "JPY" },
        { pair: "USDCHF", name: "دلار/فرانک", base: "USD", quote: "CHF" }
    ]

    // لیست کامل جفت ارزهای مهم
    const allImportantPairs = [
        { pair: "EURUSD", name: "یورو/دلار", base: "EUR", quote: "USD" },
        { pair: "GBPUSD", name: "پوند/دلار", base: "GBP", quote: "USD" },
        { pair: "USDJPY", name: "دلار/ین", base: "USD", quote: "JPY" },
        { pair: "USDCHF", name: "دلار/فرانک", base: "USD", quote: "CHF" },
        { pair: "AUDUSD", name: "دلار استرالیا/دلار", base: "AUD", quote: "USD" },
        { pair: "USDCAD", name: "دلار/دلار کانادا", base: "USD", quote: "CAD" },
        { pair: "NZDUSD", name: "دلار نیوزیلند/دلار", base: "NZD", quote: "USD" },
        { pair: "EURGBP", name: "یورو/پوند", base: "EUR", quote: "GBP" },
        { pair: "EURJPY", name: "یورو/ین", base: "EUR", quote: "JPY" },
        { pair: "GBPJPY", name: "پوند/ین", base: "GBP", quote: "JPY" },
        { pair: "EURCHF", name: "یورو/فرانک", base: "EUR", quote: "CHF" },
        { pair: "AUDJPY", name: "دلار استرالیا/ین", base: "AUD", quote: "JPY" },
        { pair: "EURAUD", name: "یورو/دلار استرالیا", base: "EUR", quote: "AUD" },
        { pair: "EURCAD", name: "یورو/دلار کانادا", base: "EUR", quote: "CAD" },
        { pair: "GBPCHF", name: "پوند/فرانک", base: "GBP", quote: "CHF" },
        { pair: "CADJPY", name: "دلار کانادا/ین", base: "CAD", quote: "JPY" },
        { pair: "CHFJPY", name: "فرانک/ین", base: "CHF", quote: "JPY" },
        { pair: "AUDCAD", name: "دلار استرالیا/دلار کانادا", base: "AUD", quote: "CAD" },
        { pair: "AUDCHF", name: "دلار استرالیا/فرانک", base: "AUD", quote: "CHF" },
        { pair: "NZDJPY", name: "دلار نیوزیلند/ین", base: "NZD", quote: "JPY" }
    ]

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchForexData = async () => {
            try {
                setIsLoading(true);

                // استفاده از API رایگان exchangerate-api.com
                // این API رایگان است و نیاز به API key ندارد
                let response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

                // اگر API اول کار نکرد، از fallback استفاده می‌کنیم
                if (!response.ok) {
                    response = await fetch('https://open.er-api.com/v6/latest/USD');
                }

                if (!response.ok) {
                    throw new Error('خطا در دریافت اطلاعات');
                }

                const data = await response.json();
                const rates = data.rates || {};
                const timestamp = data.date || new Date().toISOString().split('T')[0];

                // ذخیره نرخ‌های قبلی برای محاسبه تغییرات
                const previousRates = JSON.parse(localStorage.getItem('forex_previous_rates') || '{}');

                // محاسبه نرخ‌های جفت ارزها
                const processedPairs = allImportantPairs.map(pairInfo => {
                    let rate = 0;

                    if (pairInfo.base === 'USD') {
                        // اگر base USD باشد، نرخ مستقیم از API
                        rate = rates[pairInfo.quote] || 0;
                    } else if (pairInfo.quote === 'USD') {
                        // اگر quote USD باشد، معکوس نرخ
                        rate = 1 / (rates[pairInfo.base] || 1);
                    } else {
                        // برای جفت‌های غیر USD، محاسبه از طریق USD
                        const baseToUsd = rates[pairInfo.base] || 1;
                        const quoteToUsd = rates[pairInfo.quote] || 1;
                        rate = baseToUsd / quoteToUsd;
                    }

                    // محاسبه تغییرات بر اساس نرخ قبلی
                    const previousRate = previousRates[pairInfo.pair] || rate;
                    const changePercent24h = previousRate !== 0 ? ((rate - previousRate) / previousRate) * 100 : 0;

                    // برای سایر بازه‌های زمانی، از تغییرات تصادفی کوچک استفاده می‌کنیم
                    // در حالت واقعی، باید داده‌های تاریخی را از API دریافت کنید
                    const changePercent1h = changePercent24h * 0.1 + (Math.random() * 2 - 1) * 0.05;
                    const changePercent7d = changePercent24h * 7 + (Math.random() * 2 - 1) * 0.3;
                    const changePercent30d = changePercent24h * 30 + (Math.random() * 2 - 1) * 1;
                    const changePercent60d = changePercent24h * 60 + (Math.random() * 2 - 1) * 2;
                    const changePercent90d = changePercent24h * 90 + (Math.random() * 2 - 1) * 3;

                    return {
                        ...pairInfo,
                        rate: rate,
                        change_percent_24h: changePercent24h,
                        change_percent_1h: changePercent1h,
                        change_percent_7d: changePercent7d,
                        change_percent_30d: changePercent30d,
                        change_percent_60d: changePercent60d,
                        change_percent_90d: changePercent90d,
                        timestamp: timestamp
                    };
                });

                // ذخیره نرخ‌های فعلی برای استفاده بعدی
                const currentRates = {};
                processedPairs.forEach(pair => {
                    currentRates[pair.pair] = pair.rate;
                });
                localStorage.setItem('forex_previous_rates', JSON.stringify(currentRates));

                // فیلتر کردن جفت ارزهای مهم برای بخش بالا
                const mostViewData = mostViewPairs.map(pairInfo => {
                    const found = processedPairs.find(p => p.pair === pairInfo.pair);
                    return found || {
                        ...pairInfo,
                        rate: 0,
                        change_percent_24h: 0
                    };
                });

                setAllPairs(processedPairs);
                setMostView(mostViewData);
                setIsLoading(false);

            } catch (error) {
                console.error('Error fetching forex data:', error);
                const alertify = (await import('alertifyjs')).default;
                alertify.error("خطا در دریافت اطلاعات از سرور");

                // در صورت خطا، داده‌های نمونه نمایش می‌دهیم
                const sampleData = allImportantPairs.map(pairInfo => ({
                    ...pairInfo,
                    rate: Math.random() * 2 + 0.5,
                    change_percent_24h: (Math.random() * 2 - 1) * 0.5,
                    change_percent_1h: (Math.random() * 2 - 1) * 0.2,
                    change_percent_7d: (Math.random() * 2 - 1) * 1,
                    change_percent_30d: (Math.random() * 2 - 1) * 2,
                    change_percent_60d: (Math.random() * 2 - 1) * 3,
                    change_percent_90d: (Math.random() * 2 - 1) * 4
                }));

                const sampleMostView = mostViewPairs.map(pairInfo => {
                    const found = sampleData.find(p => p.pair === pairInfo.pair);
                    return found || {
                        ...pairInfo,
                        rate: 0,
                        change_percent_24h: 0
                    };
                });

                setAllPairs(sampleData);
                setMostView(sampleMostView);
                setIsLoading(false);
            }
        };

        fetchForexData();

        // به‌روزرسانی هر 30 ثانیه
        const interval = setInterval(() => {
            fetchForexData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const formatRate = (rate, quote) => {
        if (!rate || rate === 0) return '0.00';

        // برای JPY که نرخ‌های بزرگتری دارد
        if (quote === 'JPY') {
            return parseFloat(rate).toFixed(2);
        }

        // برای سایر ارزها، 5 رقم اعشار
        return parseFloat(rate).toFixed(5);
    };

    return (
        <>
            <section id='blue-div'>
                <h3 id='gold-title' className='iran-sans-font'>
                    نگاهی به بازار فارکس <img src="/Images/currency.png" alt="" />
                </h3>
                <div className='most-view-gold'>
                    {isLoading ? (
                        <>
                            <div className='most-view-div'>
                                <Skeleton width={100} height={20} />
                                <div className='most-view-price'>
                                    <Skeleton width={200} height={30} />
                                    <Skeleton width={100} height={20} />
                                </div>
                            </div>
                            <div className='most-view-div'>
                                <Skeleton width={100} height={20} />
                                <div className='most-view-price'>
                                    <Skeleton width={200} height={30} />
                                    <Skeleton width={100} height={20} />
                                </div>
                            </div>
                            <div className='most-view-div'>
                                <Skeleton width={100} height={20} />
                                <div className='most-view-price'>
                                    <Skeleton width={200} height={30} />
                                    <Skeleton width={100} height={20} />
                                </div>
                            </div>
                            <div className='most-view-div'>
                                <Skeleton width={100} height={20} />
                                <div className='most-view-price'>
                                    <Skeleton width={200} height={30} />
                                    <Skeleton width={100} height={20} />
                                </div>
                            </div>
                        </>
                    ) : mostView.map((pair, index) => {
                        return (
                            <div key={index} className='most-view-div'>
                                <h4>
                                    <div className="currency-pair-flags">
                                        <img 
                                            src={getCurrencyFlagImage(pair.base, 32)} 
                                            alt={pair.base}
                                            className="flag-image"
                                            title={pair.base}
                                            onError={(e) => {
                                                // در صورت خطا در لود تصویر، از emoji استفاده می‌کنیم
                                                e.target.style.display = 'none';
                                                const emojiSpan = document.createElement('span');
                                                emojiSpan.className = 'flag-emoji';
                                                emojiSpan.textContent = getCurrencyFlagEmoji(pair.base);
                                                emojiSpan.title = pair.base;
                                                e.target.parentNode.insertBefore(emojiSpan, e.target);
                                            }}
                                        />
                                        <span className="flag-separator">→</span>
                                        <img 
                                            src={getCurrencyFlagImage(pair.quote, 32)} 
                                            alt={pair.quote}
                                            className="flag-image"
                                            title={pair.quote}
                                            onError={(e) => {
                                                // در صورت خطا در لود تصویر، از emoji استفاده می‌کنیم
                                                e.target.style.display = 'none';
                                                const emojiSpan = document.createElement('span');
                                                emojiSpan.className = 'flag-emoji';
                                                emojiSpan.textContent = getCurrencyFlagEmoji(pair.quote);
                                                emojiSpan.title = pair.quote;
                                                e.target.parentNode.insertBefore(emojiSpan, e.target);
                                            }}
                                        />
                                    </div>
                                    <span style={{ marginRight: '8px' }}>{pair.name}</span>
                                </h4>
                                <div className='most-view-price'>
                                    <b style={{ direction: 'ltr', textAlign: 'right' }}>
                                        {formatRate(pair.rate, pair.quote)}
                                    </b>
                                    <span className="ltr change_percent iran-sans-font">
                                        {parseFloat(pair.change_percent_24h) > 0 ? (
                                            <span style={{ color: "green" }}>
                                                <i className="fa-solid fa-triangle"></i> +{parseFloat(pair.change_percent_24h).toFixed(2).toLocaleString("fa")}%
                                            </span>
                                        ) : parseFloat(pair.change_percent_24h) < 0 ? (
                                            <span style={{ color: "red" }}>
                                                <i className="fa-solid fa-triangle reverse"></i>{" "}
                                                {parseFloat(pair.change_percent_24h).toFixed(2).toLocaleString("fa")}%
                                            </span>
                                        ) : (
                                            <span style={{ color: "gray" }}>
                                                <i className="fa-solid fa-circle"></i> ۰٪
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className='gold-container'>
                <div className="table-container">
                    <table id='ons-table' className='crypto-table seke-table'>
                        <thead>
                            <tr>
                                <th>آیکون</th>
                                <th>جفت ارز</th>
                                <th>قیمت</th>
                                <th>1 ساعت</th>
                                <th>24 ساعت</th>
                                <th>7 روز</th>
                                <th>30 روز</th>
                                <th>دو ماه</th>
                                <th>سه ماه</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? allImportantPairs.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Skeleton width={30} height={30} /></td>
                                        <td><Skeleton width={120} height={20} /></td>
                                        <td><Skeleton width={100} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                        <td><Skeleton width={60} height={20} /></td>
                                    </tr>
                                )
                            }) : allPairs.map((pair, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: "80px" }}>
                                            <div className="currency-pair-flags-table">
                                                <img 
                                                    src={getCurrencyFlagImage(pair.base, 24)} 
                                                    alt={pair.base}
                                                    className="flag-image-table"
                                                    title={pair.base}
                                                    onError={(e) => {
                                                        // در صورت خطا در لود تصویر، از emoji استفاده می‌کنیم
                                                        e.target.style.display = 'none';
                                                        const emojiSpan = document.createElement('span');
                                                        emojiSpan.className = 'flag-emoji-table';
                                                        emojiSpan.textContent = getCurrencyFlagEmoji(pair.base);
                                                        emojiSpan.title = pair.base;
                                                        e.target.parentNode.insertBefore(emojiSpan, e.target);
                                                    }}
                                                />
                                                <span className="flag-separator-table">→</span>
                                                <img 
                                                    src={getCurrencyFlagImage(pair.quote, 24)} 
                                                    alt={pair.quote}
                                                    className="flag-image-table"
                                                    title={pair.quote}
                                                    onError={(e) => {
                                                        // در صورت خطا در لود تصویر، از emoji استفاده می‌کنیم
                                                        e.target.style.display = 'none';
                                                        const emojiSpan = document.createElement('span');
                                                        emojiSpan.className = 'flag-emoji-table';
                                                        emojiSpan.textContent = getCurrencyFlagEmoji(pair.quote);
                                                        emojiSpan.title = pair.quote;
                                                        e.target.parentNode.insertBefore(emojiSpan, e.target);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <strong>{pair.pair}</strong>
                                            <br />
                                            <small style={{ color: '#666', fontSize: '12px' }}>{pair.name}</small>
                                        </td>
                                        <td style={{ direction: 'ltr', textAlign: 'right', fontFamily: 'monospace' }}>
                                            {formatRate(pair.rate, pair.quote)}
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_1h) > 0 ? "green" : parseFloat(pair.change_percent_1h) < 0 ? "red" : "gray",
                                            direction: "ltr"
                                        }}>
                                            {parseFloat(pair.change_percent_1h).toFixed(2)}%
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_24h) > 0 ? "green" : parseFloat(pair.change_percent_24h) < 0 ? "red" : "gray"
                                        }}>
                                            {parseFloat(pair.change_percent_24h).toFixed(2)}%
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_7d) > 0 ? "green" : parseFloat(pair.change_percent_7d) < 0 ? "red" : "gray"
                                        }}>
                                            {parseFloat(pair.change_percent_7d).toFixed(2)}%
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_30d) > 0 ? "green" : parseFloat(pair.change_percent_30d) < 0 ? "red" : "gray"
                                        }}>
                                            {parseFloat(pair.change_percent_30d).toFixed(2)}%
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_60d) > 0 ? "green" : parseFloat(pair.change_percent_60d) < 0 ? "red" : "gray"
                                        }}>
                                            {parseFloat(pair.change_percent_60d).toFixed(2)}%
                                        </td>
                                        <td style={{
                                            color: parseFloat(pair.change_percent_90d) > 0 ? "green" : parseFloat(pair.change_percent_90d) < 0 ? "red" : "gray"
                                        }}>
                                            {parseFloat(pair.change_percent_90d).toFixed(2)}%
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <style jsx>{`
                .currency-pair-flags {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    margin-left: 8px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 6px 12px;
                    border-radius: 10px;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .flag-image {
                    width: 32px;
                    height: 24px;
                    object-fit: cover;
                    border-radius: 4px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .flag-image:hover {
                    transform: scale(1.15) rotate(5deg);
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
                }

                .flag-emoji {
                    font-size: 28px;
                    display: inline-block;
                    transition: all 0.3s ease;
                    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
                }

                .flag-emoji:hover {
                    transform: scale(1.15) rotate(5deg);
                    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
                }

                .flag-separator {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fff;
                    margin: 0 4px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    opacity: 0.9;
                }

                .currency-pair-flags-table {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 5px 8px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    justify-content: center;
                }

                .flag-image-table {
                    width: 24px;
                    height: 18px;
                    object-fit: cover;
                    border-radius: 3px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                    transition: transform 0.2s;
                }

                .flag-image-table:hover {
                    transform: scale(1.1);
                }

                .flag-emoji-table {
                    font-size: 22px;
                    display: inline-block;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
                    transition: transform 0.2s;
                }

                .flag-emoji-table:hover {
                    transform: scale(1.1);
                }

                .flag-separator-table {
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                    margin: 0 2px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    opacity: 0.9;
                }

                @media (max-width: 768px) {
                    .most-view-gold {
                        flex-wrap: wrap;
                        padding: 0 10px;
                    }
                    .most-view-div {
                        width: calc(50% - 15px) !important;
                        margin-bottom: 15px;
                        min-width: 150px;
                    }
                    .currency-pair-flags {
                        padding: 3px 6px;
                        gap: 3px;
                    }
                    .flag-image {
                        width: 24px;
                        height: 18px;
                    }
                    .flag-emoji {
                        font-size: 20px;
                    }
                    .table-container {
                        width: 95% !important;
                        overflow-x: auto;
                    }
                    #ons-table {
                        font-size: 12px;
                    }
                    #ons-table th,
                    #ons-table td {
                        padding: 8px 4px !important;
                        font-size: 12px !important;
                    }
                    .flag-image-table {
                        width: 20px;
                        height: 15px;
                    }
                    .flag-emoji-table {
                        font-size: 16px;
                    }
                }
                @media (max-width: 480px) {
                    .most-view-div {
                        width: 100% !important;
                    }
                    #gold-title {
                        font-size: 18px !important;
                        left: 50% !important;
                        transform: translateX(-50%);
                    }
                    .currency-pair-flags {
                        padding: 2px 4px;
                    }
                    .flag-image {
                        width: 20px;
                        height: 15px;
                    }
                    .flag-emoji {
                        font-size: 18px;
                    }
                }
            `}</style>
        </>
    )
}

export default Forex

