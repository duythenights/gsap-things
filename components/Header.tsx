'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * Primary site header; animates in when scrolling up and hides when scrolling down.
 */
export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const el = headerRef.current;
      if (!el) {
        return;
      }

      const showAnim = gsap
        .from(el, {
          yPercent: -100,
          paused: true,
          duration: 0.2,
        })
        .progress(1);

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        },
      });
    },
    { scope: headerRef },
  );

  return (
    <header ref={headerRef} className="container nav-header">
      <a href="/" className="icon" target="_blank" rel="noreferrer">
        GSAP Things
      </a>
      <ul>
        <li>
          <Link target="_blank" rel="noopener noreferrer" href="https://github.com/duythenights">
            Github
          </Link>
        </li>
        <li>
          <Link target="_blank" rel="noopener noreferrer" href="https://dhduydev.vercel.app/">
            Website
          </Link>
        </li>
      </ul>
    </header>
  );
}
