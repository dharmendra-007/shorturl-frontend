'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '../common/navbar';
import Footer from '../common/footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/login', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <div className='px-10'>
      {!shouldHideNavbar && <Navbar />}
      {children}
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}
