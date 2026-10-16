# Login Google e Firestore

## Ativar
1. No projeto networking-taks: Authentication > Método de login > Google. Ative, informe o e-mail de suporte do projeto e salve.
2. Authentication > Configurações > Domínios autorizados: adicione o domínio do site, sem https e sem caminho. Para GitHub Pages: SEU-USUARIO.github.io. Para o endereço atual: laboratorio-subredes-ipv4.silky-ridge-9952.chatgpt.site. Se o GitHub usa domínio personalizado, adicione-o também.
3. Crie o Firestore padrão em produção, se ainda não existir. Em Regras, publique o arquivo firestore.rules desta versão. As regras exigem autenticação pelo provedor Google e e-mail igual ao token; não permitem editar ou excluir envios.
4. Envie os arquivos desta versão para GitHub Pages e aguarde o deploy. Permita pop-ups para o site. Se aparecer auth/unauthorized-domain confira o domínio. Se auth/operation-not-allowed, confira a ativação Google. Contas escolares podem ter restrições definidas pelo administrador.
5. Teste com uma conta Google autorizada e identificação fictícia. No Firestore: participantes > UID > envios. Confira uid, email, nome, turma, kind, payload e receivedAt. O site só libera após confirmação. Não houve teste OAuth real nesta entrega.

## Conta e progresso
Login via popup com escolha de conta, sem pedir senha na página. Login persiste na sessão do navegador; recomenda-se sempre Sair em computadores compartilhados. Nome e e-mail vêm da conta Google; turma é declarada. Rascunhos são separados por UID no mesmo domínio. Trocar domínio ou computador não restaura automaticamente progresso: ainda não há recuperação do andamento pela nuvem.

As participações anônimas antigas não são migradas. Os rascunhos legados são preservados no navegador, mas não exibidos pelo novo fluxo. Guarde os JSON antigos. Não exclua usuários anônimos ou dados anteriores sem preservar os registros.

Envios são imutáveis no cliente e ficam em subcoleções; a professora administra pelo console. Usuários Google de qualquer domínio podem autenticar. Não há restrição institucional nesta versão. Se necessário definir uma lista/domínio, aplique nas regras, não somente na interface.

Eventos ficam em fila local, com envio tentado enquanto o site está aberto. Não bloqueia outras abas ou dispositivos e não comprova fraude. No fim sincronize pendências e guarde a cópia JSON.

## Segurança
firebase.js contém apenas configuração pública. Nunca inclua conta de serviço/chave privada no GitHub. Nenhum JSON de aluno deve ser publicado no repositório. Regras do ZIP só têm efeito após publicação no console. Não deixe outras regras abrangentes liberando acesso: regras permissivas se somam às restritas.
