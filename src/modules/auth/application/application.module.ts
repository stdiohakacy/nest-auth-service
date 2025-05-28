import { Module, Provider } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AUTH_USER_REPOSITORY_PORT, USER_SRV_GRPC_PORT } from 'src/di/di.token';
import { AuthUserRepositoryImpl } from '../infrastructure/persistence/typeorm/repositories/auth-user.repository.impl';
import { UserGrpcAdapter } from '../infrastructure/grpc/user.grpc.adapter';
import { authCommandHandlers } from './commands/register/handlers';

const ports: Provider[] = [
  {
    provide: AUTH_USER_REPOSITORY_PORT,
    useClass: AuthUserRepositoryImpl,
  },
  {
    provide: USER_SRV_GRPC_PORT,
    useClass: UserGrpcAdapter,
  },
];

const providers = [...authCommandHandlers, ...ports];

@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
