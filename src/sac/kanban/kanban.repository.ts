import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class kanbanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.sac_kanban.findMany();
  }

  async findById(id: string) {
    return this.prisma.sac_kanban.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.sac_kanban.update({
      where: { id },
      data
    });
  } 

  async create(data: any) {
    return this.prisma.sac_kanban.create({
      data
    });
  }
}
