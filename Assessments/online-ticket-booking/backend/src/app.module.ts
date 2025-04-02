import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { EventsModule } from './events/events.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ShowsModule } from './shows/shows.module';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [AuthModule, EventsModule, ShowsModule, UsersModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService,PrismaClient,ConfigService,JwtService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
    .exclude(
      {path : 'api/auth/signup',method:RequestMethod.POST},
      {path : 'api/auth/signin',method:RequestMethod.POST}
    )
    .forRoutes({path:'*', method:RequestMethod.ALL})
  }
}
