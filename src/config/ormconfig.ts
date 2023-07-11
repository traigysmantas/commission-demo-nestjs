import { ConfigModule } from '@nestjs/config';
import dbConfiguration from './database.config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  load: [dbConfiguration],
});

const dataSource = new DataSource(dbConfiguration() as any);

export default dataSource;
