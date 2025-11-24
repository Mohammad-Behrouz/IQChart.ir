// components/WaveSvg.jsx
const WaveSvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      id="svg"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      className="transition duration-300 ease-in-out delay-150"
    >
      <defs>
        <linearGradient id="gradient" x1="100%" y1="52%" x2="0%" y2="48%">
          <stop offset="5%" stopColor="#0340f2"></stop>
          <stop offset="95%" stopColor="#0340f2"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 L 0,150 C 216,184 432,218 672,218 C 912,218 1176,184 1440,150 L 1440,400 L 0,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        fillOpacity="1"
        className="transition-all duration-300 ease-in-out delay-150 path-0"
        transform="rotate(-180 720 200)"
      ></path>
    </svg>
  );
};

export default WaveSvg;
