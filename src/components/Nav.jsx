import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white p-4 shadow-md fixed w-full top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-3xl text-green-700 font-bold cursor-pointer">
            <a href="/">مواقيت الصلاة</a>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex gap-6 text-gray-600 font-medium">
            <li><a className="hover:text-green-600 transition" href="/">الرئيسية</a></li>
            <li><a className="hover:text-green-600 transition" href="/">عن التطبيق</a></li>
            <li><a className="hover:text-green-600 transition" href="/">اتصل بنا</a></li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden cursor-pointer text-3xl text-green-700"
          onClick={() => setOpen(!open)}
        >
          {!open ? <MdMenu /> : <CgClose />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden fixed top-16 right-0 w-full bg-white shadow-lg ${
          open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
          <li>
            <a
              className="block py-2 px-3 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
              onClick={() => setOpen(false)}
              href="/"
            >
              الرئيسية
            </a>
          </li>
          <li>
            <a
              className="block py-2 px-3 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
              onClick={() => setOpen(false)}
              href="/"
            >
              عن التطبيق
            </a>
          </li>
          <li>
            <a
              className="block py-2 px-3 rounded-lg hover:bg-green-100 hover:text-green-700 transition"
              onClick={() => setOpen(false)}
              href="/"
            >
              اتصل بنا
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
