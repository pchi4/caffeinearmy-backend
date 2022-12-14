import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column({ length: 500 })
  nomeFantasia: string;

  @Column('text')
  email: string;

  @Column()
  telefone: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeLojista: string;

  @Column()
  telefoneLojista1:string;

  @Column()
  telefoneLojista2:string;
  
  @Column()
  emailLojista: string;
}