import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  cnpj: number;

  @Column({ length: 500 })
  nomeFantasia: string;

  @Column('text')
  email: string;

  @Column()
  telefone: string;

  @Column()
  razaoSocial: string;

/*   @Column()
  lojista:{
    nome: string;
    email: string;
    telefone1:string;
    telefone2:string;
  } */
}