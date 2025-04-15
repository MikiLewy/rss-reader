import { ScanText } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-8 px-4 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <ScanText />
        <h2 className="text-2xl font-bold">RSS reader</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
