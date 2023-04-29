import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;
    const user: User = await this.userService.findUserByEmail(email);
    if (user && user.password == password) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('UnAuthanticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
