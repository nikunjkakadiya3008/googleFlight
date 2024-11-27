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

