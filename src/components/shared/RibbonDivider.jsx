import { motion } from 'framer-motion';

export default function RibbonDivider({ variant = 'horizontal', className = '' }) {
  if (variant === 'vertical') {
    return (
      <div className={`relative flex justify-center w-full pointer-events-none overflow-hidden my-4 ${className}`}>
        <svg
          viewBox="0 0 100 400"
          className="w-20 h-96 opacity-60 text-primary"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0 C20 80, 80 160, 50 240 C20 320, 80 360, 50 400"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animated-ribbon-path"
          />
          <path
            d="M50 0 C80 80, 20 160, 50 240 C80 320, 20 360, 50 400"
            stroke="#A78BCD"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none py-3 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        className="w-full max-w-7xl h-14 md:h-20 text-primary opacity-60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9748D" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#C9748D" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#A78BCD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9748D" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Fita secundária com tracejado suave */}
        <path
          d="M0 60 C200 10, 400 110, 600 60 C800 10, 1000 110, 1200 60"
          stroke="url(#ribbonGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animated-ribbon-path"
        />

        {/* Detalhe de fita entrelaçada fina */}
        <path
          d="M0 60 C200 110, 400 10, 600 60 C800 110, 1000 10, 1200 60"
          stroke="#F5EDE3"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Pequenos nós / laços decorativos ao longo do traçado */}
        <circle cx="300" cy="55" r="4" fill="#C9748D" opacity="0.8" />
        <circle cx="600" cy="60" r="5" fill="#A78BCD" opacity="0.9" />
        <circle cx="900" cy="65" r="4" fill="#C9748D" opacity="0.8" />
      </svg>
    </div>
  );
}
