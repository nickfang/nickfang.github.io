import Image from 'next/image';
import Link from 'next/link';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

// import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <>
      {/* <MainHeaderBackground /> */}
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* <Image src={logoImg} alt="A plate with food on it." priority/> */}
          Nicholas Fang Dev
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/ideas">Playground</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
