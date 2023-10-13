import { Module } from '@nestjs/common';
import { RentalApplicationController } from './rental-application.controller';
import { DBService } from 'src/shared/db.service';
import { PublicFilesService } from 'src/public-file/public-file.service';
import { RentalApplicationService } from './rental-application.service';

@Module({
  controllers: [RentalApplicationController],
  providers: [DBService, PublicFilesService, RentalApplicationService],
})
export class RentalApplicationModule {}
