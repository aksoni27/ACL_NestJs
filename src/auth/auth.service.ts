import {
  Injectable,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  @UsePipes(new ValidationPipe())
  async signup(createUserDto: CreateUserDto) {
    try {
      const user: User = new User();
      const existingUser = await this.findUserByUserName(
        createUserDto.username,
      );
      if (existingUser) {
        throw new Error('Username already occupied');
      }
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      user.role = createUserDto.role;
      return await this.userRepository.save(user);
    } catch (err) {
      throw err;
    }
  }
  async findUserByUserName(username: string) {
    const response = await this.userRepository.findOne({ where: { username } });
    return response;
  }


  async login(user: any) {
    const dbuser = await this.findUserByUserName(user.username);
    if (dbuser?.password !== user.password) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = { sub: user.username, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
