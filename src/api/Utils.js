
export const prepareHeaders = (headers) => {
    headers.set('x-rapidapi-key', process.env.REACT_APP_API_KEY);
    headers.set('x-rapidapi-host', process.env.REACT_APP_API_HOST);

    return headers;
};