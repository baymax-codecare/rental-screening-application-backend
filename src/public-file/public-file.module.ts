import { Module } from '@nestjs/common';
import { PublicFileController } from './public-file.controller';
import { PublicFilesService } from './public-file.service';
import { DBService } from 'src/shared/db.service';

@Module({
  controllers: [PublicFileController],
  providers: [PublicFilesService, DBService],
  exports: [PublicFilesService],
})
export class PublicFileModule {}
