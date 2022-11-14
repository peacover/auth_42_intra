import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoGuard } from 'src/auth/guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';


// guard gloab to check if user have access token
@ApiTags('user')
@UseGuards(LocalAuthGuard)
@Controller('home')
export class UserController {
    constructor(private userService: UserService){}

    // @UseGuards(JwtAuthGuard)
    @Get('me')
    signin(){
        return "get user page";
    }
    
}