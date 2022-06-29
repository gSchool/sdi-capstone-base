import server from './server.js';
import chalk from 'chalk';

const PORT = process.env.PORT || 8082;

server.listen(PORT, () => {
    console.log(chalk.green(`Server running in ${process.env.NODE_ENV} mode and listening on ${PORT}`));
})
