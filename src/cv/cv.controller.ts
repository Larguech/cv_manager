import { Controller, Post, Get, Param, Body, Put, Delete, Request } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}
  

  // Créer un CV avec l'ID de l'utilisateur
  @Post()
  create(@Body() createCvDto: CreateCvDto, @Request() req) {
    createCvDto.userId = req.userId; // Ajoute l'ID de l'utilisateur dans le DTO
    return this.cvService.create(createCvDto);
  }

  // Voir tous les CVs (accessible par tout utilisateur)
  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  // Voir un CV particulier (accessible par tout utilisateur)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cvService.findOne(id);
  }

  // Modifier un CV, mais uniquement celui créé par l'utilisateur
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCvDto: UpdateCvDto, @Request() req) {
    const cv = await this.cvService.findOne(id);

    if (cv.user.id !== req.userId) {
      throw new UnauthorizedException('You are not authorized to update this CV');
    }

    return this.cvService.update(id, updateCvDto);
  }

  // Supprimer un CV, mais uniquement celui créé par l'utilisateur
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const cv = await this.cvService.findOne(id);
    if (!cv) {
      throw new NotFoundException(`Cv with id ${id} not found`);
    }
    return this.cvService.remove(id);
  }
}