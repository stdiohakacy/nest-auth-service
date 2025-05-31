import { ERROR_CODES } from '@base/exceptions/error.codes';
import {
  CreateUserInput,
  CreateUserOutput,
  UserGrpcPort,
  UserServiceGrpc,
} from '@module/auth/application/ports/outbound/user.grpc.port';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { Err, Ok, Result } from 'oxide.ts';
import { AuthAccountAlreadyRegistered } from '@module/auth/domain/errors/auth.error';

@Injectable()
export class UserGrpcAdapter implements UserGrpcPort, OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(
    @Inject('USER_SERVICE_GRPC') private readonly clientGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService =
      this.clientGrpc.getService<UserServiceGrpc>('UserService');
  }

  async createUser(
    data: CreateUserInput,
  ): Promise<Result<CreateUserOutput, AuthAccountAlreadyRegistered>> {
    try {
      const result = await firstValueFrom(this.userService.CreateUser(data));
      return Ok({ id: result.id });
    } catch (error) {
      if (
        error.code === status.ALREADY_EXISTS &&
        error.metadata?.get('errorCode')?.[0] ===
          ERROR_CODES.USER.ALREADY_EXISTS
      ) {
        return Err(new AuthAccountAlreadyRegistered());
      }
      throw error; // or: return Err(new InfraError(error));
    }
  }
}
