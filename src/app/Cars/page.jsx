"use client"

import Nav from '@/Components/Nav'
import React, { useEffect, useState } from 'react'
import { api_token_sourceArena } from '@/JavaScript/defaultFuncs'
import "../../style/cars.css"
import "../../style/app.css"
import { parse } from 'postcss'
import Skeleton from "react-loading-skeleton"
import "../../style/app.css"

const page = () => {
    const [cars, setCars] = useState([])
    const [IranianCars, setIranianCars] = useState([])
    const [ForeignCars, setForeignCars] = useState([])

    const [searchIranian, setSearchIranian] = useState("")

    const [isLoading, setIsloading] = useState(true)

    const iranian_car_cid = new Set([11295, 11284, 11029, 11299, 11288, 11279, 11297, 11324, 11076, 11281]);
    const foreign_car_cid = new Set([11217, 11041, 11219, 10975, 11051, 11211, 11233, 11228, 11235, 11231]);

    const filteredCars = cars.filter((car) =>
        `${car.type} ${car.model} ${car.trim_fa}`
            .toLowerCase()
            .includes(searchIranian.toLowerCase())
    );


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch(api_token_sourceArena() + "car=all");
                const json = await res.json();

                setCars(json);

                const iranian = [];
                const foreign = [];

                const seenCids = new Set();

                for (const car of json) {
                    const cid = car.cid;

                    if (seenCids.has(cid)) continue;

                    if (iranian_car_cid.has(cid)) {
                        iranian.push(car);
                        seenCids.add(cid);
                    } else if (foreign_car_cid.has(cid)) {
                        foreign.push(car);
                        seenCids.add(cid);
                    }
                }

                console.log(iranian);
                console.log(foreign);

                setIranianCars(iranian);
                setForeignCars(foreign);
                setIsloading(false);
            } catch (err) {
                console.error("خطا در دریافت اطلاعات:", err);
            }
        };
        fetchCars()
    }, [])

    return (
        <>
            <div className="container-of-cars">
                <div className='container-of-cars-div'>
                    <div className="most-view-cars-header">
                        <h4 className='iran-sans-font'>ماشین های پربازدید داخلی {!isLoading ? `(آخرین آپدیت ${cars[0].last_update})` : (<Skeleton width={200} height={20} />)}</h4>
                        <div className='search_cars'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" value={searchIranian} onChange={e => setSearchIranian(e.target.value)} placeholder='جستجوی ماشین ...' />
                        </div>
                    </div>
                    <div className="iranian-cars car-show">
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton key={index} width={400} height={150} />
                            ))
                        ) : (
                            (searchIranian === "" ? IranianCars : filteredCars).map((car, index) => (
                                <div key={index} className="car-div">
                                    <div className="price-and-name-car">
                                        <h3 className="iran-yekan-bold">
                                            {car.type}{" "}
                                            {{
                                                plus: "پلاس",
                                                manuals: "دنده ای",
                                                soren: "سورن",
                                                g: "G",
                                                sr: "SR",
                                                gautomatic: "G اتوماتیک",
                                                pickup: "وانت",
                                                v1p: "V1 دستی",
                                            }[car.model] || car.model}
                                        </h3>

                                        <div className="price-show-car">
                                            <b>{Number(car.price).toLocaleString("fa")}</b>

                                            <span className="ltr change_percent iran-sans-font">
                                                {parseInt(car.change_percent) > 0 ? (
                                                    <span style={{ color: "green" }}>
                                                        <i className="fa-solid fa-triangle"></i> +{car.change_percent}%
                                                    </span>
                                                ) : parseInt(car.change_percent) < 0 ? (
                                                    <span style={{ color: "red" }}>
                                                        <i
                                                            className="fa-solid fa-triangle"
                                                            style={{ transform: "rotate(180deg)" }}
                                                        ></i>{" "}
                                                        -{Math.abs(car.change_percent)}%
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "gray" }}>
                                                        <i className="fa-solid fa-circle"></i> ۰٪
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="car-description">
                                        <span style={{ fontSize: "15px" }}>{car.description}</span>
                                        <span>مدل {car.year}</span>
                                    </div>
                                </div>
                            ))
                        )}


                    </div>
                    <div className="most-view-cars-header">
                        <h4 className='iran-sans-font'>ماشین های پربازدید خارجی {!isLoading ? `(آخرین آپدیت ${cars[0].last_update})` : (<Skeleton width={200} height={20} />)}</h4>
                        {/* <div className='search_cars'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" calue placeholder='جستجوی ماشین ...' />
                        </div> */}
                    </div>
                    <div className="iranian-cars car-show">
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width={400}
                                    height={150}
                                />
                            ))
                        ) : (
                            ForeignCars.map((car, index) => (
                                <div key={index} className='car-div'>
                                    <div className='price-and-name-car'>
                                        <h3 className='iran-yekan-bold'>
                                            {car.type}  {{
                                                fx: "FX",
                                                elite: "Elite",
                                                prime: "Prime",
                                                g: "G",
                                                sr: "SR",
                                                gautomatic: "G اتوماتیک",
                                                s3: "S3",
                                                s5: "S5"
                                            }[car.model] || car.model}
                                        </h3>

                                        <div className='price-show-car'>
                                            <b>{Number(car.price).toLocaleString("fa")}</b>

                                            <span className='ltr change_percent iran-sans-font'>
                                                {parseInt(car.change_percent) > 0 ? (
                                                    <span style={{ color: "green" }}>
                                                        <i className="fa-solid fa-triangle"></i> +{car.change_percent}%
                                                    </span>
                                                ) : parseInt(car.change_percent) < 0 ? (
                                                    <span style={{ color: "red" }}>
                                                        <i className="fa-solid fa-triangle" style={{ transform: "rotate(180deg)" }}></i> -{Math.abs(car.change_percent)}%
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "gray" }}>
                                                        <i className='fa-solid fa-circle'></i> ۰٪
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='car-description'>
                                        <span>{car.description}</span>
                                        <span>مدل {car.year}</span>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div >
        </>
    )
}

export default page