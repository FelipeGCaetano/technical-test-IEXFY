// Dada a estrutura abaixo, que representa categorias de produtos com subcategorias aninhadas:
// const categorias = [
//     {
//         id: 1, nome: 'Software', filhos: [
//             { id: 2, nome: 'CRM', filhos: [] },
//             {
//                 id: 3, nome: 'ERP', filhos: [
//                     { id: 4, nome: 'Financeiro', filhos: [] },
//                     { id: 5, nome: 'Estoque', filhos: [] },
//                 ]
//             },
//         ]
//     },
//     {
//         id: 6, nome: 'Serviços', filhos: [
//             { id: 7, nome: 'Consultoria', filhos: [] },
//         ]
//     },
// ];
// Escreva uma função recursiva listarTodos(categorias) que retorne um array plano com todas as categorias (em qualquer nível), contendo id e nome.
// O resultado deve incluir todos os nós da árvore.


//Declara a função para listar todos
function listarTodos(categorias) {
    //Inicia o array de resultado
    let resultado = []

    //Itera sobre as categorias
    for (let i = 0; i < categorias.length; i++) {
        let categoria = categorias[i]

        // Adiciona a categoria atual ao resultado
        resultado.push({
            id: categoria.id,
            nome: categoria.nome
        });

        // Se a categoria tiver filhos, chama recursivamente
        if (categoria.filhos && categoria.filhos.length > 0) {
            let filhos = listarTodos(categoria.filhos)
            resultado = resultado.concat(filhos)
        }
    }

    // Retorna o array plano
    return resultado
}

const categorias = [
    {
        id: 1, nome: 'Software', filhos: [
            { id: 2, nome: 'CRM', filhos: [] },
            {
                id: 3, nome: 'ERP', filhos: [
                    { id: 4, nome: 'Financeiro', filhos: [] },
                    { id: 5, nome: 'Estoque', filhos: [] },
                ]
            },
        ]
    },
    {
        id: 6, nome: 'Serviços', filhos: [
            { id: 7, nome: 'Consultoria', filhos: [] },
        ]
    },
];

console.log(listarTodos(categorias))