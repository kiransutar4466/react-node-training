import { Logger, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService,JwtService,Logger,PrismaClient],
})
export class ProviderModule {}
