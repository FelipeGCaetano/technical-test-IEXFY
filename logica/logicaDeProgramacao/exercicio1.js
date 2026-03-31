// Escreva uma função que retorne um objeto com as seguintes informações, considerando
// apenas vendas com status 'aprovado':
// • Total geral de vendas aprovadas
// • Ticket médio das vendas aprovadas
// • Vendedor com maior valor total
// • Lista de vendedores com seu respectivo total(ordenada do maior para o menor)
// Exemplo de saída esperada:
// {
//     totalGeral: 8400, ticketMedio: 2100, topVendedor: 'Ana',
//         ranking: [{ vendedor: 'Ana', total: 4600 }, ...]
// }


// Declara a função a ser usada, recebendo vendas e status como parametros
function coletarVendasPeloStatus(vendas, status) {
    //Iniciar o objeto de resultado
    const result = {
        totalGeral: 0,
        ticketMedio: 0,
        topVendedor: '',
        ranking: []
    }

    //Filtra as vendas com base no status recebido
    const vendasFiltradasPorStatus = vendas.filter((venda) => status === venda.status)

    let totais = {};

    //Itera sobre as vendas filtradas
    for (const venda of vendasFiltradasPorStatus) {
        //Define o valor total somando os valores de cada venda
        result.totalGeral += venda.valor

        //Adiciona o valor total de cada vendedor ao objeto de totais
        if (!totais[venda.vendedor]) {
            totais[venda.vendedor] = 0;
        }

        totais[venda.vendedor] += venda.valor;
    }

    //Monta o ranking com base no valor de cada vendedor
    for (let vendedor in totais) {
        result.ranking.push({
            vendedor: vendedor,
            total: totais[vendedor]
        });
    }

    //Ordena o ranking com base no valor das vendas de cada vendedor
    result.ranking.sort((vendedorA, vendedorB) => vendedorB - vendedorA)

    //Define o vendedor que mais vendeu
    result.topVendedor = result.ranking[0].vendedor;

    //Define o ticked médio das vendas com base no total previamente calculado dividido pela quantidade de vendas
    result.ticketMedio = result.totalGeral / vendasFiltradasPorStatus.length

    //Retorna o objeto de resposta
    return result
}

const vendas = [
    { vendedor: 'Ana', valor: 1200, status: 'aprovado' },
    { vendedor: 'Bruno', valor: 850, status: 'cancelado' },
    { vendedor: 'Ana', valor: 3400, status: 'aprovado' },
    { vendedor: 'Carlos', valor: 2100, status: 'aprovado' },
    { vendedor: 'Bruno', valor: 1700, status: 'aprovado' },
    { vendedor: 'Ana', valor: 600, status: 'cancelado' },
];

console.log(coletarVendasPeloStatus(vendas, "aprovado"))