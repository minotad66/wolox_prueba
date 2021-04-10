import 'dotenv/config';

const initApp = require('./app');
const PORT = process.env.PORT || 9000;

const app = initApp();

app.listen(PORT, () => console.log('server runing', PORT));

process.on('uncaughtException', (item) => console.log('Error: uncaughtException', item));
process.on('unhandledRejection', (item) => console.log('Error: unhandledRejection', item));
