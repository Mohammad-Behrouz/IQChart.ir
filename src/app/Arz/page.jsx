"use client";

import Nav from '@/Components/Nav'
import React, { useEffect, useState } from 'react'
import { api_token_sourceArena } from '@/JavaScript/defaultFuncs'
import Skeleton from 'react-loading-skeleton';
import "../../style/gold.css"

export const dynamic = 'force-dynamic';

const page = () => {
    const [all, setAll] = useState([])
    const [mostView, setMostView] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [isClient, setIsClient] = useState(false);



    const [ons, setOns] = useState([]);
    const [seke, setSeke] = useState([]);
    const [tala, setTala] = useState([]);

    const [usd, setUsd] = useState(0)
    const [onsTala, setOnsTala] = useState(0)



    const mostViewSlug = ["USD", "EUR", "GBP", "TETHER"]

    const arzha = [
        "USD", "EUR", "GBP", "AUD", "CAD", "NZD", "SGD", "HKD", "AED", "SAR",
        "QAR", "OMR", "KWD", "IQD", "BHD", "TRY", "SYP", "INR", "PKR", "JPY",
        "KRW", "CNY", "CHF", "DKK", "SEK", "NOK", "AZN", "TMT", "TJS", "KGS",
        "AMD", "AFN", "GEL"]

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        const getGold = async () => {
            console.log(api_token_sourceArena() + "currency");
            try {

                const res = await fetch(api_token_sourceArena() + "currency")
                const json = await res.json()
                setAll(json.data)
                const filtered = json.data.filter(gold =>
                    mostViewSlug.includes(gold.slug)
                );
                const filteredSeke = json.data.filter(gold =>
                    arzha.includes(gold.slug)
                )

                var sortedSeke = [];
                for (const arz of arzha) {
                    const matched = filteredSeke.find(filter => filter.slug === arz);
                    if (matched) {
                        sortedSeke.push(matched);
                    }
                }

                setUsd(parseInt((json.data.find(g => g.slug == "USD"))?.price))
                setOnsTala(parseInt((json.data.find(g => g.slug == "ONS"))?.price))
                setSeke(sortedSeke)

                setMostView(filtered);
                setIsloading(false)
                console.log(json);
            } catch (e) {
                const alertify = (await import('alertifyjs')).default;
                alertify.error("خطا در دریافت اطلاعات از سرور")
                console.log(e);
            }

        }
        getGold()
    }, [])

    useEffect(() => {
        console.log(mostView);

    }, [mostView])

    const goldWeights = {
        "SEKE_EMAMI": 7.3197,
        "SEKE_BAHAR": 7.3197,
        "SEKE_NIM": 3.65985,
        "SEKE_ROB": 1.829025,
        "SEKE_GERAMI": 0.9144,   // 1.016 * 0.9
    };

    function getGoldPerGram() {
        return (onsTala * usd) / 31.1035;
    }

    function getIntrinsic(slug) {
        const weight = goldWeights[slug];
        if (!weight) return null;
        return Math.round(getGoldPerGram() * weight);
    }

    function getHebab(currentPrice, intrinsicValue) {
        var hobab_num = currentPrice - intrinsicValue
        let percent = hobab_num / currentPrice;

        return percent * 100;
    }

    const getDollarMohasebati = (intrinsicValue, slug) => {
        const onsGrams = 31.1035;
        const weight = goldWeights[slug];

        if (!weight || onsTala === 0) return 0;

        const dollarMohasebati = (intrinsicValue / (onsTala * (weight / onsGrams)));
        return dollarMohasebati;
    }


    return (
        <>
            <section id='blue-div' >
                <h3 id='gold-title' className='iran-sans-font'>نگاهی به بازار ارز 💵</h3>
                <div className='most-view-gold '>
                    {isLoading ?
                        (
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
                        ) : mostView.map((gold, index) => {
                            return (
                                <div key={index} className='most-view-div'>
                                    <h4><img src={`/Images/coins/${gold.slug}.png`} alt={gold.slug} />  {gold.name}</h4>
                                    <div className='most-view-price'>
                                        <b>{parseInt(gold.price).toLocaleString("fa")}</b>
                                        <span className="ltr change_percent iran-sans-font">
                                            {parseInt(gold.change) > 0 ? (
                                                <span style={{ color: "green" }}>
                                                    <i className="fa-solid fa-triangle "></i> +{parseFloat(gold.change_percent).toLocaleString("fa")}% {parseInt(gold.change).toLocaleString("fa")}
                                                </span>
                                            ) : parseInt(gold.change) < 0 ? (
                                                <span style={{ color: "red" }}>
                                                    <i
                                                        className="fa-solid fa-triangle reverse"
                                                    ></i>{" "}
                                                    {parseFloat(gold.change_percent).toLocaleString("fa")}% {parseInt(gold.change).toLocaleString("fa")}
                                                </span>
                                            ) : (
                                                <span style={{ color: "gray" }}>
                                                    <i className="fa-solid fa-circle"></i> ۰٪ {parseInt(gold.change).toLocaleString("fa")}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        })

                    }
                    {/* <div className="most-view-div">
                        <h5>{mostView[0].name}</h5>
                        <div>
                            <strong>{mostView[0]}</strong>
                        </div>
                    </div> */}
                </div>
            </section>
            <section className='gold-container'>
                {/* <div className='table-container'> */}

                <table id='ons-table' className=' arz-table seke-table' >
                    <thead>
                        <tr>
                            <th >ارز ها</th>
                            <th>قیمت</th>
                            <th >درصد</th>
                            <th >تغییرات</th>
                            <th >بیشترین</th>
                            <th >کمترین</th>
                            <th >آخرین آپدیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? arzha.map((x, index) => {
                            return (
                                <tr key={index}>
                                    <td><Skeleton width={80} height={20} /></td>
                                    <td><Skeleton width={80} height={20} /></td>
                                    <td><Skeleton width={30} height={20} /></td>
                                    <td><Skeleton width={60} height={20} /></td>
                                    <td><Skeleton width={70} height={20} /></td>
                                    <td><Skeleton width={70} height={20} /></td>

                                    <td><Skeleton width={80} height={20} /></td>
                                </tr>
                            )
                        }) : seke.map((o, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ width: "150px" }}>{o.name}</td>
                                    <td>{parseInt(o.price).toLocaleString("fa")}</td>
                                    <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray", direction: "ltr" }}>{o.change_percent}%</td>
                                    <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray" }}>{parseInt(o.change).toLocaleString("fa")}</td>
                                    <td>{parseInt(o.max_price).toLocaleString("fa")}</td>
                                    <td>{parseInt(o.min_price).toLocaleString("fa")}</td>
                                    {/* <td>{getIntrinsic(o.slug).toLocaleString("fa")}</td>
                                        <td style={{ direction: "ltr" }}>{parseFloat(getHebab(parseInt(o.price), getIntrinsic(o.slug))).toFixed(2)}%</td>
                                        <td>{parseInt(getDollarMohasebati(o.price, o.slug)).toLocaleString("fa")}</td> */}
                                    <td>{o.last_update}</td>
                                </tr>
                            )
                        })

                        }

                    </tbody>
                </table>
                {/* </div> */}
                {/* <div className='gold-container-div'>
                    <div className='tala-ons-div'>
                        <table id='ons-table' className='ons-table'>
                            <thead>
                                <tr>
                                    <th>انس</th>
                                    <th>قیمت</th>
                                    <th>تغییرات</th>
                                    <th>درصد</th>
                                    <th>بیشترین</th>
                                    <th>کمترین</th>
                                    <th>آخرین آپدیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? OnsTable.map((x, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                        </tr>
                                    )
                                }) : ons.map((o, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{o.name}</td>
                                            <td>{o.price}</td>
                                            <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray", direction: "ltr" }}>{o.change_percent}%</td>
                                            <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray" }}>{parseInt(o.change).toLocaleString("fa")}</td>
                                            <td>{o.max_price}</td>
                                            <td>{o.min_price}</td>
                                            <td>{o.last_update}</td>
                                        </tr>
                                    )
                                })

                                }

                            </tbody>
                        </table>
                        <table id='ons-table' className='ons-table'>
                            <thead>
                                <tr>
                                    <th>طلا و نفت</th>
                                    <th>قیمت</th>
                                    <th>تغییرات</th>
                                    <th>درصد</th>
                                    <th>بیشترین</th>
                                    <th>کمترین</th>
                                    <th>آخرین آپدیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? OnsTable.map((x, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                            <td><Skeleton width={50} height={20} /></td>
                                        </tr>
                                    )
                                }) : tala.map((o, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{o.name}</td>
                                            <td>{o.price}</td>
                                            <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray", direction: "ltr" }}>{o.change_percent}%</td>
                                            <td style={{ color: parseFloat(o.change_percent) > 0 ? "green" : parseFloat(o.change_percent) < 0 ? "red" : "gray" }}>{parseInt(o.change).toLocaleString("fa")}</td>
                                            <td>{o.max_price}</td>
                                            <td>{o.min_price}</td>
                                            <td>{o.last_update}</td>
                                        </tr>
                                    )
                                })

                                }

                            </tbody>
                        </table>
                    </div>
                </div> */}

            </section>
        </>
    )
}

export default page