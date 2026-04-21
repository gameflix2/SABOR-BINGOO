// Lógica de Geração de Cartela 5x5 (Regra Oficial)
function gerarCartela() {
    const colunas = { 'B': [1, 15], 'I': [16, 30], 'N': [31, 45], 'G': [46, 60], 'O': [61, 75] };
    let cartela = [];

    Object.keys(colunas).forEach(letra => {
        const [min, max] = colunas[letra];
        let numerosDaColuna = [];
        while (numerosDaColuna.length < 5) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numerosDaColuna.includes(num)) numerosDaColuna.push(num);
        }
        cartela.push(numerosDaColuna.sort((a, b) => a - b));
    });
    // O index [2][2] (meio da coluna N) será o 'FREE' no HTML
    return cartela; 
}

// Motor de Verificação de Vitória (Check de Matriz)
function verificarVitoria(cartelaMarcada) {
    // cartelaMarcada é uma matriz 5x5 de booleans (true/false)
    
    // Check Linhas e Colunas
    for (let i = 0; i < 5; i++) {
        if (cartelaMarcada[i].every(celula => celula)) return "LINHA!"; 
        if ([0,1,2,3,4].every(row => cartelaMarcada[row][i])) return "COLUNA!";
    }

    // Check Diagonais
    if ([0,1,2,3,4].every(i => cartelaMarcada[i][i])) return "DIAGONAL!";
    if ([0,1,2,3,4].every(i => cartelaMarcada[i][4-i])) return "DIAGONAL!";

    return null;
}