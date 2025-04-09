import { Logger, Module } from '@nestjs/common';
import { AvailibilityService } from './availibility.service';
import { AvailibilityController } from './availibility.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AvailibilityController],
  providers: [AvailibilityService,JwtService,Logger,PrismaClient],
})
export class AvailibilityModule {}
