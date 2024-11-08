import { Repository, DeepPartial } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BaseService<T> {
  constructor(
    private readonly repository: Repository<T>,
  ) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } } as any);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const newEtity = await this.repository.preload({id, ...updateDto});
    if (!newEtity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    await this.repository.save(newEtity);
    
    return newEtity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
