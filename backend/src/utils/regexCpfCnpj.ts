import { AppError } from "../errors/appError.js"

export function regexCpfCnpj(cpfCnpj: string): string {
    if (cpfCnpj.length == 11) {
        cpfCnpj = cpfCnpj.replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4')
        return cpfCnpj
    }

    if (cpfCnpj.length == 14) {
        cpfCnpj = cpfCnpj.replace(/^(\d{2})\D*(\d{3})\D*(\d{3})\D*(\d{4})(\d{2})$/g, '$1.$2.$3/$4-$5')
        return cpfCnpj
    }

    throw new AppError("CPF/CNPJ inválido", 400)
}