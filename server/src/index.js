import server from './server';
const PORT = process.env.PORT || 8082;

server.listen(PORT, () => {
    console.log(`Server running and listening on ${PORT}`);
})
