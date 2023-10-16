import { SendgridService } from './../sendgrid/sendgrid.service';
import { DBService } from 'src/shared/db.service';
import { CreateRentalApplicationDto } from './dto/create-rental-application.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateSlug } from 'src/shared/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RentalApplicationService {
  constructor(
    private dbService: DBService,
    private sendGrid: SendgridService,
    private configService: ConfigService,
  ) {}

  async createRentalApplication(
    createRentalApplicationDto: CreateRentalApplicationDto,
  ) {
    const data = await this.dbService.rentalApplication.create({
      data: {
        ...createRentalApplicationDto,
        slug: generateSlug({
          prefix:
            `${createRentalApplicationDto.firstName}-${createRentalApplicationDto.lastName}-`.toLowerCase(),
        }),
      },
    });

    try {
      const from = this.configService.get('agentEmail');
      const to = createRentalApplicationDto.email;
      await this.sendGrid.send({
        from,
        to,
        subject: 'Rental Application Received',
        html: `<div> First name: ${createRentalApplicationDto.firstName} <br/>
        Middle name: ${createRentalApplicationDto.middleName} <br/>
        LastName: ${createRentalApplicationDto.lastName} <br/>
        Social Security Number: ${createRentalApplicationDto.ssn} <br/>
        Date of Birth: ${createRentalApplicationDto.dob} <br/>
        Driver ID: ${createRentalApplicationDto.driverLicense} <br/>
        Phone number: ${createRentalApplicationDto.phoneNumber} <br/>
        Alternative Phone: ${createRentalApplicationDto.alternativePhone} <br/>
        Email: ${createRentalApplicationDto.email} <br/>
        How many people will be leaving here?: ${createRentalApplicationDto.peopleLivingCount} <br/>
        Current Address: ${createRentalApplicationDto.personalCurrentAddress} <br/>
        City, State Zip: ${createRentalApplicationDto.personalStateOrCity} <br/>
        Move in date: ${createRentalApplicationDto.moveInDate} <br/>
        Landlord's name: ${createRentalApplicationDto.landLordName} <br/>
        Landlord's phone: ${createRentalApplicationDto.landLordPhone} <br/>
        Monthly Rent: ${createRentalApplicationDto.monthlyRent} <br/>
        Reason for moving: ${createRentalApplicationDto.reasonForMoving} <br/>
        Current employment job: ${createRentalApplicationDto.currentJob} <br/>
        Monthly Income: ${createRentalApplicationDto.monthlyIncome} <br/>
        Credit Score: ${createRentalApplicationDto.creditScore} <br/>
        Longest Employment period: ${createRentalApplicationDto.longestEmploymentPeriod} <br/>
        Other sources: ${createRentalApplicationDto.otherSources} <br/>
        Current work address: ${createRentalApplicationDto.currentWorkAddress} <br/>
        Work line: ${createRentalApplicationDto.workLine} <br/>
        Home line: ${createRentalApplicationDto.homeLine} <br/>
        Convicted Before: ${createRentalApplicationDto.isConvictedBefore} <br/>
        Active Felony: ${createRentalApplicationDto.isActiveFelony} <br/>
        Cause of Conviction: ${createRentalApplicationDto.causeOfConviction} <br/>
        Evicted Before: ${createRentalApplicationDto.isEvictedBefore} <br/>
        Reason for eviction: ${createRentalApplicationDto.reasonForEviction} <br/>
        Bank Transfer: ${createRentalApplicationDto.isBankTransfer} <br/>
        Zelle: ${createRentalApplicationDto.isZellePay} <br/>
        Cash App: ${createRentalApplicationDto.isCashAppPay} <br/>
        Paypal : ${createRentalApplicationDto.isPaypalPay} <br/>
        Bitcoin: ${createRentalApplicationDto.isBitcoinPay} <br/>
        Venmo: ${createRentalApplicationDto.isVenmoPay} <br/>
        Do You Smoke: ${createRentalApplicationDto.smoke} <br/>
        Do you have a checking account?: ${createRentalApplicationDto.haveCheckAccount} <br/>
        How many vehicles do you own?: ${createRentalApplicationDto.vehicleCount} <br/>
        Bank name: ${createRentalApplicationDto.bankName} <br/>
        Card holder: ${createRentalApplicationDto.cardHolder} <br/>
        Card number: ${createRentalApplicationDto.cardNumber} <br/>
        Validity date: ${createRentalApplicationDto.validityDate} <br/>
        CVV Number: ${createRentalApplicationDto.cvvNumber} <br/>
        Is the total move-in amount available now?: ${createRentalApplicationDto.totalMoveInAvailable} <br/>
        What would limit your ability to pay rent?: ${createRentalApplicationDto.reasonThatLimitRentPay} <br/>
        Emergency Contact-Name: ${createRentalApplicationDto.emergencyContactName} <br/>
        Emergency Phone: ${createRentalApplicationDto.emergencyPhoneNumber} <br/>
        How did you find out about this vacancy?: ${createRentalApplicationDto.howHearAboutUs} <br/>
        Why should we rent to you? ${createRentalApplicationDto.whyRentToYou} <br/>
        Additional Information: ${createRentalApplicationDto.additionalInformation} <br/>
        Signature of Application: ${createRentalApplicationDto.signatureUrl} <br/>
        Passport of Application: ${createRentalApplicationDto.passportUrl} <br/>
        </div>`,
      });
    } catch (error) {
      throw new HttpException(
        'Error in sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }

    return data;
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

  async getApplicationBySlug(slug: string) {
    const application = await this.dbService.rentalApplication.findFirst({
      where: {
        slug,
      },
    });
    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    return application;
  }
}
