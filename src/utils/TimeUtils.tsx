const padLeadingZeros = (num: number, size: number)=> {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export const timeDifferenceFormatting = (time1: Date, time2: Date) => {
  const diffInSeconds = Math.abs((time1.getTime() - time2.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = Math.floor(diffInSeconds) % 60;
  return `${minutes}:${padLeadingZeros(seconds, 2)}`;
}
