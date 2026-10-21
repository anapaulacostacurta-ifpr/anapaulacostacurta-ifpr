# Configuração pela professora

O site utiliza o projeto networking-taks e login Google. Não inclui chave privada ou conta de serviço.

1. No Firebase Console desse projeto, habilite Authentication > Google, caso ainda não esteja habilitado.
2. Em Authentication > Settings > Authorized domains, adicione patrulha-tempo-unity.silky-ridge-9952.chatgpt.site (somente o domínio, sem https).
3. Crie o Cloud Firestore, se ainda não existir.
4. No editor de regras do Firestore, incorpore os blocos de firestore.rules às regras existentes. NÃO substitua regras de outras atividades. Regras amplas já existentes podem autorizar gravações que estas regras tentam restringir: remova permissões globais sobre esta coleção. Teste as regras no simulador antes de aplicar aos estudantes.
5. Teste com uma conta de estudante: enviar etapa 0, atualizar a página e retomar na etapa 1; conferir respostas no Console. Uma tentativa de editar etapa já enviada ou criar etapa 2 sem etapa 1 deve ser negada.

Caminho de respostas: patrulhaTempoV1/{uid}/etapas/{0 a 5}. Cada documento contém nome, email, respostas e horário do servidor. Os documentos pai não precisam existir. No Console, entre na coleção e no documento com UID para abrir as subcoleções.
Eventos: patrulhaTempoV1/{uid}/eventos. Registros são contextuais e não provam uso de IA. Não há desconto automático.

Rascunhos ficam somente no navegador até o envio. Etapas avançam após confirmação do Firestore. Não há aprovação automática por correção: é obrigatório preencher as quatro respostas. A demonstração não grava no Firebase. Login e gravação dependem de configuração e rede; não foram verificados com uma conta real pela construção do site.

Copiar, recortar, colar e soltar texto são interceptados somente nos campos. Isso é contornável; não impede consultas em outro dispositivo. Ajustes de acessibilidade devem ser combinados antes da aula.

A hospedagem inicial do Site é privada para a proprietária. Para uso pela turma, a audiência precisa ser alterada explicitamente nas configurações de compartilhamento do Site. Autorizar domínio no Firebase não altera a audiência da hospedagem.


## Novo controle docente de liberação e bloqueio

Esta versão mantém o envio BLOQUEADO enquanto o controle não existir ou não puder ser confirmado pelo servidor. Não há alteração automática de regras ou dados do seu Firebase.

1. Incorpore as regras atualizadas de firestore.rules no editor do Firebase, preservando as regras de outras atividades. Permissões globais sobre estes caminhos precisam ser removidas/restringidas para não anular o bloqueio.
2. Acesse Firebase Authentication > Users e localize o UID da conta Google que a professora utilizará.
3. Pelo Console Firestore, crie a coleção patrulhaTempoDocentes e um documento cujo ID seja exatamente esse UID. Adicione o campo ativo, tipo boolean, valor true. Este cadastro é administrativo: o site não permite que alunos se promovam a professores.
4. Entre no site com essa conta. Aparecerá a Área da professora no topo da atividade. Clique em Liberar respostas ou Bloquear respostas. A mudança vale para TODOS os estudantes e todas as etapas desta atividade.
5. O controle será gravado em patrulhaTempoControle/atividade, com aberto, alteradoEm e alteradoPor. A professora pode criar esse documento pelo botão Liberar respostas; não é preciso criá-lo manualmente.
6. Teste com duas contas: professora e aluno. Bloqueie enquanto um aluno está digitando; os campos devem ficar somente para leitura, mantendo o texto. Libere novamente e envie. Confirme no simulador que aluno não altera o controle nem se cadastra como docente, e que a criação de etapa é negada quando aberto=false ou quando o controle não existe.

O bloqueio impede novos envios e edição do rascunho na interface enquanto vigorar. As respostas anteriores continuam consultáveis; ao liberar, o aluno retoma do ponto em que parou. Etapas já enviadas NÃO são reabertas para edição pelo botão Liberar respostas.

O instante de aceitação é o processamento no servidor: envios já aceitos antes do bloqueio não são cancelados. Eventos de aba continuam sendo registrados independentemente da liberação das respostas. O controle docente precisa ser testado no projeto real após instalar as regras e cadastrar o UID.


## Geolocalização obrigatória para novos envios

1. Atualize firestore.rules no Firebase. Preserve as regras de outras atividades e restrinja regras globais permissivas. Sem estas regras o controle do navegador é contornável.
2. Entre com a conta cadastrada como docente. Na Área da professora, informe latitude, longitude, raio em metros e precisão máxima aceita. Pode usar o botão Usar minha localização como centro, estando no local autorizado. Confira os valores e clique em Salvar local no Firebase.
3. O local ficará no documento patrulhaTempoControle/local. Campos: centro (GeoPoint), raioMetros (número), maxPrecisaoMetros (número), alteradoPor e alteradoEm. Nenhuma coordenada é presumida automaticamente pelo site.
4. Libere as respostas. O aluno marca o aviso e permite a localização no navegador. Cada envio solicita uma nova medição, sem cache e sem monitoramento contínuo. A verificação avulsa não substitui a nova verificação do envio.
5. Serão salvos em cada etapa: localizacao.ponto (GeoPoint), precisaoMetros e coletadoEm. As regras comparam a distância declarada ao centro em metros, limite de precisão e idade da medição (até dois minutos, tolerância de dez segundos para relógio adiantado). O horário definitivo de envio continua sendo do servidor.
6. Se faltar configuração, houver negativa de permissão, erro, precisão insuficiente ou posição fora do raio, não há avanço. Os registros antigos sem localização continuam legíveis e preservados. Computadores de laboratório sem GPS podem retornar erros de centenas ou milhares de metros; faça um teste no laboratório antes de exigir presença por localização.
7. Use a URL HTTPS diretamente no navegador. Iframes ou políticas de permissões da hospedagem podem bloquear geolocalização. Se a prévia embutida bloquear, abra o site em nova aba. O GitHub Pages serve HTTPS.

Limite técnico: as coordenadas e a precisão vêm do navegador e podem ser falsificadas. As regras validam os valores informados, não atestam a presença física. Esta funcionalidade é um controle adicional, não uma prova antifraude de presença.

A precisão máxima aceita é um limite sobre a margem de erro declarada, não uma ampliação do raio. A comparação usa o ponto central da medição; o dispositivo pode estar fisicamente do outro lado do limite de incerteza. Ajuste raio e precisão à realidade do laboratório sem presumir exatidão.

Verifique antes da aplicação: posição dentro/fora do raio, precisão insuficiente, permissão negada, ausência de configuração, alteração de centro durante a medição, medição antiga, tentativa de aluno alterar o centro e consulta de respostas antigas. As regras e a gravação real precisam ser validadas no projeto Firebase. Há coordenadas pessoais nos registros; acesso de estudantes continua limitado às próprias respostas.


## Proteção dos textos da atividade

Seleção, cópia, recorte, arraste e menu de contexto são interceptados nos enunciados, códigos, questões e registros exibidos para consulta. Atalhos Ctrl/Cmd+C, X e seleção geral são interceptados durante a atividade fora dos campos editáveis. Os controles docentes ficam fora dessa proteção. A seleção dentro da resposta permanece possível para edição; copiar e colar nos campos continuam bloqueados como antes.

Não há bloqueio de captura de tela, fotos, OCR, transcrição manual ou inspeção do código-fonte. Não é um controle antifraude garantido. O leitor de tela e a navegação por teclado não são intencionalmente bloqueados. Quando a seleção ou cópia for necessária como recurso de acessibilidade, combine uma adaptação com o aluno. Regras Firebase não precisam mudar nesta atualização: utiliza os tipos de eventos já existentes.


## Liberação configurável por etapa

Na Área da professora há seis caixas de seleção. Marque as etapas que poderão receber respostas e clique em Salvar liberação das etapas. Marcar todas e Desmarcar todas apenas preenchem as opções: a alteração só vale depois de salvar. O controle é global para os alunos desta atividade, não individual por aluno.

Atualize as regras firestore.rules. O documento patrulhaTempoControle/etapas terá liberadas (lista com seis booleanos, índices 0 a 5), alteradoPor e alteradoEm. Sem esse documento ou sem confirmação do servidor, novas respostas ficam bloqueadas. Não é necessário criar o documento manualmente: salve as opções pelo painel docente.

Para enviar, o aluno precisa atender a quatro condições: envio geral liberado, etapa marcada, etapa anterior concluída e localização aprovada. Liberar apenas a etapa 3 não pula etapas 1 e 2. Alunos que já concluíram 1 e 2 poderão enviar a 3 se ela estiver marcada. Respostas antigas continuam consultáveis; o bloqueio não as apaga nem reabre para edição. Conteúdo da etapa atual continua visível para consulta enquanto aguarda liberação.

Teste alternando as caixas com outra conta de aluno conectada. Verifique também no simulador que uma etapa desmarcada não aceita gravação mesmo com o envio geral aberto. A liberação efetiva e as regras precisam ser testadas no Firebase real.


## Painel de respostas e observações

Instale as regras atualizadas. Entre como docente e abra Área da professora > Respostas dos alunos e observações. Clique em Atualizar lista de alunos, filtre por nome/e-mail e abra um aluno. Cada etapa mostra suas quatro respostas e o horário do envio. Etapas não enviadas são identificadas.

As observações por aluno ficam em patrulhaTempoObservacoes/{UID}. As observações gerais da atividade ficam no documento patrulhaTempoObservacoes/_turma. Somente docentes cadastrados podem ler ou gravar essas anotações. Elas não são feedback visível ao aluno e não alteram suas respostas. Use os botões Salvar; a edição de notas não é automática. Conflitos de gravação entre sessões são verificados por transação: se outra sessão alterar a nota, recarregue antes de salvar. Faça isso com cuidado para não perder o texto em edição.

Novos envios também criam/atualizam um documento de índice em patrulhaTempoV1/{UID}, sem alterar respostas antigas. O índice é gravado no mesmo lote da etapa. Atualize o app e as regras em conjunto para que esse lote tenha permissão.

Para localizar registros antigos cujos documentos-pai não existem, o painel tenta a listagem REST showMissing com o token Firebase do docente. Não há conta de serviço nem chave privada no navegador. Se a API não permitir essa listagem, o painel informa a limitação e lista os documentos de índice existentes. Nesse caso, consulte um UID manualmente pelo painel (copie-o do Console Firestore) ou crie o documento de índice no Console. Nenhuma resposta antiga é apagada ou regravada para migração.

O painel carrega ao clicar Atualizar, não acompanha todos os envios em tempo real. Cada atualização pode gerar leituras dos documentos de respostas. A interface foi verificada com dados simulados, mas as consultas, regras, listagem de legados e gravações precisam ser verificadas com contas reais no seu Firebase. A leitura de eventos e coordenadas não foi adicionada ao painel nesta mudança.


## Consulta dos eventos de cada aluno

Instale as regras atualizadas: a subcoleção patrulhaTempoV1/{UID}/eventos passa a permitir leitura somente por docentes cadastrados. Alunos continuam sem acesso de leitura aos registros de eventos de outros alunos.

Abra Área da professora > Respostas dos alunos e observações, consulte um aluno e role até Eventos durante a atividade. A consulta ocorre automaticamente ao abrir o aluno; use Atualizar eventos para repetir. São carregados até 100 registros por página, ordenados por horário mais recente. Use Carregar mais eventos para continuar e o filtro para selecionar tipos entre os registros já carregados. Os totais se referem somente ao que foi carregado, não a toda a coleção quando ainda houver mais páginas.

Cada ocorrência mostra tipo, horário do servidor, etapa e detalhe disponível. Retornos à página podem incluir o tempo fora informado pelo navegador. Os tipos disponíveis são saída/retorno de aba, perda de foco e tentativas bloqueadas de copiar, recortar, colar e soltar texto. Seleção ou menu de contexto bloqueados não foram registrados como novos eventos por esta atualização.

Não há classificação automática de infração. Perda de foco e aba oculta podem representar a mesma ação; consultar os links Unity é permitido. Registros podem faltar por falha de rede, encerramento do navegador, uso de versões anteriores ou manipulação do cliente. O site não registra qual aplicativo ou página externa foi acessado. Nada nesta atualização reconstrói eventos que nunca foram gravados.

Teste a visualização com conta docente e confirme no simulador que uma conta de aluno não consegue ler a coleção de eventos. A consulta real exige conexão e as regras instaladas no seu Firebase.


## Diagnóstico de login

Atualize index.html, app.js e style.css do mesmo pacote. Agora o carregador exibe erros de rede/importação e incompatibilidade de HTML/JS, em vez de deixar o botão sem ação. Recarregue com Ctrl+Shift+R depois da publicação.

Se o erro for auth/unauthorized-domain, autorize exatamente o hostname exibido na mensagem em Authentication > Settings > Authorized domains. Para GitHub Pages é SEU-USUARIO.github.io, sem caminho do repositório. Se for auth/operation-not-allowed, habilite o provedor Google. Para auth/popup-blocked, permita pop-ups e abra a URL fora de prévias/iframes.

O login agora fica separado do carregamento do Firestore. Se Google autenticar mas as regras negarem a leitura, a tela identifica a conta conectada e permite tentar carregar novamente. Os envios permanecem bloqueados até confirmar o progresso do aluno. Não é possível corrigir domínio ou provedor no console Firebase por meio deste pacote.

## Inicialização sem demonstração e publicação em arquivo único

O botão de demonstração e seu registro de onclick foram removidos. A ausência desse botão não interrompe mais o login. O index.html desta versão incorpora o JavaScript e o CSS da aplicação para impedir mistura de versões em publicações parciais. Publique este index.html completo na raiz do repositório e recarregue com Ctrl+Shift+R.

Os arquivos app.js e style.css continuam no pacote como fontes para edição. Após editar esses arquivos ou fontes/index.template.html, execute python3 gerar_index.py antes de publicar o novo index.html. O navegador não carrega app.js/style.css separadamente nesta versão. Firebase e fontes externas ainda exigem internet.

A verificação de inicialização foi executada com DOM e Firebase simulados, sem o botão de demonstração. O login real com conta Google continua dependendo de domínio autorizado, provedor Google habilitado, pop-ups e conexão.
