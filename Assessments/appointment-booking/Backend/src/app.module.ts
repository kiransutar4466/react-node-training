import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { PatientModule } from './patient/patient.module';
import { JwtService } from '@nestjs/jwt';
import { UserMiddleware } from './middleware/middleware';
import { ProviderController } from './provider/provider.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientController } from './patient/patient.controller';
import { AvailibilityModule } from './availibility/availibility.module';
import { AvailibilityController } from './availibility/availibility.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProviderModule,
    PatientModule,
    AvailibilityModule,
    AppointmentModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'api/provider/login', method: RequestMethod.POST },
        { path: 'api/provider/login', method: RequestMethod.POST },
      )
      .forRoutes(
        ProviderController,
        PatientController,
        AvailibilityController,
        AppointmentController,
        DashboardController,
      );
  }
}
