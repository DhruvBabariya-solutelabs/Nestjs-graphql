import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findUserByEmail(email: string) {
    let user: User = await this.userRepo.findOne({ where: { email: email } });
    return user;
  }
}
