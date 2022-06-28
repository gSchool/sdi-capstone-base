import { listen } from './app';
const PORT = process.env.PORT || 8082;

listen(PORT, () => {
    console.log(`Server running and listening on ${PORT}`);
})
