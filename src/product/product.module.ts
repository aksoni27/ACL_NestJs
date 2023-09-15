import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { RolesGuard } from 'src/guard/roles.guard';

@Module({
  controllers: [ProductController],
  providers: [RolesGuard],
})
export class ProductModule {}
