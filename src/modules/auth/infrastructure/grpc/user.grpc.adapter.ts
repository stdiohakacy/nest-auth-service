import { ERROR_CODES } from '@base/exceptions/error.codes';
import { UserGrpcPort } from '@module/auth/application/ports/outbound/user.grpc.port';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { Err, Ok, Result } from 'oxide.ts';
import { AuthEmailAlreadyRegisteredError } from '@module/auth/domain/errors/auth.error';

interface UserServiceGrpc {
  CreateUser(data: {
    email: string;
    password: string;
    name: string;
  }): Observable<{ id: string }>;
}

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

  async createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<Result<{ id: string }, AuthEmailAlreadyRegisteredError>> {
    try {
      const result = await firstValueFrom(this.userService.CreateUser(data));
      return Ok({ id: result.id });
    } catch (error) {
      if (
        error.code === status.ALREADY_EXISTS &&
        error.metadata?.get('errorCode')?.[0] ===
          ERROR_CODES.USER.ALREADY_EXISTS
      ) {
        return Err(new AuthEmailAlreadyRegisteredError());
      }
    }
  }
}
