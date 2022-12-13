const config = {
    development: {
        apiUrl: "http://localhost:8080"
    },

    production: {
        apiUrl: process.env.REACT_APP_API_URL
    },
    test: {
        apiUrl: ''
    }
}

export default config;