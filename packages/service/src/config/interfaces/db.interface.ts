export default interface TypeOrmModuleOptions {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    [propName: string]: any;
}
