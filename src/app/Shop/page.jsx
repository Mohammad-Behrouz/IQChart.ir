"use client";
import Nav from '@/Components/Nav';
import React, { useState, useEffect } from 'react'
import "../../style/shop.css"
import Foooter from '@/Components/Foooter';
import Link from 'next/link';

const page = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://localhost:7282/api/product/all");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                alertify.error("خطا در دریافت محصولات");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);


    return (
        <>
            <div className='shop-header'>
                <h2 >فروشگاه آیکیو چارت</h2>
                <p>در این فروشگاه می‌توانید کتاب‌هایی با موضوع تاریخچه ترید، تحلیل بازار، روان‌شناسی معامله‌گری و دیگر منابع ارزشمند  را تهیه کنید. همچنین انواع ابزارها و لوازم مرتبط با دنیای ترید و سرمایه‌گذاری نیز در این مجموعه عرضه می‌شوند تا به علاقه‌مندان این حوزه کمک کند مسیر حرفه‌ای‌تری را طی کنند.</p>
            </div>
            <div className="product-container">
                <div className='all-products-shop'>
                    {products.map((p, index) => {
                        return (
                            <Link href={/Shop/ + p.id} className='product-show-shop' key={index}>
                                <img src={`https://localhost:7282/${p.images[0]}  `} alt="" />
                                <h4>{p.name}</h4>
                                <div className='price-info'>
                                    {
                                        p.discount == 0
                                            ?
                                            <>
                                                <span>  <b>{p.price.toLocaleString("fa-IR")}</b> تومان</span><br /><br />
                                            </>
                                            :
                                            <span>

                                                <b>{((p.price * (100 - p.discount)) / 100).toLocaleString("fa-IR")}</b> تومان
                                                <br />
                                                <button className='discount-num-show'>{p.discount}%</button> <s className='sm gray text-body-tertiary'>{p.price.toLocaleString("fa-IR")}</s>

                                            </span>
                                    }
                                </div>
                                <button className='common-button'>اطلاعات محصول </button>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <Foooter />
        </>
    )
}

export default page