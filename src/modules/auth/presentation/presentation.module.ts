import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { AuthUserInfraMapper } from '../infrastructure/persistence/typeorm/mappers/auth-user.infra.mapper';

const mappers = [AuthUserInfraMapper];

@Module({
  imports: [ApplicationModule],
  providers: [...mappers],
  controllers: [],
})
export class PresentationModule {}
