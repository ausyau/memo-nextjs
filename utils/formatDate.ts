export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;

  const formattedDate = `${month} ${day} @ ${hour}:${
    minute < 10 ? "0" : ""
  }${minute} ${ampm}`;
  return formattedDate;
};
