import { registerAS } from '@nest/config';

export default registerAS('db', () => ({
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    db: process.env.DB,
}));
