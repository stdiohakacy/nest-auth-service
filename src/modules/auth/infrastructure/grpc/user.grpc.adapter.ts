import { UserGrpcPort } from '@module/auth/application/ports/outbound/user.grpc.port';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

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
  }): Promise<{ id: string }> {
    const result = await firstValueFrom(this.userService.CreateUser(data));
    return { id: result.id };
  }
}
