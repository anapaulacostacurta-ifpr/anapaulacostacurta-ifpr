# Sequência didática de Sub-redes IPv4

Site em HTML, CSS e JavaScript com Google Authentication, Cloud Firestore, liberação docente e envios imutáveis. Projeto Firebase: networking-taks. Esta é uma aplicação independente da autoavaliação e do site anterior; não migra envios antigos.

## Instalação
1. Autorize o domínio publicado em Authentication > Configurações > Domínios autorizados. Para GitHub Pages: SEU-USUARIO.github.io, sem protocolo ou caminho. Habilite Google em Método de login se necessário.
2. No banco Firestore padrão, adicione firestore.sequencia.rules DENTRO de match /databases/{database}/documents das regras atuais. O arquivo é um FRAGMENTO, não um conjunto completo de regras. Preserve regras de outras atividades. Não adicione regras globais públicas. Publicar o site não publica as regras do Firebase.
3. Entre em professor.html. Cadastre a conta docente em professores/SEU_UID, campo ativo booleano true, pelo console Firebase. A conta autorizada das atividades anteriores pode ser reutilizada. Os estudantes não podem criar ou alterar professores.
4. Baixe separadamente sequencia.json, arquivo de preparação reservado à professora. NÃO publique esse arquivo no repositório/site público. Entre no painel > Liberação das etapas > Importe o arquivo sequencia.json. A operação prepara os conteúdos no Firestore e todas as etapas ficam inicialmente bloqueadas. Sem importar, a sequência fica fechada. O JSON não está no ZIP do site para evitar disponibilizar os enunciados junto aos arquivos estáticos.
5. Libere a etapa 1. Teste com conta Google diferente da docente: conteúdo fechado invisível, etapa aberta acessível, envio confirmado e consulta somente leitura. Feche a etapa e confirme que quem não enviou não recebe o enunciado; quem enviou consulta sua resposta. Teste também que não é possível pular a anterior. O login e as regras reais NÃO foram testados administrativamente neste projeto.

## Fluxo dos estudantes
Login Google > turma > menu das seis etapas. Para responder é preciso liberação docente E envio da etapa anterior. Etapa bloqueada apresenta somente mensagem, sem formulário ou enunciado; não é feita leitura de seu conteúdo. O conteúdo fica em documentos Firestore protegidos. Revogação da liberação é acompanhada em tempo real quando há rede, removendo o conteúdo da tela. Envios consultam novamente o controle no servidor e falham se a etapa fechar durante o preenchimento. Não é possível apagar de memória aquilo que alguém já leu, fotografou ou copiou enquanto estava liberado.
Após o envio, o estudante apenas consulta e baixa sua resposta. Reabrir etapa permite novos envios de quem ainda não enviou, não edição de quem já enviou. As regras negam update/delete de respostas, inclusive pelo painel docente. Alterações administrativas no console não são controladas pelo site.
Rascunhos permanecem locais por conta, sequência e etapa. Envios finais persistem na nuvem e podem ser consultados em outro navegador. Não há retomada de rascunhos na nuvem.

## Etapas preparadas
1. Diagnóstico individual da rede 192.168.10.0/24 com quatro PCs.
2. Charada de conversão binária e IPv4.
3. Vídeo de /24 para duas /25 e questionário (MP4 incluído; sem narração).
4. Divisão em quatro /26 no papel e transcrição do planejamento.
5. Implementação e testes no Packet Tracer, com apresentação à professora.
6. Reflexão e mapa conceitual no papel.
O nome do .pkt é registrado, mas NÃO há upload de arquivo .pkt ou foto do papel. A entrega do arquivo ocorre no canal indicado pela professora. O site registra e organiza a sequência; não avalia automaticamente correção de cálculos nem aprendizagem. A charada valida endereço exato, não é autenticação.

## Painel docente
Liberação: botões Liberar/Bloquear por etapa; Consultar conteúdo para revisar enunciados; etapa do vídeo permite editar o endereço MP4. A preparação não pode ser repetida sobre sequência instalada.
Consulta: Envios dos alunos, pesquisa por nome/e-mail/turma e filtros Todos/Com respostas/Sem envio. Lista paginada de 100 estudantes; Carregar mais amplia, Atualizar relê contagens. Clique no estudante para selecionar etapa, consultar respostas, voltar à lista e salvar observações. Observações por estudante, compartilhadas com docentes autorizados; último salvamento substitui o anterior. Sem histórico ou edição simultânea coordenada.

## Arquitetura e dados
- sequencias/subredes-ipv4-2026-v1/controle/estado: flags de liberação.
- sequencias/SEQUENCIA/conteudos/ETAPA: conteúdo protegido.
- sequencias/SEQUENCIA/alunos/UID: identificação.
- sequencias/SEQUENCIA/alunos/UID/respostas/ETAPA: resposta imutável, rótulos e data do servidor.
- sequencias/SEQUENCIA/observacoes/UID: observação docente.
A configuração Firebase Web é pública. Não inclua conta de serviço, senha ou chave privada. Contas Google de qualquer domínio podem autenticar; não foi solicitada lista institucional. O mesmo documento professores é usado nas outras aplicações; mudanças de autorização afetam esse acesso compartilhado.

## GitHub Pages
Publique os arquivos deste ZIP com index.html na raiz. Settings > Pages > Deploy from a branch > main > / (root). Caminhos relativos funcionam em /nome-do-repositorio/. Não publique o JSON de preparação nem arquivos de respostas dos alunos. O vídeo estático tem URL compartilhável; o site não oferece DRM ou bloqueio de cópia de mídia. Os enunciados estão protegidos pelo Firestore, mas um aluno que já abriu uma etapa pode copiá-los.
Para outra aplicação/turma, use novo sequenceId em config.js e ajuste sequenceId no JSON de preparação antes de importar. Isso não afeta as sequências já registradas. Mudança de perguntas/IDs exige ajuste da validação nas regras; preserve snapshots dos envios. Não modificar o namespace após receber respostas se a intenção for consultar a mesma turma.

## Verificação realizada
Nove testes automatizados com serviços simulados: bloqueio, pré-requisito, preservação de consulta, validação, não sobrescrita, falha de envio, troca de conta e ausência/remoção de enunciado e formulário na tela bloqueada. Telas sem login verificadas no navegador. Não houve envio real, alteração de regras ou cadastro de docente no console. Teste duas contas após configurar o projeto.
