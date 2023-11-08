export const TimeRemainingFormatted = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const remaining = end - now;

  if (remaining < 0) {
    return "00:00";
  }
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours} HR, ${formattedMinutes} MIN`;
};

export const TimeRemaining = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const remaining = end - now;

  if (remaining < 0) {
    // Time has already passed
    return -1;
  }

  return remaining;
};

export const MonthConversion = (month: number) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sept";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
};

