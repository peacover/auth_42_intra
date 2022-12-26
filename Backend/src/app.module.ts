import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './game/app.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GameModule,
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
})
export class AppModule {}
