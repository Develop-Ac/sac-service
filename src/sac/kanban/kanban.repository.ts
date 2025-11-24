import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class kanbanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    const kanbans = await this.prisma.sac_kanban.findMany();
    const kanbansWithImagens: Array<typeof kanbans[number] & { imagens: string[] }> = [];
    for (const k of kanbans) {
      const imagens = await this.prisma.sac_kanban_imagens.findMany({
        where: { kanban_id: k.id },
        select: { imagem: true }
      });
      kanbansWithImagens.push({
        ...k,
        imagens: imagens.map(i => i.imagem)
      });
    }
    return kanbansWithImagens;
  }

  async findById(id: string) {
    return this.prisma.sac_kanban.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    // Atualiza o kanban normalmente (sem o campo imagem)
    const updated = await this.prisma.sac_kanban.update({
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
        etapa: data.etapa
      }
    });

    // Remove imagens antigas relacionadas ao kanban
    await this.prisma.sac_kanban_imagens.deleteMany({ where: { kanban_id: id } });

    // Salva as novas imagens (se houver)
    if (Array.isArray(data.imagens)) {
      for (const imagem of data.imagens) {
        await this.prisma.sac_kanban_imagens.create({
          data: {
            kanban_id: id,
            imagem
          }
        });
      }
    }
    return updated;
  }  

  async create(data: any) {
    // Cria o kanban sem imagens
    const created = await this.prisma.sac_kanban.create({
      data: {
        id: data.id, // Ensure data.id is provided when calling create
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
        etapa: data.etapa
      }
    });

    // Salva as imagens (se houver)
    if (Array.isArray(data.imagens)) {
      for (const imagem of data.imagens) {
        await this.prisma.sac_kanban_imagens.create({
          data: {
            kanban_id: created.id,
            imagem
          }
        });
      }
    }
    return created;
  }
  async delete(id: string) {
    return this.prisma.sac_kanban.delete({ where: { id } });
  }
}
