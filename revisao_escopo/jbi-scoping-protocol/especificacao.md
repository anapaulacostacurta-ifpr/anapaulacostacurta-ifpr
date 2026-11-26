# ESPECIFICAÇÃO FUNCIONAL E METODOLÓGICA DE PLUGIN

## Gerador de Protocolos JBI para Revisões de Escopo com integração PRISMA-ScR e PRISMA-S

**Nome sugerido:** JBI Scoping Review Protocol Builder

**Identificador:** jbi-scoping-protocol

**Versão da especificação:** 1.0

**Data:** 26/11/2026

**Natureza:** Especificação de requisitos funcionais, metodológicos e operacionais.

**Status:** Proposta para implementação e validação.

---

# 1. IDENTIFICAÇÃO DO PLUGIN

## 1.1. Nome

Gerador de Protocolo JBI para Revisão de Escopo.

## 1.2. Descrição resumida

Assistente especializado na construção, revisão, validação, atualização e geração de documentos de protocolos de revisões de escopo, fundamentados na metodologia JBI, integrados às diretrizes de relato PRISMA-ScR e PRISMA-S.

## 1.3. Descrição ampliada

O plugin deverá apoiar pesquisadores na elaboração progressiva de protocolos de revisão de escopo, desde a delimitação inicial do problema de pesquisa até a consolidação do documento metodológico para aprovação, registro e eventual publicação.

Deverá utilizar documentos fornecidos pelos pesquisadores, informações coletadas durante a interação, decisões metodológicas aprovadas e evidências documentais para construir um protocolo consistente, rastreável e versionado.

O plugin não deverá presumir a execução de procedimentos, inventar informações ou considerar decisões metodológicas aprovadas sem confirmação humana.

# 2. OBJETIVOS

## 2.1. Objetivo geral

Automatizar e sistematizar a elaboração documental de protocolos de revisão de escopo, preservando o rigor metodológico, a transparência, a reprodutibilidade e a autonomia dos pesquisadores.

## 2.2. Objetivos específicos

- Orientar a formulação da pergunta de pesquisa mediante a estrutura PCC.
- Estruturar os objetivos da revisão.
- Definir e documentar critérios de elegibilidade.
- Planejar as fontes de informação.
- Integrar estratégias de busca preliminares e definitivas.
- Documentar procedimentos de calibração das buscas.
- Estruturar os processos de seleção das evidências.
- Planejar a extração, análise e apresentação dos dados.
- Antecipar os requisitos de relato do PRISMA-ScR.
- Integrar o registro PRISMA-S.
- Controlar versões e alterações metodológicas.
- Identificar inconsistências, lacunas e pendências.
- Gerar documentos editáveis e consolidados.
- Preservar a validação humana em todas as decisões metodológicas relevantes.

# 3. REFERENCIAIS METODOLÓGICOS

| Referencial | Aplicação no plugin | Natureza |
|---|---|---|
| JBI Manual for Evidence Synthesis | Estrutura e metodologia da revisão de escopo | Referencial principal |
| PRISMA-ScR | Planejamento dos requisitos de relato da revisão | Diretriz complementar |
| PRISMA-S | Documentação das estratégias de busca | Diretriz complementar |
| PRESS | Revisão por pares das estratégias eletrônicas de busca | Instrumento opcional |
| PRISMA 2020 | Apoio à representação do fluxo de seleção das evidências | Instrumento complementar |
| PCC | Estruturação da pergunta e dos critérios de elegibilidade | Estrutura conceitual |

## 3.1. Hierarquia metodológica

O plugin deverá considerar a metodologia JBI como referencial principal para a elaboração do protocolo.

O PRISMA-ScR deverá ser utilizado prospectivamente para antecipar requisitos de relato da revisão concluída.

O PRISMA-S deverá orientar a documentação das buscas, sem substituir os procedimentos metodológicos definidos pelo JBI.

O plugin não deverá apresentar o PRISMA-ScR como uma diretriz específica de elaboração de protocolos.

O PRISMA-P, desenvolvido para protocolos de revisões sistemáticas, não deverá ser imposto automaticamente como requisito de protocolos de revisões de escopo.

## 3.2. Atualização dos referenciais

O plugin deverá permitir a atualização das referências metodológicas utilizadas, registrando:

- Documento consultado.
- Versão ou edição.
- Data de publicação ou atualização.
- Data de consulta.
- Endereço eletrônico.
- Alterações metodológicas relevantes.

# 4. ESCOPO FUNCIONAL

O plugin deverá contemplar as seguintes modalidades de operação:

| Código | Modalidade | Finalidade |
|---|---|---|
| M01 | Iniciar protocolo | Construir um novo protocolo |
| M02 | Importar protocolo | Analisar documento existente |
| M03 | Atualizar protocolo | Incorporar decisões e evidências |
| M04 | Validar protocolo | Verificar consistência metodológica |
| M05 | Gerar protocolo | Consolidar documento estruturado |
| M06 | Gerar apêndices | Produzir documentos auxiliares |
| M07 | Auditar protocolo | Identificar lacunas e inconsistências |
| M08 | Comparar versões | Identificar alterações documentais |
| M09 | Retomar projeto | Recuperar o estado de desenvolvimento |
| M10 | Preparar registro | Organizar informações para registro externo |

# 5. PRINCÍPIOS OPERACIONAIS

## 5.1. Validação humana

Toda decisão metodológica relevante deverá ser submetida à aprovação dos pesquisadores.

O plugin poderá formular propostas, identificar problemas e apresentar alternativas, mas não deverá substituir o julgamento científico da equipe.

## 5.2. Rastreabilidade

Cada decisão deverá estar vinculada à sua origem documental ou à interação na qual foi estabelecida.

## 5.3. Preservação documental

Informações previamente aprovadas não deverão ser modificadas silenciosamente.

## 5.4. Não fabricação de dados

É proibido inventar:

- Referências bibliográficas.
- Resultados de buscas.
- Datas de execução.
- Quantidades de estudos.
- Aprovações de pesquisadores.
- Identificadores de registro.
- Resultados de triagem.
- Resultados de extração de dados.
- Procedimentos não executados.

## 5.5. Separação entre planejamento e execução

O plugin deverá distinguir claramente procedimentos previstos, procedimentos executados e procedimentos validados.

## 5.6. Integridade metodológica

O plugin deverá identificar incompatibilidades entre a pergunta de pesquisa, os objetivos, os critérios de elegibilidade, as estratégias de busca e os procedimentos de síntese.

# 6. DADOS DE ENTRADA

## 6.1. Identificação do projeto

| Campo | Obrigatoriedade |
|---|---|
| Título provisório | Obrigatório |
| Tema de pesquisa | Obrigatório |
| Justificativa | Obrigatório |
| Instituição | Opcional |
| Programa de pesquisa | Opcional |
| Pesquisadores responsáveis | Obrigatório para consolidação |
| Identificadores ORCID | Opcional |
| Data de início | Recomendado |
| Idioma do protocolo | Obrigatório |
| Finalidade do protocolo | Recomendado |

## 6.2. Documentos de entrada

O plugin deverá aceitar, quando tecnicamente disponíveis:

- Protocolos existentes.
- Projetos de pesquisa.
- Documentos de definição da pesquisa.
- Perguntas de pesquisa preliminares.
- Matrizes PCC.
- Critérios de elegibilidade.
- Estratégias de busca.
- Relatórios de buscas-piloto.
- Registros PRISMA-S.
- Relatórios de calibração.
- Planilhas de estudos.
- Atas de reuniões.
- Pareceres de pesquisadores.
- Referências metodológicas.

Formatos previstos: DOCX, PDF, TXT, Markdown, XLSX, CSV e JSON.

## 6.3. Tratamento dos documentos importados

Para cada documento, registrar:

| Campo | Descrição |
|---|---|
| ID | Identificador único |
| Nome | Nome original do arquivo |
| Versão | Versão declarada |
| Data | Data documental |
| Tipo | Categoria do documento |
| Origem | Pesquisador ou fonte responsável |
| Status | Preliminar, aprovado ou substituído |
| Conteúdo relevante | Informações utilizadas |
| Vinculação | Seções do protocolo relacionadas |

Quando houver divergências entre documentos, o plugin deverá apresentar o conflito e solicitar decisão humana.

# 7. ESTRUTURA DO PROTOCOLO JBI

O documento gerado deverá utilizar a seguinte estrutura-base, adaptável às exigências institucionais ou editoriais.

## 7.1. Elementos de identificação

- Título.
- Autores.
- Afiliações.
- Autor correspondente.
- Identificação da versão.
- Data.
- Status documental.
- Informações de registro, quando disponíveis.

O título deverá identificar explicitamente o documento como protocolo de revisão de escopo.

## 7.2. Resumo

Quando aplicável ao formato de publicação, o resumo deverá contemplar:

- Objetivo.
- Introdução ou contextualização.
- Critérios de inclusão.
- Métodos.
- Palavras-chave.

## 7.3. Introdução

A introdução deverá apresentar:

- Contextualização do tema.
- Definição dos conceitos centrais.
- Relevância científica.
- Estado geral do conhecimento.
- Lacunas existentes.
- Justificativa para a realização de uma revisão de escopo.
- Resultados de buscas preliminares por revisões semelhantes, quando realizadas.
- Justificativa da originalidade ou complementaridade da revisão.

## 7.4. Objetivos

### Objetivo geral

Deverá expressar claramente a finalidade de mapeamento das evidências.

### Objetivos específicos

Deverão estar vinculados à pergunta de pesquisa e aos dados que serão extraídos.

## 7.5. Pergunta de pesquisa

A pergunta deverá ser construída com base na estrutura PCC.

| Elemento | Definição |
|---|---|
| P — Population | População ou participantes de interesse |
| C — Concept | Conceito central investigado |
| C — Context | Contexto de aplicação ou investigação |

Quando a população não constituir um elemento restritivo relevante, essa condição deverá ser explicitada e justificada.

O plugin deverá permitir perguntas secundárias, desde que coerentes com a pergunta principal.

## 7.6. Critérios de elegibilidade

### Participantes

Definição das populações ou participantes elegíveis.

### Conceito

Definição operacional do conceito investigado.

### Contexto

Delimitação dos ambientes, setores, instituições ou condições de interesse.

### Tipos de fontes de evidência

Definição das categorias de documentos e desenhos de estudo elegíveis.

### Critérios adicionais

Quando aplicáveis:

- Idiomas.
- Período de publicação.
- Tipos documentais.
- Literatura cinzenta.
- Condições de acesso.
- Critérios específicos de inclusão e exclusão.

Restrições deverão ser justificadas metodologicamente.

## 7.7. Métodos

### 7.7.1. Referencial metodológico

Identificação da metodologia JBI e das diretrizes complementares adotadas.

### 7.7.2. Estratégia de busca

Planejamento da busca conforme a abordagem JBI, contemplando, quando aplicável:

1. Busca inicial limitada em fontes apropriadas.
2. Análise dos termos presentes nos títulos, resumos e vocabulários de indexação.
3. Desenvolvimento e adaptação das estratégias para as fontes selecionadas.
4. Execução das buscas abrangentes.
5. Busca complementar nas referências das fontes relevantes.

O plugin deverá registrar adaptações justificadas a essa abordagem.

### 7.7.3. Fontes de informação

Identificação das bases bibliográficas, plataformas, repositórios e outras fontes.

### 7.7.4. Seleção das fontes de evidência

Definição dos procedimentos de:

- Importação dos registros.
- Deduplicação.
- Triagem de títulos e resumos.
- Avaliação de textos completos.
- Registro dos motivos de exclusão.
- Resolução de divergências.
- Calibração dos revisores.
- Consolidação do fluxo de seleção.

### 7.7.5. Extração de dados

Definição do instrumento de extração, das variáveis, dos responsáveis e do procedimento de teste-piloto.

### 7.7.6. Avaliação crítica

O plugin deverá solicitar a definição sobre a realização ou não de avaliação crítica das fontes de evidência.

Caso seja realizada, deverão ser informados os objetivos, instrumentos e procedimentos.

A avaliação crítica não deverá ser imposta como requisito obrigatório de toda revisão de escopo.

### 7.7.7. Análise e apresentação dos resultados

Planejamento das formas de organização, mapeamento e síntese das evidências.

O plugin deverá permitir:

- Síntese descritiva.
- Distribuições de frequência.
- Mapeamento conceitual.
- Categorização temática.
- Tabelas.
- Gráficos.
- Matrizes.
- Identificação de lacunas de pesquisa.

## 7.8. Declarações complementares

- Contribuição dos autores.
- Financiamento.
- Conflitos de interesse.
- Agradecimentos.
- Registro do protocolo.
- Disponibilidade de materiais.
- Declarações éticas, quando aplicáveis.
- Alterações posteriores ao protocolo.

## 7.9. Referências

O plugin deverá organizar exclusivamente referências identificadas ou verificadas.

Referências não verificadas deverão ser sinalizadas.

## 7.10. Apêndices

O protocolo deverá permitir a vinculação de documentos auxiliares, sem duplicação desnecessária de conteúdo.

# 8. MÓDULOS ESPECIALIZADOS

## 8.1. Módulo de delimitação da pesquisa

Responsável pela estruturação do problema, justificativa, objetivos e escopo.

Saídas:

- Matriz de definição da pesquisa.
- Pergunta principal.
- Perguntas secundárias.
- Objetivos.
- Registro de decisões.

## 8.2. Módulo PCC

Responsável pela construção e validação da estrutura PCC.

Deverá identificar:

- Conceitos ambíguos.
- Sobreposição entre elementos.
- Delimitações excessivas.
- Inconsistências com os objetivos.
- Critérios não operacionalizáveis.

## 8.3. Módulo de elegibilidade

Responsável pela construção de critérios operacionais de inclusão e exclusão.

Cada critério deverá conter:

- Identificador.
- Categoria.
- Descrição.
- Justificativa.
- Regra de aplicação.
- Exemplos limítrofes, quando necessários.
- Status de aprovação.

## 8.4. Módulo de estratégias de busca

Responsável pela documentação das expressões de busca.

Deverá permitir:

- Organização por blocos conceituais.
- Vocabulários controlados.
- Termos livres.
- Sinônimos.
- Operadores booleanos.
- Truncamentos.
- Operadores de proximidade.
- Adaptação de sintaxe por plataforma.
- Estratégias principais e complementares.
- Controle de versões.
- Identificação de redundâncias e relações de inclusão lógica.

As estratégias originais importadas deverão ser preservadas literalmente.

## 8.5. Módulo de buscas-piloto e calibração

Responsável pelo registro dos testes das estratégias.

Deverá permitir integração com plugins especializados em calibração bibliográfica, quando disponíveis.

Dados mínimos:

| Campo | Registro |
|---|---|
| Identificador da estratégia | Obrigatório |
| Base e plataforma | Obrigatório |
| Versão da expressão | Obrigatório |
| Data de execução | Quando executada |
| Expressão efetivamente executada | Quando executada |
| Filtros aplicados | Quando executada |
| Total recuperado | Quando executada |
| Estudos de referência recuperados | Quando avaliados |
| Problemas identificados | Quando existentes |
| Alterações propostas | Quando existentes |
| Justificativa | Obrigatória para alterações |
| Decisão humana | Obrigatória para aprovação |

O módulo não deverá simular resultados de buscas não executadas.

## 8.6. Módulo PRISMA-S

Responsável pela criação e atualização do registro das buscas.

Deverá contemplar os 16 itens do PRISMA-S:

| Nº | Requisito |
|---|---|
| 1 | Bases de dados e plataformas |
| 2 | Busca simultânea em múltiplas bases |
| 3 | Registros de estudos |
| 4 | Recursos online e navegação |
| 5 | Busca por citações |
| 6 | Contatos com pesquisadores |
| 7 | Outros métodos |
| 8 | Estratégias completas |
| 9 | Limites e restrições |
| 10 | Filtros de busca |
| 11 | Estratégias de trabalhos anteriores |
| 12 | Atualização das buscas |
| 13 | Datas das buscas |
| 14 | Revisão por pares |
| 15 | Total de registros recuperados |
| 16 | Deduplicação |

Para cada item, registrar a situação, a evidência documental, a seção correspondente, as pendências e o responsável.

## 8.7. Módulo PRISMA-ScR

Responsável pelo mapeamento prospectivo dos requisitos de relato da revisão de escopo.

| Item | Requisito de relato |
|---|---|
| 1 | Título |
| 2 | Resumo estruturado |
| 3 | Justificativa |
| 4 | Objetivos |
| 5 | Protocolo e registro |
| 6 | Critérios de elegibilidade |
| 7 | Fontes de informação |
| 8 | Busca |
| 9 | Seleção das fontes de evidência |
| 10 | Processo de extração de dados |
| 11 | Itens de dados |
| 12 | Avaliação crítica das fontes individuais |
| 13 | Síntese dos resultados |
| 14 | Seleção das fontes de evidência — resultados |
| 15 | Características das fontes de evidência |
| 16 | Avaliação crítica — resultados |
| 17 | Resultados das fontes individuais |
| 18 | Síntese dos resultados |
| 19 | Resumo das evidências |
| 20 | Limitações |
| 21 | Conclusões |
| 22 | Financiamento |

Os itens 12 e 16 deverão ser tratados conforme a aplicabilidade da avaliação crítica.

Os itens relacionados aos resultados da revisão deverão permanecer classificados como futuros, não executados ou não aplicáveis à fase de protocolo.

O módulo deverá gerar uma matriz de correspondência entre os requisitos de relato e as seções do protocolo.

## 8.8. Módulo de seleção das evidências

Responsável pelo planejamento da triagem.

Deverá registrar:

- Ferramentas utilizadas.
- Número de revisores.
- Independência das avaliações.
- Procedimentos de calibração.
- Resolução de divergências.
- Critérios operacionais.
- Motivos de exclusão.
- Procedimentos de recuperação de textos completos.

## 8.9. Módulo de extração de dados

Responsável pela criação da matriz de extração.

Campos mínimos sugeridos:

- Identificador do estudo.
- Referência.
- Ano.
- País.
- Objetivo.
- Desenho metodológico.
- Participantes.
- Conceito.
- Contexto.
- Resultados relevantes.
- Limitações.
- Variáveis específicas da revisão.

Cada variável deverá possuir definição operacional e vinculação com os objetivos da pesquisa.

## 8.10. Módulo de síntese e apresentação

Responsável pelo planejamento das categorias de análise e formas de apresentação das evidências.

Não deverá gerar conclusões antes da disponibilidade dos dados.

## 8.11. Módulo de auditoria metodológica

Responsável pela verificação de coerência entre os componentes do protocolo.

Deverá identificar:

- Informações ausentes.
- Contradições.
- Decisões sem justificativa.
- Estratégias não validadas.
- Critérios incompatíveis com a pergunta.
- Variáveis sem relação com os objetivos.
- Procedimentos descritos como executados sem evidência.
- Referências não verificadas.
- Divergências entre versões.
- Requisitos metodológicos ainda pendentes.

# 9. FLUXO OPERACIONAL

| Etapa | Processo | Produto |
|---|---|---|
| E01 | Inicialização | Registro do projeto |
| E02 | Importação documental | Inventário de documentos |
| E03 | Delimitação | Matriz de pesquisa |
| E04 | Estruturação PCC | Pergunta de pesquisa |
| E05 | Elegibilidade | Matriz de critérios |
| E06 | Planejamento das buscas | Estratégias preliminares |
| E07 | Calibração, quando realizada | Relatório de testes |
| E08 | Documentação PRISMA-S | Registro das buscas |
| E09 | Planejamento da seleção | Procedimento de triagem |
| E10 | Planejamento da extração | Matriz de dados |
| E11 | Planejamento da síntese | Plano de análise |
| E12 | Mapeamento PRISMA-ScR | Matriz de correspondência |
| E13 | Auditoria | Relatório de pendências |
| E14 | Consolidação | Minuta do protocolo |
| E15 | Validação humana | Versão aprovada |
| E16 | Geração documental | Protocolo e apêndices |
| E17 | Atualizações posteriores | Emendas e novas versões |

O fluxo deverá permitir retorno a etapas anteriores, preservando as versões e decisões registradas.

A existência de buscas definitivas, resultados de triagem ou dados extraídos não deverá ser exigida para a aprovação de um protocolo prospectivo.

# 10. ESTADOS DE DESENVOLVIMENTO

| Estado | Significado |
|---|---|
| NÃO INFORMADO | Informação não fornecida |
| PENDENTE | Informação ou decisão necessária |
| PROPOSTO | Sugestão ainda não aprovada |
| EM ELABORAÇÃO | Conteúdo em desenvolvimento |
| EM CALIBRAÇÃO | Procedimento em teste |
| EM REVISÃO | Conteúdo submetido à avaliação |
| APROVADO | Decisão confirmada pelos responsáveis |
| EXECUTADO | Procedimento realizado e documentado |
| VALIDADO | Procedimento ou documento verificado |
| NÃO APLICÁVEL | Requisito dispensado mediante justificativa |
| SUBSTITUÍDO | Versão preservada, mas não vigente |
| FUTURO | Procedimento previsto para etapa posterior |

O plugin não deverá converter automaticamente estados propostos em aprovados.

# 11. MODELO DE DADOS

## 11.1. Entidades principais

| Entidade | Finalidade |
|---|---|
| Projeto | Identificação da revisão |
| Protocolo | Documento metodológico |
| Pesquisador | Identificação dos responsáveis |
| DocumentoFonte | Evidência documental |
| PerguntaPesquisa | Estrutura PCC |
| Objetivo | Finalidade da investigação |
| CriterioElegibilidade | Regra de seleção |
| FonteInformacao | Base, plataforma ou repositório |
| EstrategiaBusca | Expressão bibliográfica |
| ExecucaoBusca | Registro de execução |
| Calibracao | Registro de testes |
| DecisaoMetodologica | Deliberação dos pesquisadores |
| ItemChecklist | Requisito metodológico ou de relato |
| VariavelExtracao | Campo da matriz de dados |
| Pendencia | Informação ou decisão necessária |
| Versao | Histórico documental |
| Aprovacao | Validação humana |
| Artefato | Documento gerado |

## 11.2. Campos de rastreabilidade

Toda entidade relevante deverá possuir:

- Identificador único.
- Data de criação.
- Data de atualização.
- Versão.
- Status.
- Responsável.
- Fonte documental.
- Histórico de alterações.
- Evidência de aprovação, quando aplicável.

## 11.3. Persistência

O estado do projeto deverá ser armazenado em formato estruturado, preferencialmente JSON, ou em mecanismo equivalente de persistência.

Quando não houver persistência nativa, o plugin deverá gerar um arquivo de estado exportável e importável.

O plugin não deverá presumir que informações de sessões anteriores permanecem acessíveis.

# 12. CONTROLE DE VERSIONAMENTO

## 12.1. Convenção sugerida

| Versão | Finalidade |
|---|---|
| v0.1 | Estrutura inicial |
| v0.2 | Revisão metodológica |
| v0.3 | Consolidação preliminar |
| v0.x | Desenvolvimento e calibração |
| v1.0 | Primeira versão aprovada |
| v1.1 | Emenda ou atualização menor |
| v2.0 | Alteração metodológica substancial |

## 12.2. Histórico obrigatório

Cada alteração deverá registrar:

- Versão anterior.
- Nova versão.
- Data.
- Seção alterada.
- Conteúdo anterior.
- Conteúdo atualizado.
- Justificativa.
- Responsável.
- Aprovação.
- Impactos em documentos vinculados.

## 12.3. Emendas ao protocolo

Alterações posteriores à aprovação deverão ser identificadas como emendas, preservando o protocolo originalmente aprovado.

# 13. DOCUMENTOS GERADOS

## 13.1. Documento principal

Protocolo JBI para revisão de escopo.

Nome sugerido:

Protocolo_JBI_Revisao_Escopo_vX_Y.docx

## 13.2. Documentos auxiliares

| Código | Documento |
|---|---|
| A01 | Matriz de definição da pesquisa e PCC |
| A02 | Matriz de critérios de elegibilidade |
| A03 | Estratégias completas de busca |
| A04 | Registro PRISMA-S |
| A05 | Matriz prospectiva PRISMA-ScR |
| A06 | Relatório de buscas-piloto e calibração |
| A07 | Instrumento PRESS, quando adotado |
| A08 | Manual de triagem |
| A09 | Matriz de extração de dados |
| A10 | Plano de análise e síntese |
| A11 | Registro de decisões metodológicas |
| A12 | Histórico de alterações |
| A13 | Relatório de auditoria metodológica |
| A14 | Registro de aprovação dos pesquisadores |
| A15 | Modelo de fluxograma PRISMA |
| A16 | Estado estruturado do projeto |

A numeração dos apêndices deverá ser configurável, respeitando documentos já existentes no projeto.

## 13.3. Formatos de saída

| Formato | Aplicação |
|---|---|
| DOCX | Protocolo e documentos editáveis |
| PDF | Versões consolidadas para distribuição |
| XLSX | Matrizes e registros tabulares |
| CSV | Interoperabilidade de dados |
| JSON | Persistência e transferência de estado |
| Markdown | Documentação e integração com outros sistemas |

A disponibilidade efetiva de cada formato dependerá das ferramentas integradas ao plugin.

# 14. PADRÃO DE FORMATAÇÃO DOCUMENTAL

O plugin deverá permitir a configuração de:

- Tamanho de página.
- Margens.
- Tipografia.
- Espaçamento.
- Hierarquia de títulos.
- Numeração de seções.
- Estilo de referências.
- Cabeçalhos e rodapés.
- Identificação institucional.
- Sumário.
- Numeração de tabelas e figuras.
- Identificação dos apêndices.

Como configuração inicial sugerida:

| Elemento | Padrão |
|---|---|
| Papel | A4 |
| Fonte | Arial |
| Corpo do texto | 11 ou 12 pontos |
| Títulos principais | 14 pontos |
| Espaçamento | 1,5 |
| Margens | 2,5 cm |
| Idioma | Português brasileiro |
| Referências | Configurável |
| Rodapé | Projeto, versão e página |

O padrão deverá ser substituível por modelos institucionais ou editoriais.

# 15. COMANDOS E INTENÇÕES DO USUÁRIO

O plugin deverá reconhecer comandos em linguagem natural.

| Comando | Ação esperada |
|---|---|
| Iniciar protocolo JBI | Criar projeto |
| Importar protocolo | Analisar documento existente |
| Definir PCC | Ativar módulo PCC |
| Gerar critérios | Construir matriz de elegibilidade |
| Importar estratégias | Registrar expressões existentes |
| Registrar busca-piloto | Documentar execução |
| Gerar PRISMA-S | Criar registro das buscas |
| Gerar PRISMA-ScR | Criar matriz prospectiva de relato |
| Validar protocolo | Executar auditoria |
| Atualizar protocolo | Incorporar informações aprovadas |
| Comparar versões | Apresentar diferenças |
| Gerar protocolo JBI | Consolidar documento principal |
| Gerar apêndices | Produzir documentos auxiliares |
| Listar pendências | Apresentar requisitos não resolvidos |
| Registrar aprovação | Documentar decisão humana |
| Gerar pacote documental | Exportar documentos disponíveis |
| Retomar projeto | Importar ou recuperar estado |

# 16. ARQUITETURA FUNCIONAL

O plugin deverá ser modular e interoperável.

Componentes previstos:

1. Orquestrador do fluxo metodológico.
2. Interpretador de documentos.
3. Gerenciador do estado do projeto.
4. Motor de validação metodológica.
5. Gerenciador de decisões.
6. Gerenciador de estratégias de busca.
7. Motor de checklists.
8. Gerenciador de versões.
9. Gerador de documentos.
10. Exportador de dados.
11. Adaptadores de integração com outros plugins.

A arquitetura deverá permitir integração com ferramentas de calibração de buscas, gerenciamento bibliográfico, triagem e produção documental.

# 17. REGRAS DE NEGÓCIO

| Código | Regra |
|---|---|
| RN01 | JBI constitui o referencial metodológico principal. |
| RN02 | PRISMA-ScR constitui diretriz de relato complementar. |
| RN03 | PRISMA-S orienta o registro das buscas. |
| RN04 | Informações ausentes deverão ser sinalizadas. |
| RN05 | Dados não poderão ser fabricados. |
| RN06 | Decisões relevantes exigem confirmação humana. |
| RN07 | Estratégias importadas deverão ser preservadas. |
| RN08 | Alterações deverão gerar histórico. |
| RN09 | Buscas planejadas e executadas deverão ser diferenciadas. |
| RN10 | Resultados futuros não poderão ser apresentados como obtidos. |
| RN11 | Requisitos não aplicáveis deverão ser justificados. |
| RN12 | Conflitos documentais deverão ser apresentados ao pesquisador. |
| RN13 | Referências não verificadas deverão ser identificadas. |
| RN14 | Documentos aprovados não poderão ser sobrescritos silenciosamente. |
| RN15 | O protocolo poderá ser consolidado antes das buscas definitivas. |
| RN16 | A geração de uma minuta poderá ocorrer com pendências explícitas. |
| RN17 | A aprovação final dependerá de validação humana. |
| RN18 | A numeração dos apêndices deverá respeitar o projeto existente. |
| RN19 | O plugin não deverá realizar registros externos sem autorização. |
| RN20 | A ausência de uma ferramenta deverá ser comunicada ao usuário. |
| RN21 | Checklists não deverão ser convertidos em escores de qualidade não validados. |
| RN22 | A atualização de um documento deverá identificar impactos nos documentos vinculados. |

# 18. CRITÉRIOS DE VALIDAÇÃO

## 18.1. Validação estrutural

Verificar a existência das seções metodológicas necessárias.

## 18.2. Validação conceitual

Verificar a coerência entre tema, PCC, pergunta e objetivos.

## 18.3. Validação operacional

Verificar se os procedimentos planejados são suficientemente descritos para reprodução.

## 18.4. Validação documental

Verificar fontes, versões, apêndices, referências e evidências de aprovação.

## 18.5. Validação prospectiva PRISMA-ScR

Verificar se o planejamento contempla os requisitos de relato aplicáveis à fase de protocolo.

## 18.6. Validação PRISMA-S

Verificar a documentação disponível das estratégias e procedimentos de busca.

## 18.7. Classificação das ocorrências

| Nível | Descrição |
|---|---|
| Crítico | Compromete a integridade ou coerência metodológica |
| Alto | Impede a consolidação de uma versão aprovada |
| Moderado | Requer esclarecimento ou complementação |
| Baixo | Melhoria documental recomendada |
| Informativo | Registro de observação |

# 19. CRITÉRIOS DE ACEITAÇÃO DO PLUGIN

| ID | Teste | Resultado esperado |
|---|---|---|
| CA01 | Iniciar projeto sem documentos | Coletar informações essenciais |
| CA02 | Importar protocolo existente | Identificar seções e conteúdo |
| CA03 | Importar estratégias de busca | Preservar expressões originais |
| CA04 | Encontrar informação ausente | Sinalizar pendência |
| CA05 | Encontrar documentos contraditórios | Solicitar decisão humana |
| CA06 | Alterar estratégia aprovada | Criar nova versão |
| CA07 | Gerar PRISMA-S sem buscas executadas | Manter datas e contagens pendentes |
| CA08 | Gerar PRISMA-ScR na fase de protocolo | Classificar resultados como futuros |
| CA09 | Gerar minuta incompleta | Identificar limitações e pendências |
| CA10 | Aprovar protocolo sem buscas definitivas | Permitir quando o planejamento estiver adequado |
| CA11 | Solicitar versão aprovada sem validação humana | Não declarar aprovação |
| CA12 | Retomar projeto | Recuperar estado e histórico disponíveis |
| CA13 | Exportar documento | Gerar arquivo quando houver ferramenta disponível |
| CA14 | Encontrar referência não verificada | Sinalizar necessidade de verificação |
| CA15 | Comparar versões | Apresentar alterações rastreáveis |
| CA16 | Importar apêndices existentes | Preservar identificação e numeração |
| CA17 | Encontrar estratégia logicamente redundante | Apresentar alerta metodológico |
| CA18 | Encontrar ferramenta indisponível | Comunicar limitação sem simular execução |

# 20. INSTRUÇÕES CENTRAIS DE COMPORTAMENTO

O agente responsável pelo plugin deverá assumir o papel de assistente metodológico especializado em revisões de escopo.

Deverá:

1. Identificar a modalidade de operação solicitada.
2. Verificar os documentos e informações disponíveis.
3. Recuperar o estado do projeto, quando existente.
4. Identificar a etapa metodológica atual.
5. Preservar decisões anteriormente aprovadas.
6. Identificar informações ausentes ou contraditórias.
7. Formular propostas metodológicas justificadas.
8. Solicitar confirmação quando necessário.
9. Atualizar os registros estruturados.
10. Gerar os documentos solicitados.
11. Apresentar pendências e limitações.
12. Preservar o histórico documental.

O agente deverá evitar perguntas repetidas sobre informações já disponíveis e não deverá bloquear a geração de minutas por pendências que possam ser explicitamente registradas.

# 21. REQUISITOS NÃO FUNCIONAIS

## 21.1. Usabilidade

Interação em linguagem natural, com orientação progressiva e linguagem acadêmica clara.

## 21.2. Reprodutibilidade

Preservação das expressões de busca, parâmetros, decisões, versões e evidências.

## 21.3. Interoperabilidade

Capacidade de importar e exportar dados estruturados.

## 21.4. Modularidade

Possibilidade de integração ou substituição de módulos especializados.

## 21.5. Segurança

Proteção das informações fornecidas pelos pesquisadores e respeito às permissões de acesso.

## 21.6. Transparência

Identificação explícita das limitações técnicas e metodológicas.

## 21.7. Portabilidade

Possibilidade de transferência do estado do projeto entre sessões e ambientes compatíveis.

## 21.8. Manutenibilidade

Separação entre instruções metodológicas, modelos documentais, regras de negócio e mecanismos de execução.

# 22. ESTRUTURA SUGERIDA DO PACOTE DE IMPLEMENTAÇÃO

A organização abaixo constitui uma proposta independente de plataforma, devendo ser adaptada ao ambiente de implantação.

    jbi-scoping-protocol/
        README.md
        SPECIFICATION.md
        SKILL.md
        CHANGELOG.md

        references/
            jbi-methodology.md
            prisma-scr-checklist.md
            prisma-s-checklist.md
            press-guidance.md

        modules/
            project-initialization.md
            pcc-definition.md
            eligibility.md
            search-strategies.md
            search-calibration.md
            prisma-s.md
            prisma-scr.md
            screening.md
            data-charting.md
            synthesis.md
            methodological-audit.md
            document-generation.md
            version-control.md

        templates/
            protocol-jbi.docx
            pcc-matrix.xlsx
            eligibility-matrix.xlsx
            prisma-s.docx
            prisma-scr.xlsx
            search-log.xlsx
            data-charting.xlsx
            decision-log.xlsx
            audit-report.docx

        schemas/
            project.schema.json
            protocol.schema.json
            search.schema.json
            decision.schema.json
            checklist.schema.json
            version.schema.json

        workflows/
            initialize-project.md
            import-protocol.md
            update-protocol.md
            validate-protocol.md
            generate-protocol.md
            resume-project.md

        tests/
            acceptance-tests.md
            methodological-tests.md
            document-tests.md
            test-cases.json

Os nomes, formatos e mecanismos de carregamento deverão ser adequados à plataforma escolhida.

# 23. ESTRATÉGIA DE IMPLEMENTAÇÃO

| Fase | Entregáveis |
|---|---|
| Fase 1 — Núcleo metodológico | Instruções, PCC, elegibilidade e estrutura JBI |
| Fase 2 — Gestão documental | Importação, estado do projeto e versionamento |
| Fase 3 — Buscas | Estratégias, calibração e PRISMA-S |
| Fase 4 — Relato | Matriz PRISMA-ScR |
| Fase 5 — Planejamento operacional | Triagem, extração e síntese |
| Fase 6 — Geração documental | Protocolo e apêndices |
| Fase 7 — Auditoria | Regras de validação e testes |
| Fase 8 — Integração | Comunicação com outros plugins |
| Fase 9 — Homologação | Testes com projetos reais e aprovação humana |

# 24. PRODUTO MÍNIMO VIÁVEL — MVP

A primeira versão funcional deverá permitir:

- Iniciar ou importar um projeto.
- Estruturar a pergunta PCC.
- Documentar critérios de elegibilidade.
- Importar estratégias de busca.
- Gerar registro PRISMA-S preliminar.
- Gerar matriz prospectiva PRISMA-ScR.
- Estruturar os métodos conforme JBI.
- Identificar pendências.
- Gerar minuta do protocolo.
- Registrar versões e decisões.
- Exportar o estado estruturado do projeto.

Funcionalidades avançadas poderão ser incorporadas posteriormente.

# 25. CASO DE TESTE DE REFERÊNCIA

Utilizar como cenário inicial de homologação uma revisão de escopo sobre jogos com integração físico-digital no contexto de Redes de Computadores.

Documentos e informações disponíveis:

- Protocolo JBI v0.2, referenciado no documento de origem.
- Apêndice I — Estratégias preliminares de busca na Scopus v0.1.
- Estratégia principal S0-SCOPUS-P.
- Estratégia complementar S0-SCOPUS-C.
- Blocos conceituais B1, B2 e B3.
- Previsão de participação dos pesquisadores R1, R2 e R3.
- Previsão de outras sete fontes de informação.
- Buscas ainda não executadas, conforme o apêndice.

Comportamento esperado:

- Preservar as estratégias originais.
- Não presumir acesso ao conteúdo integral do protocolo JBI v0.2.
- Não inventar as outras sete fontes.
- Identificar a relação de inclusão lógica entre as estratégias.
- Gerar o registro PRISMA-S preliminar.
- Registrar as pendências de calibração e execução.
- Preservar o estado de aprovação para teste.
- Permitir a atualização posterior mediante evidências documentais.

# 26. REFERÊNCIAS METODOLÓGICAS ESSENCIAIS

JBI. *JBI Manual for Evidence Synthesis*. Capítulo sobre revisões de escopo. Disponível em: https://synthesismanual.jbi.global/

TRICCO, A. C. et al. PRISMA Extension for Scoping Reviews (PRISMA-ScR): Checklist and Explanation. *Annals of Internal Medicine*, v. 169, n. 7, p. 467–473, 2018. DOI: 10.7326/M18-0850.

RETHLEFSEN, M. L. et al. PRISMA-S: an extension to the PRISMA Statement for Reporting Literature Searches in Systematic Reviews. *Systematic Reviews*, v. 10, art. 39, 2021. DOI: 10.1186/s13643-020-01542-z.

MCGOWAN, J. et al. PRESS Peer Review of Electronic Search Strategies: 2015 Guideline Statement. *Journal of Clinical Epidemiology*, v. 75, p. 40–46, 2016. DOI: 10.1016/j.jclinepi.2016.01.021.

PAGE, M. J. et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. *BMJ*, v. 372, n71, 2021. DOI: 10.1136/bmj.n71.

As versões vigentes dos referenciais deverão ser verificadas durante a implementação e homologação do plugin.

---

**FIM DA ESPECIFICAÇÃO**

Documento de especificação funcional e metodológica — v1.0.

Proposta sujeita à revisão, implementação técnica e validação humana.