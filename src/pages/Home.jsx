import { useState, useEffect } from "react";

// مكون Prayer
function Prayer({ img, title, time }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={img} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-2xl text-emerald-700 font-bold">{time}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [times, setTimes] = useState(null);
  const [dateInfo, setDateInfo] = useState({ date: "", hijriDate: "" });
  const [selectedCity, setSelectedCity] = useState("cairo");

const cities = [
  { displayName: "القاهرة", apiName: "cairo", country: "EG" },
  { displayName: "الرياض", apiName: "riyadh", country: "SA" },
  { displayName: "دبي", apiName: "dubai", country: "AE" },
  { displayName: "بغداد", apiName: "baghdad", country: "IQ" },
  { displayName: "دمشق", apiName: "damascus", country: "SY" },
  { displayName: "الرباط", apiName: "rabat", country: "MA" }
];


  const getCityDisplayName = (apiName) => {
    return cities.find((city) => city.apiName === apiName)?.displayName || "";
  };

  // 🗓️ خريطة ترجمة الشهور الميلادية للعربية
  const monthsArabic = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر"
  };

  const getCityCountry = (apiName) => {
  return cities.find((city) => city.apiName === apiName)?.country || "EG";
};


  // جلب مواقيت الصلاة
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
`https://api.aladhan.com/v1/timingsByCity?country=${getCityCountry(selectedCity)}&city=${selectedCity}`
        );
        const data = await response.json();
        setTimes(data.data.timings);

        // تحديث التاريخ
        const hijriDate = data.data.date.hijri;
        const gregorianDate = data.data.date.gregorian;

        // نجيب الشهر الإنجليزي ونترجمه بالعربي من الكائن
        const monthArabic =
          monthsArabic[gregorianDate.month.en] || gregorianDate.month.en;

        setDateInfo({
          date: `${gregorianDate.day} ${monthArabic} ${gregorianDate.year}`,
          hijriDate: `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`
        });
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  // 🕐 دالة تحويل من 24 إلى 12 ساعة
const convertTo12Hour = (time24) => {
  if (!time24) return "...";
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "م" : "ص";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};


  return (
    <div className="container mx-auto mt-24 p-4">
      <h2 className="text-2xl text-gray-700 font-semibold mb-4">
        مرحبًا بك في تطبيق مواقيت الصلاة
      </h2>
      <hr className="border-green-700" />
      <br />
      <div className="flex justify-center items-center">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 bg-white border border-black rounded"
        >
          {cities.map((city) => (
            <option key={city.apiName} value={city.apiName}>
              {city.displayName}
            </option>
          ))}
        </select>
      </div>
      <br />
      <hr className="border-green-700" />
      <br />
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-light">{dateInfo.date}</p>
          <p className="font-light text-gray-600">{dateInfo.hijriDate}</p>
          <h2 className="text-4xl mt-2 text-emerald-900">
            {getCityDisplayName(selectedCity)}
          </h2>
        </div>
      </main>
      <hr className="border-green-700" />
      <br />
<section className="Main">
  <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <Prayer
      img="pexels-michael-burrows-7129560.jpg"
      title="الفجر"
      time={convertTo12Hour(times?.Fajr)}
    />
    <Prayer
      img="pexels-rayn-l-1656184-3163677.jpg"
      title="الظهر"
      time={convertTo12Hour(times?.Dhuhr)}
    />
    <Prayer
      img="pexels-michael-burrows-7129750.jpg"
      title="العصر"
      time={convertTo12Hour(times?.Asr)}
    />
    <Prayer
      img="pexels-haydan-as-soendawy-730525-2895295.jpg"
      title="المغرب"
      time={convertTo12Hour(times?.Maghrib)}
    />
    <Prayer
      img="pexels-mloky96-36704.jpg"
      title="العشاء"
      time={convertTo12Hour(times?.Isha)}
    />
  </div>
</section>

      <br />
      <hr className="border-green-700" />
      <br />
    </div>
  );
}
