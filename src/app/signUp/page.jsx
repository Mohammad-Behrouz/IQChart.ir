"use client";

import Nav from '@/Components/Nav';
import React, { useState, useEffect } from 'react';
import '../../style/login.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { elements } from 'chart.js';


const Alertify = dynamic(() => import('alertifyjs'), {
    ssr: false,
});

const Page = () => {
    const [errorMsg, setErrorMsg] = useState({});
    const [alertifyInstance, setAlertifyInstance] = useState(null);

    // بارگذاری Alertify.js و تنظیم نمونه
    useEffect(() => {
        import('alertifyjs').then((module) => {
            const alertify = module.default;
            // تنظیمات برای زبان فارسی
            alertify.defaults.glossary.title = 'هشدار';
            alertify.defaults.glossary.ok = 'تأیید';
            alertify.defaults.glossary.cancel = 'لغو';
            setAlertifyInstance(alertify);
        });
    }, []);

    const isValidPhoneNumber = (phone) => {
        const regex = /^09\d{9}$/;
        return regex.test(phone);
    };

    async function submitSignUp(event) {
        event.preventDefault();

        const form = event.target;

        if (
            form.elements.name.value === "" ||
            form.elements.phone.value === "" ||
            form.elements.password.value === "" ||
            form.elements.pass_repeat.value === ""
        ) {
            alertifyInstance.error("لطفا مقادیر مدنظر را پرکنید");
            return;
        }

        if(form.elements.password.value.length <= 6){
            alertifyInstance.error(" ! پسورد نباید کمتر از 6 کارکتر باشه ");
            return;
        }
        
        if(form.elements.pass_repeat.value != form.elements.password.value){
            alertifyInstance.error(" ! پسورد با تکرارش تطابق ندارد ");
            return;
        }
        

        try {
            const data = new URLSearchParams();
            data.append('name', form.elements.name.value);
            data.append('phone', form.elements.phone.value);
            data.append('password', form.elements.password.value);
            data.append('pass_repeat', form.elements.pass_repeat.value);

            const res = await fetch('https://localhost:7282/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data.toString(),
            });

            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                setErrorMsg(json.errors || { general: ['خطایی رخ داده است'] });
                alertifyInstance.error('! خطا در ثبت نام');
                alertifyInstance.error('! اگر اکانت دارید لطفا وارد شوید');
            } else {
                setErrorMsg({});
                alertifyInstance.success('ثبت‌نام با موفقیت انجام شد');
                alertifyInstance.success('لطفا وارد شوید');
            }
        } catch (error) {
            console.error('خطا در ارسال درخواست:', error);
            setErrorMsg({ general: ['ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.'] });
            alertifyInstance.error('ارتباط با سرور برقرار نشد!');
        }
    }

    return (
        <>
            <Nav />
            <div id="login-container">
                <div id="login-div">
                    <div id="signUp-SubDiv">
                        <img src="/Images/logo-vertical.png" alt="" />
                    </div>
                    <div id="login-SubDiv">
                        <h3>ثبت نام</h3>
                        <form onSubmit={submitSignUp}>
                            <div>
                                <input type="text" placeholder="نام و نام خانوادگی" name="name" />
                                <i className="fa-solid fa-at"></i>
                            </div>
                            <div>
                                <input type="text" placeholder="شماره تلفن" name="phone" />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <input type="password" placeholder="رمز عبور" name="password" />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <div>
                                <input type="password" placeholder="تکرار رمز عبور" name="pass_repeat" />
                                <i className="fa-solid fa-lock"></i>
                            </div>

                            <button type="submit" className="common-button" style={{ width: '70%' }}>
                                ثبت نام
                            </button>
                        </form>
                        <span style={{ color: 'black', fontSize: '12px' }}>
                            اکانت داری؟{' '}
                            <Link href="/login" style={{ fontSize: '14px', fontWeight: 'bold', color: '#000f51' }}>
                                ورود
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;