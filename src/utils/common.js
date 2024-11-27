import dayjs from "dayjs";

export const minToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
};

export const dateFormat = (date) => {
    return dayjs(date).format("ddd, MMM D, h:mm A")
};


export const dateToTimeFormat = (date) => {
    return dayjs(date).format("h:mm A")
};

export const calculateDateDifference = (date1, date2, unit = 'minute') =>{
    const d1 = dayjs(date1);
    const d2 = dayjs(date2);
    return d1.diff(d2, unit);
}
