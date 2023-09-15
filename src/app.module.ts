import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      useFactory: (configService: ConfigService): any => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('port'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('database'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging : true
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
