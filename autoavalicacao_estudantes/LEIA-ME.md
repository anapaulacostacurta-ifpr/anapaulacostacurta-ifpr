# Autoavaliação discente — agenda, turmas e análise docente

Atualização de 13/11/2026. As seis questões abertas, o login Google, os agendamentos e os envios existentes foram preservados. Usa o mesmo projeto Firebase networking-taks. O pacote não altera dados automaticamente.

## 1. Publicar e atualizar as regras — obrigatório

1. Substitua o `index.html` publicado pelo arquivo deste pacote, na mesma pasta e URL do GitHub Pages. Publique também as fontes correspondentes. O index.html contém o JavaScript e o CSS incorporados.
2. No Firestore > Regras, SUBSTITUA os blocos anteriores da autoavaliação pelo conteúdo de `BLOCOS_AUTOAVALIACAO.rules`, dentro de `match /databases/{database}/documents`. Preserve os blocos da Patrulha Unity, sub-redes e outras atividades. Não duplique funções ou permissões antigas da autoavaliação: elas poderiam continuar autorizando envios sem turma cadastrada.
3. `firestore.rules` é uma versão completa somente para a autoavaliação. NÃO substitua integralmente as regras de um projeto com outras atividades por esse arquivo.
4. Mantenha o cadastro da professora em `autoavaliacaoDocentes/{UID}`, com `ativo: true` (booleano). Alunos não podem cadastrar docentes, agendar, categorizar ou corrigir turmas pelo site.
5. Recarregue com Ctrl+Shift+R. Na agenda, clique em **Editar turmas** nas datas já existentes e cadastre as opções. Sem turmas cadastradas, novos envios ficam bloqueados. Os envios anteriores continuam acessíveis.
6. Antes da turma, teste login e um envio com conta de aluno após instalar as regras. A construção do pacote não publicou nem testou gravações no seu projeto real.

## 2. Agendar uma data com turmas

Escolha uma data e preencha **Turmas desta data**, uma por linha. Exemplo:

INF2 — Suporte de TI
JOG2 — Protótipos de jogos

São aceitas de 1 a 20 turmas com até 120 caracteres por nome. Nomes duplicados idênticos são removidos. O aluno escolhe uma opção em uma lista; não digita turma livremente. Cada agendamento abre das 00h até o fim do dia, no horário de Brasília. Cada aluno envia uma vez em cada data. A professora pode suspender e liberar uma data, sem estender o prazo para além daquele dia. As regras verificam o prazo pelo horário do servidor e a turma pela lista cadastrada na data.

Alterar as turmas de uma data modifica apenas as opções para os próximos envios. Não reclassifica respostas já recebidas.

## 3. Ler e analisar as respostas

1. Clique em **Carregar respostas**. A consulta inclui novos envios e envios da versão anterior sem agenda.
2. Use os filtros de **data**, **turma atual** e busca por nome ou e-mail. Eles se combinam e afetam os gráficos, a lista e as exportações.
3. Abra um estudante. Leia as seis respostas. Para cada questão, marque os temas presentes e a opção **Questão revisada**. Você pode marcar vários temas, ou marcar como revisada sem tema quando nenhum item se aplica.
4. Registre observações e encaminhamentos pedagógicos. Clique em **Salvar análise**.
5. Selecione a questão para o gráfico de temas. Compare os relatos e frequências, sem transformá-los automaticamente em nota ou diagnóstico do aluno.

Os temas são marcados manualmente pela professora. Não há uso de IA ou envio do texto para serviços de análise externos. Categorias e observações são privadas da equipe docente.

### Gráficos

- **Envios por data:** quantidade de formulários enviados em cada dia da seleção.
- **Envios por turma atual:** quantidade de envios por turma, incluindo correções docentes.
- **Temas da questão:** frequência dos temas salvos na questão selecionada.
- O resumo informa o total de envios, estudantes distintos, questões revisadas e pendentes.
- A base dos percentuais é o total de envios filtrados. Um envio pode conter vários temas; a soma dos percentuais temáticos pode superar 100%.
- Questão não revisada é pendência, não ausência de dificuldade. Envio não equivale a estudante distinto quando há várias datas. Sem lista de matriculados, não se calcula percentual de participação.
- Os gráficos não demonstram aprendizagem efetiva nem desempenho. São apoio descritivo à leitura das autoavaliações.
- Cada gráfico pode ser baixado em SVG, sem identificação nominal. Os valores também aparecem em tabela acessível.

Envios antigos com horário registrado são filtráveis pelo dia correspondente em Brasília. Há uma opção para todos os envios anteriores à agenda e outra para antigos sem data. A distinção interna `legado` continua preservada para manter a identidade dos registros.

## 4. Corrigir turma e preservar o histórico

1. Abra o envio do aluno no painel.
2. Veja a **turma original informada pelo aluno** e a **turma atual para análise**.
3. Em **Ajustar turma mantendo o histórico**, escolha uma turma cadastrada em algum agendamento e informe o motivo. Para incluir uma opção ausente, use primeiro Editar turmas na agenda.
4. Clique em **Salvar correção de turma**.

A resposta original não é editada. A turma atual é um metadado docente separado, usado nos filtros, gráficos e exportações. O aluno continua consultando seu envio original. Cada alteração registra turma original, turma anterior, nova turma, motivo, horário do servidor, UID da professora e versão. O histórico é exibido abaixo da correção. Não há exclusão ou edição de eventos de histórico pelo site.

A alteração atual e seu histórico são gravados juntos em transação. As regras exigem a presença do histórico correspondente. Conflitos entre sessões são detectados: recarregue antes de tentar novamente. Nenhuma correção é aplicada automaticamente aos outros dias do mesmo aluno: cada envio é independente.

## 5. Exportar

- **JSON:** inclui a seleção filtrada, respostas originais, turma original e atual, metadados do ajuste e análise docente salva.
- **CSV:** inclui a seleção filtrada e colunas para respostas, observações, questões revisadas e temas por questão. Conteúdo potencialmente interpretado como fórmula recebe um apóstrofo protetor no CSV; o JSON mantém o texto original.
- **SVG:** baixa o gráfico selecionado como imagem vetorial.
- O histórico completo de correções é consultado no detalhe do envio; o JSON contém o ajuste atual, não todos os eventos históricos.

## 6. Estrutura do Firestore

- `autoavaliacaoAgenda/{AAAA-MM-DD}`: agenda e lista `turmas`.
- `autoavaliacaoAgenda/{AAAA-MM-DD}/respostas/{UID}`: envio original, imutável.
- `autoavaliacaoGeralV1/{UID}`: envio antigo, somente leitura.
- `autoavaliacaoAjustes/{dia__UID}`: turma atual e metadados do último ajuste.
- `autoavaliacaoAjustes/{dia__UID}/historico/{id}`: histórico imutável de ajustes.
- `autoavaliacaoAnalises/{dia__UID}`: temas por questão, questões revisadas e observações docentes.
- `autoavaliacaoDocentes/{UID}`: autorização docente.

`dia` é AAAA-MM-DD para envios da agenda e `legado` para os anteriores. Correções e análises não modificam nomes, e-mails ou textos dos alunos.

## 7. Verificação e manutenção

Foram executadas verificações locais de sintaxe, integração de arquivos e simulações de filtros, correções sucessivas com histórico, preservação da turma original, gravação da análise e conflito de versões. As regras são fornecidas para publicação e teste no seu projeto; não foram executadas no emulador do Firestore nem com contas reais nesta atualização.

No simulador de regras, confira: aluno só envia turma cadastrada em data aberta; aluno não lê colegas nem metadados docentes; docente só altera o ajuste junto com um histórico idêntico; histórico não pode ser editado ou excluído; textos originais continuam imutáveis. Em duas sessões docentes, confira conflito ao salvar o mesmo registro.

Para editar, altere app.js, style.css ou template.html, execute `python3 gerar_index.py` e publique o novo index.html.
