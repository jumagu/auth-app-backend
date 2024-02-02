import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto, RegisterDto, CreateUserDto } from './dto';
import { LoginResponse } from './interfaces/login-respone.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id }),
    };
  }
}