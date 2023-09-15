import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/guard/roles.guard';

@Module({
  imports :[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,RolesGuard],
})
export class AuthModule {}
