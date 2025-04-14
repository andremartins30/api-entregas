const estadosPorNome: Record<string, string> = {
    'acre': 'AC',
    'alagoas': 'AL',
    'amapa': 'AP',
    'amazonas': 'AM',
    'bahia': 'BA',
    'ceara': 'CE',
    'distrito federal': 'DF',
    'espirito santo': 'ES',
    'goias': 'GO',
    'maranhao': 'MA',
    'mato grosso': 'MT',
    'mato grosso do sul': 'MS',
    'minas gerais': 'MG',
    'para': 'PA',
    'paraiba': 'PB',
    'parana': 'PR',
    'pernambuco': 'PE',
    'piaui': 'PI',
    'rio de janeiro': 'RJ',
    'rio grande do norte': 'RN',
    'rio grande do sul': 'RS',
    'rondonia': 'RO',
    'roraima': 'RR',
    'santa catarina': 'SC',
    'sao paulo': 'SP',
    'sergipe': 'SE',
    'tocantins': 'TO'
};

function normalizarTexto(texto: string): string {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function obterSiglaEstadoPorNome(nomeEstado: string): string | null {
    const nomeNormalizado = normalizarTexto(nomeEstado);
    return estadosPorNome[nomeNormalizado] || null;
}
