import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */

import "./echo";

import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

window.Echo = new Echo({
	broadcaster: "reverb",
	key: process.env.MIX_REVERB_APP_KEY,
	wsHost: window.location.hostname,
	wsPort: process.env.MIX_REVERB_PORT || 8080,
	forceTLS: false, // 本地开发禁用 HTTPS
	enabledTransports: ["ws", "wss"],
});