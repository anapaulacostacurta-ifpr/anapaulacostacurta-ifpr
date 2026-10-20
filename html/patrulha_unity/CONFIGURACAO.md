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
