import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './auth/entity/user.entity';
import { Client } from './client/entities/client.entity';
import { AccountVerification } from './auth/entity/account-verification.entity';
import { Counselor } from './counselor/entities/counselor.entity';
import { Article } from './counselor/entities/article.entity';
import { Schedule } from './counselor/entities/schedule.entity';
import { Booking } from './client/entities/booking.entity';
import { Review } from './counselor/entities/review.entity';
import { Payment } from './client/entities/payment.entity';

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: isProduction ? process.env.DATABASE_URL : undefined, // use DATABASE_URL in prod
  host: isProduction ? undefined : process.env.DB_HOST || 'localhost',
  port: isProduction ? undefined : parseInt(process.env.DB_PORT || '5432', 10),
  username: isProduction ? undefined : process.env.DB_USERNAME || 'postgres',
  password: isProduction ? undefined : process.env.DB_PASSWORD,
  database: isProduction
    ? undefined
    : process.env.DB_NAME || 'unityCounsultancyy',
  synchronize: true,
  logging: true,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Render Postgres requires SSL
  entities: [
    User,
    Client,
    AccountVerification,
    Article,
    Booking,
    Counselor,
    Schedule,
    Review,
    Payment,
  ],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
