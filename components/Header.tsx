/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Header = () => {
  return (
    <header className='container nav-header'>
      <a
        href="/"
        className="icon"
        target="_blank"
        rel="noreferrer"
      >
        GSAP Things
      </a>
      <ul>
        <li>
          <Link target='_blank' href="https://github.com/duythenights">Github</Link>
        </li>
        <li>
          <Link target='_blank' href="https://dhduydev.vercel.app/">Website</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
