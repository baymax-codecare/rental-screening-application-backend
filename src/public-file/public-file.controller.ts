import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFilesService } from './public-file.service';
import { Multer } from 'multer';

@Controller('public-file')
export class PublicFileController {
  constructor(private readonly publicFileService: PublicFilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async addCompanyLogo(@UploadedFile() file: Multer.File) {
    return this.publicFileService.uploadPublicFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
  }
}
