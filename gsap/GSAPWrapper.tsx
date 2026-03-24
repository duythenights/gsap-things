'use client';

import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function GSAPWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
    });
  }, { dependencies: [pathname], revertOnUpdate: true });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}