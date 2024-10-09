import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('questions')
  async getAllQuestions() {
    return this.testService.getAllQuestions();
  }

  @Get('intelligences')
  async getAllIntelligences() {
    return this.testService.getAllIntelligences();
  }

  @Get('questions/:intelligence')
  async getQuestionsByIntelligence(
    @Param('intelligence') intelligence: string,
  ) {
    return this.testService.getQuestionsByIntelligence(intelligence);
  }

  @Patch('responses/:userId')
  async saveUserResponses(
    @Param('userId') userId: string,
    @Body() responses: { [key: string]: number },
  ) {
    return this.testService.saveUserResponses(userId, responses);
  }

  @Post('result/:userId')
  async calculateUserIntelligences(@Param('userId') userId: string) {
    return this.testService.calculateUserIntelligences(userId);
  }

  @Get('result/:userId')
  async getUserTestResult(@Param('userId') userId: string) {
    return this.testService.getUserTestResult(userId);
  }
}
