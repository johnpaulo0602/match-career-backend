import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findUserByWhatsapp(whatsappNumber: string) {
    return this.prisma.user.findUnique({
      where: {
        whatsappNumber,
      },
    });
  }

  async updateUser(whatsappNumber: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        whatsappNumber,
      },
      data,
    });
  }
}
