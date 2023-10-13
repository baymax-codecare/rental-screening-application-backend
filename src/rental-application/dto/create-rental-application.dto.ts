import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateRentalApplicationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/)
  ssn: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  driverLicense: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  phoneNumber: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  alternativePhone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  peopleLivingCount: number;

  @IsString()
  @IsNotEmpty()
  personalCurrentAddress: string;

  @IsString()
  @IsNotEmpty()
  personalStateOrCity: string;

  @IsString()
  @IsNotEmpty()
  moveInDate: string;

  @IsString()
  @IsNotEmpty()
  landLordName: string;

  @IsString()
  @IsPhoneNumber('US')
  @IsNotEmpty()
  landLordPhone: string;

  @IsString()
  @IsNotEmpty()
  monthlyRent: string;

  @IsString()
  @IsNotEmpty()
  reasonForMoving: string;

  @IsString()
  @IsNotEmpty()
  currentJob: string;

  @IsString()
  @IsNotEmpty()
  monthlyIncome: string;

  @IsString()
  @IsNotEmpty()
  creditScore: string;

  @IsString()
  @IsNotEmpty()
  longestEmploymentPeriod: string;

  @IsString()
  @IsNotEmpty()
  otherSources: string;

  @IsString()
  @IsNotEmpty()
  currentWorkAddress: string;

  @IsString()
  @IsNotEmpty()
  workLine: string;

  @IsString()
  @IsNotEmpty()
  homeLine: string;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isConvictedBefore: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isActiveFelony: boolean;

  @IsString()
  @IsOptional()
  causeOfConviction?: string;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isEvictedBefore: boolean;

  @IsString()
  @IsOptional()
  reasonForEviction?: string;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isBankTransfer: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isZellePay: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isCashAppPay: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isPaypalPay: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isBitcoinPay: boolean;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isVenmoPay: boolean;

  @IsString()
  @IsNotEmpty()
  smoke: string;

  @IsString()
  @IsNotEmpty()
  haveCheckAccount: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  cardHolder: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  validityDate: string;

  @IsString()
  @IsNotEmpty()
  cvvNumber: string;

  @IsNumber()
  vehicleCount: number;

  @IsString()
  @IsNotEmpty()
  totalMoveInAvailable: string;

  @IsString()
  @IsOptional()
  reasonThatLimitRentPay?: string;

  @IsString()
  @IsNotEmpty()
  emergencyContactName: string;

  @IsPhoneNumber('US')
  @IsNotEmpty()
  emergencyPhoneNumber: string;

  @IsString()
  @IsOptional()
  howHearAboutUs?: string;

  @IsString()
  @IsOptional()
  whyRentToYou?: string;

  @IsString()
  @IsOptional()
  additionalInformation?: string;

  @IsString()
  @IsOptional()
  signatureUrl?: string;

  @IsString()
  @IsOptional()
  passportUrl?: string;
}
