"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import "./footer.css";

// Đăng ký plugin (Kiểm tra window để tránh lỗi SSR)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // Các đường dẫn SVG (Path data)
  const paths = {
    down: "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z",
    center: "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z",
  };

  useGSAP(
    () => {
      // Hàm xử lý chung cho cả 2 hướng cuộn
      const triggerBounce = (self: ScrollTrigger) => {
        const velocity = self.getVelocity();
        // Lấy trị tuyệt đối vì cuộn lên velocity sẽ mang giá trị âm
        const variation = Math.min(Math.abs(velocity / 10000), 0.5);

        gsap.fromTo(
          "#bouncy-path",
          { morphSVG: paths.down },
          {
            duration: 2,
            morphSVG: paths.center,
            ease: `elastic.out(${1 + variation}, ${0.8 - variation})`,
            overwrite: "auto",
          }
        );
      };

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top bottom", 
        onEnter: (self) => triggerBounce(self),   
      });
    },
    { scope: footerRef }
  );

  return (
    <div className="footer" ref={footerRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="footer-img"
        preserveAspectRatio="none"
        viewBox="0 0 2278 683"
      >
        <defs>
          <linearGradient
            id="grad-1"
            x1="0"
            x2="0"
            y1="0"
            y2="683"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00bae2" />
            <stop offset="1" stopColor="var(--color-surface25)" />
          </linearGradient>
        </defs>
        <path
          id="bouncy-path"
          fill="url(#grad-1)"
          d="M0-.3S464 156 1139 156 2278-.3 2278-.3V683H0z"
        ></path>
      </svg>
    </div>
  );
}