import React, { useState, useRef } from "react";
import "../styles/sliderdemo.css";

const SliderDemo = () => {
  const [price, setPrice] = useState(50);
  const sliderRef = useRef(null);

  // Calculate thumb position as a percentage
  const getThumbPosition = () => `${price}%`;

  // Handle drag
  const handleDrag = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    let percent = ((x - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPrice(Math.round(percent));
  };

  // Mouse/touch event handlers
  const startDrag = (e) => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  };
  const stopDrag = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  };

  return (
    <div className="slider-demo-container">
      <h2>Price Range Slider Demo</h2>
      <div className="slider-section">
        <div
          className="custom-slider-track"
          ref={sliderRef}
          onClick={handleDrag}
          style={{ position: 'relative', width: 300, height: 8, background: '#ddd', borderRadius: 4 }}
          data-testid="price-slider-track"
        >
          <div
            className="custom-slider-thumb"
            data-testid="price-slider-thumb"
            style={{
              position: 'absolute',
              left: `calc(${getThumbPosition()} - 10px)`,
              top: -6,
              width: 20,
              height: 20,
              background: '#1976d2',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            role="slider"
            aria-valuenow={price}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          />
        </div>
        <div className="price-label">Selected Price: ${price}</div>
      </div>
    </div>
  );
};

export default SliderDemo;
