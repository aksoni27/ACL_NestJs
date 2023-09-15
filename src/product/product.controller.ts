/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('product')
@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
  constructor() {}

  @Post()
  @Roles('admin', 'seller')
  create() {
    return 'Product added successfully';
  }

  @Get()
  @Roles('admin', 'seller', 'customer', 'supporter')
  findAll() {
    return 'Products sent successfully';
  }

  @Patch(':id')
  @Roles('admin', 'seller')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return 'Product updated successfully';
  }

  @Delete(':id')
  @Roles('admin', 'supporter')
  remove(@Param('id') id: string) {
    return '“Product deleted successfully';
  }
}
