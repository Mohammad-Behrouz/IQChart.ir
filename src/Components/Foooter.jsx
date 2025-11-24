"use client";

import React from 'react';
import Link from 'next/link';
import '../style/footer.css';

const Foooter = () => {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(135deg, #260599 0%, #0042F6 50%, #0340f2 100%)',
      color: 'white',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '80px 20px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '50px',
          marginBottom: '50px'
        }}
          className="footer-grid"
        >
          <div>
            <div style={{ marginBottom: '30px' }}>
              <img
                src="/Images/IQChart_logo_rtl_white.png"
                alt="آی کیو چارت"
                style={{ width: '150px', height: 'auto' }}
              />
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.8',
              fontSize: '15px',
              marginBottom: '25px',
              fontWeight: '500'
            }}>
              تحلیل هوشمند، تصمیم دقیق
            </p>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '2',
              fontSize: '14px',
              marginBottom: '30px'
            }}>
              پلتفرم جامع تحلیل بازارهای مالی با استفاده از هوش مصنوعی و یادگیری ماشین برای تصمیم‌گیری‌های بهتر در سرمایه‌گذاری
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '25px'
            }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-brands fa-telegram" style={{ fontSize: '18px' }}></i>
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-brands fa-instagram" style={{ fontSize: '18px' }}></i>
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-brands fa-linkedin" style={{ fontSize: '18px' }}></i>
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-brands fa-twitter" style={{ fontSize: '18px' }}></i>
              </a>
            </div>
          </div>

          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: 'white'
            }}>
              دسترسی سریع
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  صفحه اصلی
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Shop"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  فروشگاه
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Blogs"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  بلاگ‌ها
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Plans"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  تعرفه‌ها
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/login"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  ورود / ثبت نام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: 'white'
            }}>
              بازارها
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Bourse"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <img src="/svg/Bourse.svg" alt="" style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                  بازار بورس
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Crypto"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <i className="fa-brands fa-bitcoin" style={{ fontSize: '16px', marginLeft: '8px' }}></i>
                  ارز دیجیتال
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/gold"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <img src="/svg/tala.svg" alt="" style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                  طلا
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <img src="/svg/Forex.svg" alt="" style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
                  فارکس
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Cars"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <i className="fa-solid fa-car" style={{ fontSize: '16px', marginLeft: '8px' }}></i>
                  خودرو
                </Link>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <Link
                  href="/Arz"
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.paddingRight = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.paddingRight = '0';
                  }}
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '10px' }}></i>
                  <i className="fa-solid fa-dollar-sign" style={{ fontSize: '16px', marginLeft: '8px' }}></i>
                  بازار ارز
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: 'white'
            }}>
              تماس با ما
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <i className="fa-solid fa-envelope" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}></i>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
                  info@iqchart.com
                </span>
              </li>
              <li style={{
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <i className="fa-solid fa-phone" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}></i>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px' }}>
                  041-12345678
                </span>
              </li>
              <li style={{
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <i className="fa-solid fa-location-dot" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', marginTop: '3px' }}></i>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', lineHeight: '1.8' }}>
                  آذربایجان شرقی ، بناب ،  شهر سرمایه
                </span>
              </li>
              <li style={{
                marginTop: '30px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px'
                }}>
                  <i className="fa-solid fa-headset" style={{ fontSize: '18px', color: 'white' }}></i>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                    پشتیبانی 24/7
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '12px',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  ما همیشه آماده پاسخگویی به سوالات شما هستیم
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <Link
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              قوانین و مقررات
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>|</span>
            <Link
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              حریم خصوصی
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>|</span>
            <Link
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              درباره ما
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>|</span>
            <Link
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              تماس با ما
            </Link>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '13px',
            margin: 0
          }}>
            © {new Date().getFullYear()} آی کیو چارت. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>


    </footer>
  );
}

export default Foooter;
