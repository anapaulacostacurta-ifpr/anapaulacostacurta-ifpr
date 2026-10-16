# Ativação do Firebase networking-taks

O site está configurado para Firestore, sem Google Forms. Nenhuma chave privada é necessária.

1. Console Firebase > Authentication > Método de login > Anônimo > Ativar e salvar.
2. Console > Firestore Database > Criar banco de dados. Use banco padrão (default), edição Standard, modo produção. Escolha a localização conforme a instituição. Não usar modo teste.
3. Firestore > Regras: substitua pelas regras do arquivo firestore.rules e publique. Regras não são publicadas pelo simples upload do site.
4. Abra o site, preencha nome e turma com identificação fictícia e conclua diagnóstico. A etapa só avança depois do retorno do Firestore.
5. Firestore > Dados > participantes > UID > envios: confira nome, turma, kind e payload. Os pais participantes/UID podem aparecer como documentos inexistentes, pois os envios estão nas subcoleções. O campo payload contém o JSON integral de cada envio; kind identifica diagnóstico, vídeo e eventos. recebimento é registrado em receivedAt.
6. Complete o vídeo/questionário e confira o segundo registro. Eventos de foco ficam em documentos próprios e são sincronizados em fila. No fim use Sincronizar registros pendentes.
7. Se já terminou no modo demonstração neste navegador, use Salvar respostas anteriores no Firebase na tela final. As etapas anteriores não foram enviadas automaticamente retroativamente. Guarde JSON como backup.

## Acesso e limites
Autenticação anônima identifica a instalação do navegador, não comprova identidade do aluno. Nome e turma são declarados. Regras impedem listar respostas e alterar/excluir envios pelo cliente. Professora consulta pelo console com sua conta autorizada no projeto; nenhum painel público de respostas está incluído.
Não reutilize o navegador entre alunos sem Nova participação. Arquivos e rascunhos locais continuam acessíveis no mesmo perfil. Limpar dados do navegador ou trocar de computador perde o vínculo local com UID anterior; mantenha a cópia JSON. Registros de eventos podem ficar pendentes ao fechar a página/offline. A tela não bloqueia outros dispositivos ou abas, e os eventos não provam fraude.

Estas regras não limitam abusos de criação de contas anônimas. Para uso contínuo, avaliar App Check, autenticação institucional e quotas. Não habilitar limpeza automática de contas anônimas sem planejar os vínculos dos registros. Não foram ativados serviços, regras ou faturamento no console por esta entrega. Não houve envio real de dados de aluno em teste.
