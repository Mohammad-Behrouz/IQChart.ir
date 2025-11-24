 "use client";

import Nav from "@/Components/Nav";
import Link from "next/link";
import { useState } from "react";
import "../../style/admin.css"

function layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Nav />
            <nav className={`admin-panel-nav ${isOpen ? 'open-nav' : ''}`}>
                <button
                    className={`hamburger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className="layoutListUl">
                    <li className="layoutListLi">
                        <Link href="/Admin/users">
                            <i className="fa-solid fa-users"></i>
                            <span>کاربران</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link href="/Admin/messages">
                            <i className="fa-solid fa-messages"></i>
                            <span>پیام ها</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link href="/Admin/plans">
                            <i className="fa-solid fa-crown"></i>
                            <span>اشتراک ها</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link href="/Admin/products">
                            <i className="fa-solid fa-box"></i>
                            <span>محصولات</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link href="/Admin/educations">
                            <i className="fa-solid fa-graduation-cap"></i>
                            <span>کاربران</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </>
    )
}

export default layout
