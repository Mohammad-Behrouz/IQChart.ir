"use client";

import Nav from '@/Components/Nav'
import React, { useState, useEffect } from 'react'
import '../../style/login.css'
import Link from 'next/link';

const page = () => {
    const [errorMsg, setErrorsMsg] = useState("")
    const [alertifyInstance, setAlertifyInstance] = useState(null);

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

    const submitLogin = async (e) => {
        e.preventDefault()

        const form = e.target;

        if (
            form.elements.phone.value === "" ||
            form.elements.password.value === ""
        ) {
            alertifyInstance.error("لطفا مقادیر مدنظر را پرکنید");
            return;
        }

        if (form.elements.password.value.length <= 6) {
            alertifyInstance.error(" ! پسورد نباید کمتر از 6 کارکتر باشه ");
            return;
        }

        const formData = new FormData(form)

        try {
            const res = await fetch("https://localhost:7282/api/Login", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();

                if (!res.ok) {
                    alertifyInstance.error(data.error || "خطای ورود");
                } else {
                    alertifyInstance.success("لاگین موفقیت‌آمیز بود");
                    const fetchLogin = async () => {
                        var res2 = await fetch("https://localhost:7282/api/Login", {
                            method: "Get",
                            credentials: "include"
                        })
                        var json2 = await res2.json()
                        console.log(json2.loggedIn);


                        if (json2.loggedIn == "y") {
                            alertifyInstance.success("لاگین شده")
                            setLoggedIn(json2.name.toString())
                        } else if (json2.loggedIn == "n") {
                            alertifyInstance.error("لاگین نشده")
                            console.log(json2.message)
                            console.log(json2.Role)
                            // setLoggedIn("حساب کاربری")
                        }


                    }

                    fetchLogin()
                }
            } else {
                const text = await res.text();
                console.log("متن پاسخ:", text);
                alertifyInstance.error("خطا از سرور: " + text);
            }

        } catch (error) {
            console.log("خطای سمت کلاینت:", error);
            alertifyInstance.error("ارتباط با سرور برقرار نشد");
        }


    }
    return (
        <>
            <Nav />
            <div id='login-container'>
                <div id="login-div">
                    <div id="login-SubDiv">
                        <h3>ورود | ثبت نام</h3>
                        <p>
                            ! سلام <br />
                            لطفا شماره تلفن خود را وارید نمایید
                        </p>
                        <form onSubmit={submitLogin}>

                            <div>
                                <input type="text" placeholder='شماره تلفن' name='phone' />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <input type="text" placeholder='رمز عبور' name='password' />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <span>{errorMsg}</span>
                            <button type='submit' className="common-button" style={{ width: "70%" }}>ورود</button>
                        </form>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            اکانت نداری ؟&nbsp;
                            <Link href="/signUp" style={{ fontSize: "14px", fontWeight: "bold", color: "#000f51" }}>ثبت نام</Link>
                        </span>
                    </div>
                    <div id="signUp-SubDiv">
                        <img src="/Images/logo-vertical.png" alt="" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default page