import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('whatsappNumber') whatsappNumber: string,
  ) {
    const user = await this.userService.createUser({
      name,
      email,
      whatsappNumber,
    });
    return user;
  }

  @Get('check/:whatsappNumber')
  async checkUser(@Param('whatsappNumber') whatsappNumber: string) {
    const user = await this.userService.findUserByWhatsapp(whatsappNumber);
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        whatsappNumber: user.whatsappNumber,
      };
    }
    throw new NotFoundException('Usuário não encontrado');
  }

  @Patch('update/:whatsappNumber')
  async updateUser(
    @Param('whatsappNumber') whatsappNumber: string,
    @Body() updateData: { name?: string; email?: string },
  ) {
    try {
      const updatedUser = await this.userService.updateUser(
        whatsappNumber,
        updateData,
      );
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
