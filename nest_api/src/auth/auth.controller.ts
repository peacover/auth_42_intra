import { Body, Controller, Get, Post, Redirect, Req, Res } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { AuthService, FortyTwoStrategy } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private fortyTwoStrategy: FortyTwoStrategy){}

    @Post()
    signup(@Body() dto: AuthDto){
        console.log(dto.email);
        return this.authService.signup();
    }
    @Get('login')
    login(){
        return this.fortyTwoStrategy ;
    }
    
    // @Get()
    // @Redirect('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-947c2c3728a72c4a41dc25f3de2a4bee26416b8baa99fcfe957f085d71d96086&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F&response_type=code', 301)
    
    @Get('user') 
    signin(@Body() dto: AuthDto){
        console.log();
        return this.authService.signin();
    }
    
}