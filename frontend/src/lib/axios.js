//why we use axios instead of fetch? Axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. Here are some reasons why developers often choose Axios over the native Fetch API:
//1. Browser Compatibility: Axios works in all modern browsers, including Internet Explorer, while Fetch is not supported in older browsers without polyfills.
//2. Interceptors: Axios allows you to easily intercept requests and responses, which can be useful for adding headers, logging, or handling errors globally. Fetch does not have built-in support for interceptors.
//3. Automatic JSON Data Transformation: Axios automatically transforms JSON data, while with Fetch, you need to manually call the .json() method on the response to parse it.
//4. Request Cancellation: Axios provides a built-in way to cancel requests using Cancel Tokens, while Fetch does not have a native cancellation mechanism.

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.mode ==="development"?"http:localhost:5000/api": "/api",
    withCredentials: true, // Include cookies in requests which is necessary for authentication and session management 
})

export default axiosInstance;