/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { RolesGuard } from 'src/guard/roles.guard';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [ProductController],
  providers: [
    AuthGuard,
    RolesGuard,
    UserService
  ],
})
export class ProductModule {}
