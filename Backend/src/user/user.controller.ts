import { Body, Controller, Get, Post, Put, Param, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoGuard, JwtGuard } from 'src/auth/guard';
import { LocalAuthGuard } from './guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

@ApiTags('user')
@UseGuards(LocalAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('/')
    signin(@Req() req){
        this.userService.edit_user_status(req.user_obj, UserStatus.ON);
        return req.user_obj;
    }

    @UseGuards(JwtGuard)
    @Put('edit_username/:new_username')
    change_username(@Req() req, @Param() param){
        // console.log(req);
        return this.userService.change_username(req.user_obj, param.new_username);
    }
    
    @UseGuards(JwtGuard)
    @Get('user_score')
    get_user_score(@Req() req, @Res() res){
        return this.userService.get_user_score(req.user_obj, res);
    }

    @UseGuards(JwtGuard)
    @Get('logout')
    logout(@Req() req, @Res({ passthrough: true }) res){
        this.userService.edit_user_status(req.user_obj, UserStatus.OFF);
        res.clearCookie('access_token');
    }

    @UseGuards(JwtGuard)
    @Post('in_queue')
    edit_user_status(@Req() req){
        return this.userService.edit_user_status(req.user_obj, UserStatus.INQUEUE);
    }

    @UseGuards(JwtGuard)
    @Get('achievements')
    get_user_achievements(@Req() req){
        return this.userService.get_user_achievements(req.user_obj);
    }

    @UseGuards(JwtGuard)
    @Get('leaderboard')
    get_leaderboard(){
        return this.userService.get_leaderboard();
    }

    @UseGuards(JwtGuard)
    @Get('add_friend/:friend_name')
    add_friend(@Req() req, @Param() param){
        return this.userService.add_friend(req.user_obj, param.friend_name);
    }
    // edit username: DONE!
    // edit avatar: ON IT
    // leaderboard: DONE!
    // history games: DEPENDS ON GAME
    // achievements: DONE!
    // add friends: DONE!
    // stats of friends: DONE!
    // calcul of score: DONE!
}