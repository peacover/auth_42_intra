import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService, FortyTwoStrategy } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy],
})
export class AuthModule {

}