export interface EmpresaCadastrarDto {
    cnpj:number;
    nomeFantasia: string;
    email:string;
    telefone:string;
    razaoSocial: string;
    lojista:{
        nome:string;
        email:string;
        telefone1:string;
        telefone2:string;
    }
}