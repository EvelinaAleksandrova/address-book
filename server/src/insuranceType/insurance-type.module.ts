import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InsuranceTypeController } from './insurance-type.controller';
import { InsuranceTypeService } from './insurance-type.service';
import { InsuranceTypeSchema } from './schema/insurance-type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'InsuranceType', schema: InsuranceTypeSchema }])],
  controllers: [InsuranceTypeController],
  providers: [InsuranceTypeService],
  exports: [MongooseModule.forFeature([{ name: 'InsuranceType', schema: InsuranceTypeSchema }])]
})
export class InsuranceTypeModule {}
