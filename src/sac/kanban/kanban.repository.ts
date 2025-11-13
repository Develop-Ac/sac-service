import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class kanbanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst() {
    return this.prisma.sc_kanban.findFirst();
  }

  async update(id: string, data: any) {
    return this.prisma.sc_kanban.update({
      where: { id },
      data: { data }
    });
  }

  async create(data: any) {
    return this.prisma.sc_kanban.create({
      data: { data }
    });
  }
}
