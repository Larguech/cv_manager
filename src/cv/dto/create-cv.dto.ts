// src/cv/dto/create-cv.dto.ts
export class CreateCvDto {
  name: string;
  firstname: string;
  age: number;
  cin: string;
  job: string;
  userId?: number;   // ID de l'utilisateur auquel le CV est associé
}
