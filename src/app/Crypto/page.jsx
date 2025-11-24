"use client";

import Nav from '@/Components/Nav'
import React, { useEffect, useState } from 'react'
import { api_token_sourceArena } from '@/JavaScript/defaultFuncs'
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
import "../../style/gold.css"

const page = () => {
    const router = useRouter();
    const [all, setAll] = useState([])
    const [mostView, setMostView] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [isClient, setIsClient] = useState(false);

    const [coins, setCoins] = useState([])

    const mostViewSlug = ["USDT", "BNB", "ETH", "BTC"]

    const arzha = [
        "BTC",
        "ETH",
        "XRP",
        "USDT",
        "SOL",
        "BNB",
        "USDC",
        "ADA",
        "DOGE",
        "STETH",
        "TRX",
        "SAI",
        "XLM",
        "LINK",
        "TON",
        "WBTC",
        "HBAR",
        "CRO",
        "AVAX",
        "BCH",
        "UNI",
        "SHIB",
        "LEO",
        "LTC",
        "DOT",
        "XMR",
        "AAVE",
        "GT",
        "JUP",
        "DAI"
    ]

    const symbolToCoinGeckoId = {
        "BTC": "bitcoin",
        "ETH": "ethereum",
        "XRP": "ripple",
        "USDT": "tether",
        "SOL": "solana",
        "BNB": "binancecoin",
        "USDC": "usd-coin",
        "ADA": "cardano",
        "DOGE": "dogecoin",
        "STETH": "staked-ether",
        "TRX": "tron",
        "SAI": "sai",
        "XLM": "stellar",
        "LINK": "chainlink",
        "TON": "the-open-network",
        "WBTC": "wrapped-bitcoin",
        "HBAR": "hedera-hashgraph",
        "CRO": "crypto-com-chain",
        "AVAX": "avalanche-2",
        "BCH": "bitcoin-cash",
        "UNI": "uniswap",
        "SHIB": "shiba-inu",
        "LEO": "leo-token",
        "LTC": "litecoin",
        "DOT": "polkadot",
        "XMR": "monero",
        "AAVE": "aave",
        "GT": "gatechain-token",
        "JUP": "jupiter-exchange-solana",
        "DAI": "dai"
    };



    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        const getGold = async () => {
            console.log(api_token_sourceArena() + "currency");
            try {

                const res = await fetch(api_token_sourceArena() + "crypto_v2=all")
                const json = await res.json()
                setAll(json.data)
                const filtered = json.data.filter(gold =>
                    mostViewSlug.includes(gold.symbol)
                );
                const filteredSeke = json.data.filter(gold =>
                    arzha.includes(gold.symbol)
                )

                var sortedCrypto = [];
                for (const arz of mostViewSlug) {
                    const matched = filtered.find(filter => filter.symbol === arz);
                    if (matched) {
                        sortedCrypto.push(matched);
                    }
                }

                var sortedAllCrypto = []
                for (const arz of arzha) {
                    const match = filteredSeke.find(c => c.symbol == arz)
                    if (match) {
                        sortedAllCrypto.push(match)
                    }
                }

                setMostView(sortedCrypto);
                setCoins(sortedAllCrypto)
                setIsloading(false)

                console.log(filtered);
            } catch (e) {
                console.error("خطا در دریافت اطلاعات از سرور", e);
                if (typeof window !== 'undefined') {
                    try {
                        const alertify = (await import('alertifyjs')).default;
                        alertify.error("خطا در دریافت اطلاعات از سرور");
                    } catch (alertifyError) {
                        console.error("خطا در بارگذاری alertify", alertifyError);
                    }
                }
            }

        }
        getGold()

        const interval = setInterval(() => {
            getGold();
        }, 3000); 

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        console.log(mostView);

    }, [mostView])



    return (
        <>
            <section id='blue-div' >
                <h3 id='gold-title' className='iran-sans-font'>نگاهی به بازار ارزدیجیتال <img src="/Images/currency.png" alt="" /></h3>
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
                                    <h4><img src={`/Images/coins/${gold.symbol}.png`} alt={gold.slug} />  {gold.name}</h4>
                                    <div className='most-view-price'>
                                        <b>{Number(parseFloat(gold.price).toFixed(2)).toLocaleString("fa")}$</b>
                                        <span className="ltr change_percent iran-sans-font">
                                            {parseFloat(gold.change_percent_24h) > 0 ? (
                                                <span style={{ color: "green" }}>
                                                    <i className="fa-solid fa-triangle "></i> +{parseFloat(gold.change_percent_24h).toLocaleString("fa")}%
                                                </span>
                                            ) : parseFloat(gold.change_percent_24h) < 0 ? (
                                                <span style={{ color: "red" }}>
                                                    <i
                                                        className="fa-solid fa-triangle reverse"
                                                    ></i>{" "}
                                                    {parseFloat(gold.change_percent_24h).toLocaleString("fa")}%
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

                <table id='ons-table' className=' crypto-table seke-table' >
                    <thead>
                        <tr>
                            <th >آیکون</th>
                            <th >کوین ها</th>
                            <th>قیمت</th>
                            <th >1 ساعت</th>
                            <th >24 ساعت</th>
                            <th >7 روز </th>
                            <th >30 روز</th>
                            <th >دو ماه</th>
                            <th >سه ماه</th>
                            <th >حجم 24 ساعته</th>
                            <th >مارکت کپ</th>
                            <th >نمودار تغییرات</th>

                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? arzha.map((x, index) => {
                            return (
                                <tr key={index}>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={80} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={20} height={20} /></td>
                                    <td><Skeleton width={50} height={20} /></td>
                                    <td><Skeleton width={80} height={20} /></td>
                                </tr>
                            )
                        }) : coins.map((c, index) => {
                            const coinGeckoId = symbolToCoinGeckoId[c.symbol] || c.symbol.toLowerCase();
                            return (
                                <tr 
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => router.push(`/Crypto/${coinGeckoId}`)}
                                >
                                    <td style={{ width: "50px" }}><img src={c.icon} /></td>
                                    <td>{c.symbol}</td>
                                    <td>{parseFloat(c.price).toLocaleString("fa")}$</td>
                                    <td style={{ color: parseFloat(c.change_percent_1h) > 0 ? "green" : parseFloat(c.change_percent_1h) < 0 ? "red" : "gray", direction: "ltr" }}>{parseFloat(c.change_percent_1h).toFixed(2)}%</td>
                                    <td style={{ color: parseFloat(c.change_percent_24h) > 0 ? "green" : parseFloat(c.change_percent_24h) < 0 ? "red" : "gray" }}>{parseFloat(c.change_percent_24h).toFixed(2)}%</td>
                                    <td style={{ color: parseFloat(c.change_percent_7d) > 0 ? "green" : parseFloat(c.change_percent_7d) < 0 ? "red" : "gray" }}>{parseFloat(c.change_percent_7d).toFixed(2)}%</td>
                                    <td style={{ color: parseFloat(c.change_percent_30d) > 0 ? "green" : parseFloat(c.change_percent_30d) < 0 ? "red" : "gray" }}>{parseFloat(c.change_percent_30d).toFixed(2)}%</td>
                                    <td style={{ color: parseFloat(c.change_percent_60d) > 0 ? "green" : parseFloat(c.change_percent_60d) < 0 ? "red" : "gray" }}>{parseFloat(c.change_percent_60d).toFixed(2)}%</td>
                                    <td style={{ color: parseFloat(c.change_percent_90d) > 0 ? "green" : parseFloat(c.change_percent_90d) < 0 ? "red" : "gray" }}>{parseFloat(c.change_percent_90d).toFixed(2)}%</td>
                                    <td>{parseInt(c.volume_24h).toLocaleString("fa")}</td>
                                    <td>{parseInt(c.market_cap).toLocaleString("fa")}</td>
                                    <td><img className='chart_png' src={c.chart_24h} alt="" /></td>
                                </tr>
                            )
                        })

                        }

                    </tbody>
                </table>


            </section>
        </>
    )
}

export default page