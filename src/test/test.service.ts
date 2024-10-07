import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  // Retornar todas as perguntas
  async getAllQuestions() {
    return this.prisma.question.findMany({
      orderBy: { ordem: 'asc' },
    });
  }

  // Retornar todas as inteligências únicas
  async getAllIntelligences() {
    const questions = await this.prisma.question.findMany();
    const intelligences = [
      ...new Set(questions.map((q) => q.tipoInteligencia)),
    ];
    return intelligences;
  }

  // Retornar perguntas filtradas por tipo de inteligência
  async getQuestionsByIntelligence(intelligence: string) {
    return this.prisma.question.findMany({
      where: { tipoInteligencia: intelligence },
      orderBy: { ordem: 'asc' },
    });
  }

  // Salvar respostas do usuário
  async saveUserResponses(
    userId: string,
    responses: { [key: string]: number },
  ) {
    console.log(`Iniciando saveUserResponses para o usuário: ${userId}`);
    console.log('Dados das respostas recebidas:', responses);

    // Validação do formato do ID
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('ID de usuário inválido');
    }

    // Buscar o usuário para garantir que ele existe
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Atualizar pontuações no banco de dados
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        inteligencia_linguistica:
          responses.inteligencia_linguistica ?? undefined,
        inteligencia_logico_matematica:
          responses.inteligencia_logico_matematica ?? undefined,
        inteligencia_espacial: responses.inteligencia_espacial ?? undefined,
        inteligencia_musical: responses.inteligencia_musical ?? undefined,
        inteligencia_corporal_cinestesica:
          responses.inteligencia_corporal_cinestesica ?? undefined,
        inteligencia_interpessoal:
          responses.inteligencia_interpessoal ?? undefined,
        inteligencia_intrapessoal:
          responses.inteligencia_intrapessoal ?? undefined,
      },
    });
  }

  // Calcular resultado do teste do usuário
  async calculateUserIntelligences(userId: string) {
    console.log(
      `Iniciando cálculo das inteligências predominantes para o usuário: ${userId}`,
    );

    // Validação do formato do ID
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('ID de usuário inválido');
    }

    // Buscar o usuário
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Obter as pontuações do usuário
    const pontuacoes = {
      inteligencia_linguistica: user.inteligencia_linguistica,
      inteligencia_logico_matematica: user.inteligencia_logico_matematica,
      inteligencia_espacial: user.inteligencia_espacial,
      inteligencia_musical: user.inteligencia_musical,
      inteligencia_corporal_cinestesica: user.inteligencia_corporal_cinestesica,
      inteligencia_interpessoal: user.inteligencia_interpessoal,
      inteligencia_intrapessoal: user.inteligencia_intrapessoal,
    };

    console.log('Pontuações do usuário:', pontuacoes);

    // Ordenar as inteligências por pontuação, do maior para o menor
    const inteligenciasOrdenadas = Object.entries(pontuacoes).sort(
      ([, a], [, b]) => b - a,
    );

    // Selecionar as 3 inteligências com maiores pontuações
    // eslint-disable-next-line prettier/prettier
    const inteligenciasPredominantes = inteligenciasOrdenadas.slice(0, 3).map(([key]) => key);

    console.log('Inteligências predominantes:', inteligenciasPredominantes);

    // Atualizar as inteligências predominantes no banco de dados
    return this.prisma.user.update({
      where: { id: userId },
      data: { inteligenciasPredominantes },
    });
  }

  // Consultar resultado do teste de um usuário
  async getUserTestResult(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (
      !user.inteligenciasPredominantes ||
      user.inteligenciasPredominantes.length === 0
    ) {
      throw new NotFoundException('O usuário ainda não fez o teste');
    }

    return {
      id: user.id,
      name: user.name,
      whatsappNumber: user.whatsappNumber,
      inteligenciasPredominantes: user.inteligenciasPredominantes,
    };
  }
}
