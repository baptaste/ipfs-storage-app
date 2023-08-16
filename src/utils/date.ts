const fullOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
};

const shortOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export const formatDate = (date: string, time = false, locale?: string): string => {
  const options = time ? fullOptions : shortOptions;
  return new Intl.DateTimeFormat(locale ?? "default", options).format(new Date(date));
};
