function montarQuadroHorarios(csvText) {
    // Quebra em linhas
    const linhas = csvText.split(/\r?\n/).filter(l => l.trim() !== '');

    // Estrutura: { "Quarta-feira": [ {turma, disciplina, inicio, fim}, ... ], ... }
    const dadosPorDia = {};

    for (const linha of linhas) {
    const partes = linha.split(';');
    if (partes.length < 5) continue; // pula linhas vazias ou incompletas

    const dia       = partes[0].trim();
    const turma     = partes[1].trim();
    const disciplina= partes[2].trim();
    const inicio    = partes[3].trim();
    const fim       = partes[4].trim();

    if (!dadosPorDia[dia]) {
        dadosPorDia[dia] = [];
    }
    // Ignora dias totalmente vazios (como Domingo;;;;)
    if (turma === '' && disciplina === '' && inicio === '' && fim === '') continue;

    dadosPorDia[dia].push({ turma, disciplina, inicio, fim });
    }

    // Cria tabela HTML
    const container = document.getElementById('tabela-container');
    container.innerHTML = ''; // limpa anterior

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Dia', 'Turma', 'Disciplina', 'Início', 'Fim'].forEach(texto => {
    const th = document.createElement('th');
    th.textContent = texto;
    headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Mantém a ordem dos dias conforme aparecem no arquivo
    for (const linha of linhas) {
    const partes = linha.split(';');
    if (partes.length < 1) continue;
    const dia = partes[0].trim();
    if (!dia || !dadosPorDia[dia]) continue;

    // Para evitar repetição do mesmo dia, remove após processar
    const horarios = dadosPorDia[dia];
    delete dadosPorDia[dia];

    if (horarios.length === 0) continue;

    // Primeira linha do dia: célula de dia com rowspan = número de horários
    const primeira = horarios[0];
    const trPrimeira = document.createElement('tr');

    const tdDia = document.createElement('td');
    tdDia.textContent = dia;
    tdDia.className = 'dia';
    tdDia.rowSpan = horarios.length;
    trPrimeira.appendChild(tdDia);

    const tdTurma1 = document.createElement('td');
    tdTurma1.textContent = primeira.turma;
    trPrimeira.appendChild(tdTurma1);

    const tdDisc1 = document.createElement('td');
    tdDisc1.textContent = primeira.disciplina;
    trPrimeira.appendChild(tdDisc1);

    const tdIni1 = document.createElement('td');
    tdIni1.textContent = primeira.inicio;
    trPrimeira.appendChild(tdIni1);

    const tdFim1 = document.createElement('td');
    tdFim1.textContent = primeira.fim;
    trPrimeira.appendChild(tdFim1);

    tbody.appendChild(trPrimeira);

    // Demais horários do mesmo dia
    for (let i = 1; i < horarios.length; i++) {
        const h = horarios[i];
        const tr = document.createElement('tr');

        const tdTurma = document.createElement('td');
        tdTurma.textContent = h.turma;
        tr.appendChild(tdTurma);

        const tdDisc = document.createElement('td');
        tdDisc.textContent = h.disciplina;
        tr.appendChild(tdDisc);

        const tdIni = document.createElement('td');
        tdIni.textContent = h.inicio;
        tr.appendChild(tdIni);

        const tdFim = document.createElement('td');
        tdFim.textContent = h.fim;
        tr.appendChild(tdFim);

        tbody.appendChild(tr);
    }
    }

    table.appendChild(tbody);
    container.appendChild(table);
}
