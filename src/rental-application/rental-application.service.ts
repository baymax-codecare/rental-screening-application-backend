import { DBService } from 'src/shared/db.service';
import { CreateRentalApplicationDto } from './dto/create-rental-application.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RentalApplicationService {
  constructor(private dbService: DBService) {}

  async createRentalApplication(
    createRentalApplicationDto: CreateRentalApplicationDto,
  ) {
    return this.dbService.rentalApplication.create({
      data: createRentalApplicationDto,
    });
  }

  async listRentalApplications() {
    return this.dbService.rentalApplication.findMany();
  }

  async getApplication(id: string) {
    return this.dbService.rentalApplication.findFirst({
      where: {
        id,
      },
    });
  }
}
