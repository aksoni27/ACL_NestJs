import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @UsePipes(new ValidationPipe())
  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    const existingUser = await this.findUserByUserName(createUserDto.username);
    if (existingUser) {
      throw 'Username already occupied';
    }
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserByUserName(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
