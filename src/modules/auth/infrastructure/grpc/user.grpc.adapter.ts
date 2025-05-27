import { UserGrpcPort } from '@module/auth/application/ports/outbound/user.grpc.port';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserGrpcAdapter implements UserGrpcPort {
  constructor(
    @Inject('USER_SERVICE_GRPC') private readonly clientGrpc: ClientGrpc,
  ) {}

  async createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ id: string }> {
    return { id: '' };
  }
}
