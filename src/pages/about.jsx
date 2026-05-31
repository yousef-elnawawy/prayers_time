import {
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function About() {
  return (
    <div className="container mx-auto mt-24 p-6">

      {/* العنوان */}
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
        عن التطبيق
      </h1>

      <p className="text-gray-700 text-lg leading-8 mb-8">
        تطبيق مواقيت الصلاة يساعد المستخدمين على معرفة أوقات الصلاة بدقة حسب المدينة،
        مع عرض الوقت الحالي والوقت المتبقي للصلاة القادمة بشكل مباشر.
      </p>

      {/* عن المطور */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          عن المطور
        </h2>

        <p className="text-gray-700 leading-7 mb-4">
          هذا التطبيق تم تطويره بواسطة <span className="font-bold text-emerald-700">يوسف</span>،
          مطور ومصمم ويب مهتم ببناء تطبيقات حديثة وواجهات مستخدم بسيطة وسريعة.
        </p>

        <p className="text-gray-700 leading-7">
          هذا المشروع هو جزء من رحلة تعلم وتطوير مستمرة في مجال البرمجة وتطوير الويب.
        </p>
      </div>

      {/* السوشيال ميديا بالأيقونات */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          تواصل معي
        </h2>

        <div className="flex gap-6 text-3xl">

          {/* YouTube */}
          <a
            href="https://youtube.com/@جو_نيرد"
            target="_blank"
            className="text-red-600 hover:scale-110 transition"
          >
            <FaYoutube />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/joe._.nerd"
            target="_blank"
            className="text-pink-600 hover:scale-110 transition"
          >
            <FaInstagram />
          </a>

          {/* X */}
          <a
            href="https://x.com/JOE_EGY_NERD"
            target="_blank"
            className="text-black hover:scale-110 transition"
          >
            <FaXTwitter />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/yousef-elnawawy"
            target="_blank"
            className="text-gray-800 hover:scale-110 transition"
          >
            <FaGithub />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/201157961650"
            target="_blank"
            className="text-green-600 hover:scale-110 transition"
          >
            <FaWhatsapp />
          </a>

        </div>
      </div>

    </div>
  );
}