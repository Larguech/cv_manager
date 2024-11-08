// src/cv/cv.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}

  async create(createCvDto: CreateCvDto): Promise<Cv> {
    const cv = this.cvRepository.create(createCvDto);
    return await this.cvRepository.save(cv);
  }

  findOne(id: number): Promise<Cv | undefined> {
    return this.cvRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    await this.cvRepository.update(id, updateCvDto);
    return this.cvRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.cvRepository.delete(id);
  }
}
