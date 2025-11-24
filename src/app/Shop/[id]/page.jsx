"use client";

import React, { useEffect, useState } from 'react'
import Nav from '@/Components/Nav';
import Stack from '@/Components/Stack';
import ProductSlider from '@/Components/ProductSlider';
import "../../../style/shop.css"
import Stepper, { Step } from '@/Components/Stepper';
import Skeleton from 'react-loading-skeleton'
import NotFound from './not-found';
import { notFound } from 'next/navigation';
const page = ({ params }) => {
    const { id } = React.use(params);
    const [product, setProduct] = useState();
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [onlineDelivery, setOnlineDelivery] = useState(true)
    const [address, setAddress] = useState("")

    const [tab, setTabs] = useState(1)

    useEffect(() => {

        const fetchProduct = async () => {
            const res = await fetch("https://localhost:7282/api/product/ " + id)
            const json = await res.json()
            if (res.ok) {
                console.log("oka");

                setProduct(json)
                const baseUrl = "https://localhost:7282";
                setImages(json.images.map(path => `${baseUrl}${path}`))
                setIsLoading(false)
            } else {
                return notFound()
            }
        }
        fetchProduct()
        console.log(images);

    }, [])

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <>
            <section className="product-container">
                <div id='product-container-div' >
                    <div className="slideshow">
                        {images.length == 0 ?
                            <Skeleton width={500} height={500} />
                            :
                            <ProductSlider images={images} />
                        }
                    </div>
                    <div id='other-info-product-container'>
                        <div id='other-info-product-container-div'>
                            <div className='product-info-div'>
                                {isLoading ? (
                                    <Skeleton width={300} height={100} />
                                ) : (
                                    <>
                                        <h5>{product.name}</h5>
                                        <div className='tab-p'>
                                            <div>
                                                <button onClick={() => setTabs(1)} className={`tab-btns-p ${tab == 1 ? "active-tab" : ""}`}>توضیحات</button>
                                                <button onClick={() => setTabs(2)} className={`tab-btns-p ${tab == 2 ? "active-tab" : ""}`}>نظرات</button>
                                            </div>
                                            <button className={`btn btn-success ${tab == 1 ? "hide" : "show"}`}>ثبت نظرات</button>
                                        </div>
                                        {tab == 1 ? (
                                            <>
                                                <p className='product-description'>{product.description}</p>
                                            </>
                                        ) :
                                            <>

                                            </>

                                        }
                                    </>
                                )}
                                {/* <h5>{product.name || ""} </h5> */}
                            </div>
                            <div style={{ width: "50%" }}>

                                <Stepper
                                    initialStep={1}
                                    onStepChange={(step) => {
                                        console.log(step);
                                    }}
                                    onFinalStepCompleted={() => console.log("All steps completed!")}
                                    backButtonText="قبلی"
                                >
                                    <Step>
                                        <h2>خرید  </h2>
                                        <p>با انجام چند مرحله کوتاه میتوانید  این محصول را سفارش داده و درب منزل خود تحویل بگیرید </p>
                                    </Step>
                                    <Step>
                                        <h6>تحویل بصورت حضوری یا درب منزل </h6>
                                        <div className="form-check rtl">
                                            <label className="form-check-label rtl" for="radioDefault1">
                                                بصورت حضوری
                                            </label>
                                            <input className="form-check-input" checked={onlineDelivery == false} onChange={() => setOnlineDelivery(false)} type="radio" name="radioDefault" id="radioDefault1" />
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label" for="radioDefault2">
                                                تحویل در درب منزل
                                            </label>
                                            <input className="form-check-input" checked={onlineDelivery == true} onChange={() => setOnlineDelivery(true)} type="radio" name="radioDefault" id="radioDefault2" />
                                        </div>
                                    </Step>
                                    <Step>
                                        <h4>شماره تلفن گیرنده محصول</h4>
                                        <input type="email" className="form-control" id="exampleFormControlInput1 mb-2" placeholder="09123456789" />
                                        <br />
                                    </Step>
                                    <Step>
                                        <h4>آدرس گیرنده محصول</h4>
                                        <textarea className="form-control" value={address} onChange={(e) => handleAddress(e)} placeholder="" id="floatingTextarea2" style={{ height: "90%" }}></textarea>
                                        <br />
                                        <br />
                                    </Step>
                                </Stepper>
                            </div>
                        </div>
                        <div id='guaranty'>
                            <span><img src="/Images/Shop/guaranty.svg" alt="" /> ضمانت اصالت کالا</span>
                            <span><img src="/Images/Shop/cart-return.svg" alt="" />ضمانت بازگشت</span>
                            <span><img src="/Images/Shop/delivery-fast.svg" alt="" /> تحویل سریع</span>
                            <span><img src="/Images/Shop/hand-card.svg" alt="" />خرید و پرداخت امن</span>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default page
