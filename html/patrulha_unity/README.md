# Publicação no GitHub Pages

Extraia o ZIP e envie os arquivos para a raiz do repositório (index.html na raiz). Em Settings > Pages escolha Deploy from a branch, main, / (root). Não é necessário npm ou compilação.

No Firebase networking-taks, habilite login Google e autorize SEU-USUARIO.github.io em Authentication > Settings > Authorized domains, sem protocolo ou caminho. Incorpore firestore.rules às regras existentes sem remover regras de outras atividades. Regras globais permissivas devem ser revisadas, pois podem permitir operações negadas pelos blocos específicos.

Esta atualização inclui código da patrulha na hipótese inicial, fontes oficiais Unity na investigação, roteiro detalhado de teste de mesa e exibição das respostas originais na revisão. Respostas já enviadas continuam preservadas e a coleção Firebase não mudou.

Confira CONFIGURACAO.md para detalhes. Teste login, envio, retomada, bloqueio de etapas futuras e preservação de respostas antes de aplicar à turma. A demonstração não grava no Firebase. Os registros de saída da aba não comprovam IA; consultar os links Unity na investigação é permitido.

O bloqueio de copiar e colar é contornável. Este pacote não inclui painel docente: consulte os registros no Console Firebase. Para atualizar um GitHub existente, substitua index.html, app.js e style.css. Atualize os demais arquivos de documentação quando necessário.


## Controle de abertura e bloqueio

Atualize também firestore.rules no Firebase: o bloqueio é validado no servidor. Cadastre a professora por UID em patrulhaTempoDocentes/{UID}, com ativo=true (boolean). O site só exibe os botões a docentes cadastrados. Veja CONFIGURACAO.md para as instruções completas. Sem controle criado, o envio fica bloqueado. O botão Liberar permite novos envios, sem reabrir respostas já enviadas.


## Geolocalização

Esta versão exige local autorizado no Firebase para novos envios. Atualize as regras e configure latitude, longitude, raio e precisão máxima na Área da professora. Os envios antigos continuam consultáveis. Consulte CONFIGURACAO.md para funcionamento, privacidade, limitações e testes. Substitua também index.html no GitHub para exibir os novos controles. O navegador precisa autorizar localização em HTTPS; ela pode ser imprecisa ou falsificada e não comprova presença física.
