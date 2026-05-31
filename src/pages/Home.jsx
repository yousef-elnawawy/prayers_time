import { useState, useEffect } from "react";
import cities from "../data/cities";

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
  const [currentTime, setCurrentTime] = useState("");
  const [dateInfo, setDateInfo] = useState({ date: "", hijriDate: "" });
  const [selectedCity, setSelectedCity] = useState("cairo");
  const [nextPrayer, setNextPrayer] = useState("");
  const [remainingTime, setRemainingTime] = useState("");


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

useEffect(() => {
  const updateClock = () => {
    const cityData = cities.find(
      (city) => city.apiName === selectedCity
    );

    const time = new Date().toLocaleTimeString("ar-EG", {
      timeZone: cityData?.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    setCurrentTime(time);
  };

  updateClock();

  const interval = setInterval(updateClock, 1000);

  return () => clearInterval(interval);
}, [selectedCity]);


useEffect(() => {
  if (!times) return;

  const updateNextPrayer = () => {
    const prayers = [
      { name: "الفجر", time: times.Fajr },
      { name: "الظهر", time: times.Dhuhr },
      { name: "العصر", time: times.Asr },
      { name: "المغرب", time: times.Maghrib },
      { name: "العشاء", time: times.Isha }
    ];

    const now = new Date();

    let found = false;

    for (let prayer of prayers) {
      const [hours, minutes] = prayer.time
        .split(":")
        .map(Number);

      const prayerDate = new Date();

      prayerDate.setHours(hours);
      prayerDate.setMinutes(minutes);
      prayerDate.setSeconds(0);

      if (prayerDate > now) {
        found = true;

        const diff = prayerDate - now;

        const hoursLeft = Math.floor(
          diff / 1000 / 60 / 60
        );

        const minutesLeft = Math.floor(
          (diff / 1000 / 60) % 60
        );

        const secondsLeft = Math.floor(
          (diff / 1000) % 60
        );

        setNextPrayer(prayer.name);

        setRemainingTime(
          `${hoursLeft
            .toString()
            .padStart(2, "0")}:${minutesLeft
            .toString()
            .padStart(2, "0")}:${secondsLeft
            .toString()
            .padStart(2, "0")}`
        );

        break;
      }
    }

    // لو خلصت كل الصلوات → الفجر بكرة
    if (!found) {
      const [hours, minutes] = times.Fajr
        .split(":")
        .map(Number);

      const fajrDate = new Date();

      fajrDate.setDate(fajrDate.getDate() + 1);

      fajrDate.setHours(hours);
      fajrDate.setMinutes(minutes);
      fajrDate.setSeconds(0);

      const diff = fajrDate - now;

      const hoursLeft = Math.floor(
        diff / 1000 / 60 / 60
      );

      const minutesLeft = Math.floor(
        (diff / 1000 / 60) % 60
      );

      const secondsLeft = Math.floor(
        (diff / 1000) % 60
      );

      setNextPrayer("الفجر");

      setRemainingTime(
        `${hoursLeft
          .toString()
          .padStart(2, "0")}:${minutesLeft
          .toString()
          .padStart(2, "0")}:${secondsLeft
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  updateNextPrayer();

  const interval = setInterval(updateNextPrayer, 1000);

  return () => clearInterval(interval);
}, [times]);



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
      <div className="flex justify-between items-center">
      <p className="text-3xl text-emerald-700 font-bold mt-2">
  {currentTime}
</p>
<div>
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
      </div>
    <br />
    <hr className="border-green-700" />

<div className="mt-4">
  <p className="text-xl text-gray-700">
    الصلاة القادمة:
    <span className="text-emerald-700 font-bold">
      {" "}{nextPrayer}
    </span>
  </p>

  <p className="text-3xl font-bold text-green-800 mt-2">
    متبقي {remainingTime}
  </p>
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
