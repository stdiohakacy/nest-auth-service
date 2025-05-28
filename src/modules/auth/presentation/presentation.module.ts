import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { AuthUserInfraMapper } from '../infrastructure/persistence/typeorm/mappers/auth-user.infra.mapper';
import { RestAuthController } from './rest/controllers/rest.auth.controller';

const mappers = [AuthUserInfraMapper];

@Module({
  imports: [ApplicationModule],
  providers: [...mappers],
  controllers: [RestAuthController],
})
export class PresentationModule {}
