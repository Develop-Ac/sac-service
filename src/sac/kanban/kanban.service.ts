
import { Injectable } from '@nestjs/common';
import { kanbanRepository } from './kanban.repository';

@Injectable()
export class kanbanService {
  constructor(private readonly repo: kanbanRepository) {}

  async getKanban() {
    const kanbans = await this.repo.findMany();
    const result: {
      aguardando_atendimento: any[],
      em_analise: any[],
      finalizado: any[]
    } = {
      aguardando_atendimento: [],
      em_analise: [],
      finalizado: []
    };
    for (const k of kanbans) {
      // Cria cópia e converte BigInt para string
      const kCopy = { ...k, createdAt: typeof k.createdAt === 'bigint' ? k.createdAt.toString() : k.createdAt };
      const etapa = (kCopy as any).etapa ?? (kCopy.data && (kCopy.data as any).etapa);
      if (etapa === 'aguardando_atendimento') result.aguardando_atendimento.push(kCopy);
      else if (etapa === 'em_analise') result.em_analise.push(kCopy);
      else if (etapa === 'finalizado') result.finalizado.push(kCopy);
    }
    return result;
  }

  async updateEtapa(id: string, etapa: 'aguardando_atendimento' | 'em_analise' | 'finalizado') {
    await this.repo.update(id, { etapa });
    return { ok: true };
  }

  async createKanban(data: any) {
    // Converte timestamp para ISO-8601 se necessário
    if (data.data && typeof data.data === 'string' && /^\d+$/.test(data.data)) {
      data.data = new Date(Number(data.data)).toISOString();
    }
    if (data.id) {
      const existing = await this.repo.findById(data.id);
      if (existing) {
        await this.repo.update(data.id, data);
        return { ok: true, updated: true };
      }
    }
    await this.repo.create(data);
    return { ok: true, created: true };
  }
}
