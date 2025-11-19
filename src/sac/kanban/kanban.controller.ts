
import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { kanbanService } from './kanban.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

class KanbanItemDto {
  id: string;
  data: string;
  tipo: string;
  custo: string;
  title: string;
  venda: string;
  cliente: string;
  solucao: string;
  vendedor: string;
  createdAt: number;
  reclamacao: string;
  dataSolucao: string;
  itemReclamado: string;
  dptoResponsavel: string;
  etapa: 'aguardando_atendimento' | 'em_analise' | 'finalizado';
}

class UpdateEtapaDto {
  etapa: 'aguardando_atendimento' | 'em_analise' | 'finalizado';
}

@ApiTags('Compras - Kanban')
@Controller('kanban')
export class kanbanController {
  constructor(private readonly service: kanbanService) {}


  @Get()
  @ApiResponse({ status: 200, description: 'Lista agrupada por etapa', type: KanbanItemDto, isArray: true })
  async getKanban() {
    return await this.service.getKanban();
  }


  @Put('etapa/:id')
  @ApiBody({
    type: UpdateEtapaDto,
    examples: {
      exemplo: {
        summary: 'Atualizar etapa',
        value: { etapa: 'em_analise' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Atualiza apenas a etapa do item Kanban' })
  async updateEtapa(@Body() body: UpdateEtapaDto, @Param('id') id: string) {
    return await this.service.updateEtapa(id, body.etapa);
  }


  @Put()
  @ApiBody({
    type: KanbanItemDto,
    examples: {
      exemplo: {
        summary: 'Criar item Kanban',
        value: {
          id: 'w50j7-mi64wnlb',
          data: '2025-11-06',
          tipo: '',
          custo: '',
          title: 'garantia #001',
          venda: '',
          cliente: '',
          solucao: '',
          vendedor: '',
          createdAt: 1763564731247,
          reclamacao: '',
          dataSolucao: '',
          itemReclamado: '',
          dptoResponsavel: '',
          etapa: 'aguardando_atendimento'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Cria um novo item Kanban', type: KanbanItemDto })
  async createKanban(@Body() data: KanbanItemDto) {
    return await this.service.createKanban(data);
  }
}
 