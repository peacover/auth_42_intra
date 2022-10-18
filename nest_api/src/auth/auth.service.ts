import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return 'post user page';
    }
    signin(){
        return 'get user page';
    }
}