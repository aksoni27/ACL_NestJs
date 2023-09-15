import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const user = await this.authService.signup(createUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'user registered successfully',
        user: user,
      });
    } catch (err) {
      if (err?.message === 'Username already occupied') {
        return res.status(409).json({
          message: err?.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err?.message,
      });
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() res) {
    try {
      const response = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(response);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err?.message,
      });
    }
  }
}
