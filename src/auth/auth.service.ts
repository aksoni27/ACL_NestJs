import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
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
    console.log(username);
    const response= await this.userRepository.findOne({ where: { username } });
    console.log(response);
    return response;
  }

  async validateUser(username: string, password: string) {
    const user = await this.findUserByUserName(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return 'User invalid or wrong password';
  }

  async login(user: any) {
    return this.validateUser(user.username, user.password);
  }
}
