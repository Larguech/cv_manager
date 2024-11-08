// src/skill/skill.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/services/base.service';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService extends BaseService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
}
