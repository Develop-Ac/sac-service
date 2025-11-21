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
        data: {
          data: data.data,
          tipo: data.tipo,
          custo: data.custo,
          title: data.title,
          venda: data.venda,
          cliente: data.cliente,
          solucao: data.solucao,
          vendedor: data.vendedor,
          createdAt: data.createdAt,
          reclamacao: data.reclamacao,
          dataSolucao: data.dataSolucao,
          itemReclamado: data.itemReclamado,
          dptoResponsavel: data.dptoResponsavel,
          etapa: data.etapa,
          imagem: data.imagem
        }
      });
  } 

  async create(data: any) {
    return this.prisma.sac_kanban.create({
      data
    });
  }
  async delete(id: string) {
    return this.prisma.sac_kanban.delete({ where: { id } });
  }
}
