import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { User } from '../entity/user/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // transaction 처리는 queryRunner(수동) 와 EntityManger(자동) 를 통해 수행할 수 있다.
    @Post()
    async doUserRegistration(@Body() registerUserInfo: CreateUserDTO): Promise<User> {
        const createUserResult = await this.userService.doUserRegistration(registerUserInfo);
        return Object.assign({
            data:{...createUserResult},
            statusCode: 201,
            statusMsg: 'create-User Success'
        })
    }
}
