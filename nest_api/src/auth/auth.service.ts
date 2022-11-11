import { Injectable, Param, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { authenticator } from "otplib";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto";

import { toDataURL } from 'qrcode';
import { toFileStream } from 'qrcode';
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){
    }
    
    async login(@Req() req, @Res() res){
        const payload = {
            // id: req.user.id,
            // username: req.user.username,
            // full_name: req.user.full_name,
            // avatar: req.user.avatar,
            // first_time: true,
            // is_two_fa_enable: false,
            // email: req.user.email, // check name of email

            ///////////////////////////////////////// just for test
            id: "11",
            username: "yer-raki",
            full_name: "youssef erraki",
            avatar: "test",
            first_time: true,
            is_two_fa_enable: false,
            email: "yer-raki@student.1337.ma",
            /////////////////////////////////////////
        };
        const nb_user: number = await this.prisma.user.count({
            where:{
                id: payload.id,
            }
        })
        if (nb_user === 0){
            const user = await this.prisma.user.create({
                data : {
                    id: payload.id,
                    username: payload.username,
                    full_name: payload.full_name,
                    avatar: payload.avatar,
                    is_two_fa_enable: false,
                    first_time: true,
                    email: payload.email,
                }
            });
            const secret = "secret-password";
            const access_token = await this.jwt.sign(payload, {
                expiresIn : '1d',
                secret : secret,
            });
            res.cookie('access_token', access_token, { httpOnly: true }).status(200);
            res.send(access_token);
        }
        else if (nb_user === 1){
            await this.prisma.user.update({
                where: {id: payload.id },
                data: {
                    first_time: false,
                }
              });
            if (payload.is_two_fa_enable === true){
                res.redirect('auth/login/2fa');
            }
        }
        
    }

    async generate_2fa_secret(user: UserDto)
    {
        if (await this.prisma.user.findUnique({
            where:{
                id : user.id,
            }
        })){
            if (user.is_two_fa_enable === false){
                throw "2fa is not enable";
            }
            const secret = authenticator.generateSecret();
            const otpauthUrl : string = authenticator.keyuri(user.email, this.config.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
            this.save_secret_db(user, secret);
            return ({
                secret,
                otpauthUrl
            })
        }
        else{
            console.log("user not founded!");
            throw ("User not found!");
        }
    }
    async save_secret_db(user: UserDto, secret : string) {
        const updated_user = await this.prisma.user.update({
            where: {id: user.id },
            data: {
                two_fa_code: secret,
            }
          });
    }
    async pipeQrCodeStream(@Res() res, otpauthUrl: string) {
        return toFileStream(res, otpauthUrl);
    }

    async enable_2fa(@Req() req, @Res() res, user: UserDto){
        if (user.is_two_fa_enable === true)
            throw ("2fa is already enabled!");
        else{
            const updated_user = await this.prisma.user.update({
                where: {id: user.id },
                data: {
                    is_two_fa_enable: true,
                }
              });
            res.redirect("/auth/2fa/generate");
        }
    }

    async verify_2fa(@Req() req, @Res() res, @Param() param){
        console.log(req.user);
        
        res.send(req.user);
    }
}