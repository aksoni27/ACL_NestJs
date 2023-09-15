import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  async validateUser(username: string, passWord: string) {
    const user = await this.findUserByUserName(username);
    if (!user) {
      throw new Error('UserDoesNotExist');
    }
    if (user.password !== passWord) {
      throw new Error('wrong password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    return await this.validateUser(user.username, user.password);
  }
}
