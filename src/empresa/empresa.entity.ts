import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column({ length: 500 })
  nomeFantasia: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeLojista: string;

  @Column()
  telefoneLojista1: string;

  @Column()
  telefoneLojista2: string;

  @Column()
  emailLojista: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
