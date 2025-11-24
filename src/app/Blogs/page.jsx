"use client";
import Nav from '@/Components/Nav';
import React, { useState, useEffect } from 'react';
import "../../style/shop.css";
import Foooter from '@/Components/Foooter';
import Link from 'next/link';
import "../../style/article.css"
import "../../style/Blog.css"

export const dynamic = 'force-dynamic';

const Page = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("https://localhost:7282/api/article/all");
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                const alertify = (await import('alertifyjs')).default;
                alertify.error("خطا در دریافت مقالات");
                console.error(err);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <div className='shop-header'>
                <h2>مجله آیکیو چارت</h2>
                <p>
                    در مجله آیکیو چارت، جدیدترین مطالب، تحلیل‌ها و آموزش‌های کاربردی در زمینه بازارهای مالی، رمزارزها، بورس، فارکس و روان‌شناسی معامله‌گری ارائه می‌شود. هدف ما در این مجله، ارتقاء سطح دانش و بینش معامله‌گران و سرمایه‌گذاران ایرانی است تا بتوانند تصمیمات هوشمندانه‌تر و حرفه‌ای‌تری در مسیر معاملاتی خود اتخاذ کنند. با دنبال‌کردن مقالات تخصصی، بررسی‌های روز بازار و نکات آموزشی، همیشه یک قدم جلوتر از دیگران باشید.
                </p>
            </div>
            <div className="product-container">
                <h3>آخرین مقالات</h3>
                <div className='all-articles'>
                    {articles.map((article, index) => (
                        <Link href={`/Blogs/${article.slug}`} className='article-show-all' key={index}>
                            <img src={`https://localhost:7282/${article.coverImageUrl}`} alt={article.title} />
                            <h3>{article.title}</h3>
                            <p className='summary-text'>{article.summary.slice(0, 80)}...</p>
                            <button className='common-button'>مشاهده مقاله</button>
                        </Link>
                    ))}
                </div>
            </div>
            <Foooter />
        </>
    );
};

export default Page;
