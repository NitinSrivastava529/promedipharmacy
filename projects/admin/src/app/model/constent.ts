export const constant = {
    API_URL:window.location.origin.includes('localhost') ? 'http://localhost:5111/' :window.location.origin,
    ROOT_URL:window.location.origin.includes('localhost') ? 'http://localhost:4200/' : window.location.origin,
} 