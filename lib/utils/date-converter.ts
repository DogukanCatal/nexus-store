export const dateConverter = (rawDate: string) => {
  const date = new Date(rawDate);

  // GMT+2'ye çevirmek için Intl.DateTimeFormat kullan
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  //todo change local to i18n when localization is made
  const formatted = new Intl.DateTimeFormat("tr-TR", options).format(date);
  return formatted;
};

//Alternative more easy way
// const shortFormat = new Intl.DateTimeFormat("tr-TR", {
//   timeZone: "Europe/Istanbul",
//   dateStyle: "medium",
//   timeStyle: "short",
// }).format(new Date(rawDate));

// console.log(shortFormat); // örnek: 25 May 2025 15:52
