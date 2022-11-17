
const config = {
    development: {
        apiUrl: "http://localhost:8080"
    },

    production: {
        apiUrl: process.env.API_URL
    },
    test: {
        apiUrl: ''
    }
}

export default config;