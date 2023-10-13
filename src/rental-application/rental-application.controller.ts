import { RentalApplicationService } from './rental-application.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateRentalApplicationDto } from './dto';

@Controller('rental-application')
export class RentalApplicationController {
  constructor(private rentalApplicationService: RentalApplicationService) {}

  @Post()
  async rentalApplication(
    @Body() createRentalApplicationDto: CreateRentalApplicationDto,
  ) {
    return this.rentalApplicationService.createRentalApplication(
      createRentalApplicationDto,
    );
  }

  @Get()
  async listRentalApplications() {
    return this.rentalApplicationService.listRentalApplications();
  }

  @Get(':id')
  async getRentalApplication(@Param('id') id: string) {
    return this.rentalApplicationService.getApplication(id);
  }
}
