import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root123456",
  database: "messages",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*{.js,.ts}"],
  migrationsTableName: "custom_migrations_table",
  migrations: [__dirname + "/custom-migrations/*{.js,.ts}"],
  subscribers: [],
  cache: true,
});
