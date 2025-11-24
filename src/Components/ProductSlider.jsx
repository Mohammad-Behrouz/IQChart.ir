'use client';

import { useState } from 'react';

const ProductSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider-container">
      <div className="main-image-container">
        <button className="nav-btn right" onClick={nextSlide}>⟩</button>
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="main-image"
        />
        <button className="nav-btn left" onClick={prevSlide}>⟨</button>
      </div>

      <div className="thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumb ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .slider-container {
          width: 500px;
          height :80%;
          margin: 20px auto;
        }

        .main-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .main-image {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          border-radius: 10px;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0,0,0,0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 20px;
          z-index: 2;
        }

        .nav-btn.left {
          left: 10px;
        }

        .nav-btn.right {
          right: 10px;
        }

        .thumbnails {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .thumb {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border 0.2s;
        }

        .thumb.active {
          border-color: #0070f3;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
