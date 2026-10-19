# Área da professora

Acesse professor.html no mesmo domínio do site. Faça login Google.

## Autorização segura
1. Publique o firestore.rules desta versão no console Firestore (substitua as regras anteriores). A atualização do site não publica as regras.
2. Entre na página professor.html com SUA conta. A tela de conta não autorizada exibirá seu UID. Alternativamente copie-o em Authentication > Users.
3. Firestore > Dados > Iniciar coleção: professores. ID do documento: seu UID exato. Campo ativo: tipo booleano, valor true. Opcionalmente adicione email como referência administrativa. Não use o e-mail como ID do documento; o código consulta UID.
4. Clique Verificar autorização novamente. Apenas administradores do Firebase podem criar/alterar professores. O site não permite autopromoção. Autorize somente contas docentes.

## Consulta
A tela lista nomes, e-mails, turmas e participações de quem tem respostas recebidas. Carrega lotes de 200 documentos (incluindo eventos), com botão Carregar mais; até carregar todos, a lista é parcial. Atualizar lista relê os envios. Clique no nome para ver detalhes, escolha a participação pelo identificador, leia respostas com títulos e datas e expanda eventos. Carregar mais nos detalhes busca o restante daquele aluno. Não há atribuição automática de nota.

As observações são por estudante e participação, em observacoes/UID/sessoes/ID. Digite e clique Salvar observações; o sistema confirma. O botão Voltar à lista avisa sobre alterações não salvas. Docentes autorizados compartilham acesso às observações. A gravação mais recente substitui a anterior; não há histórico/conciliação de edição simultânea.

Dados anônimos antigos sem e-mail podem aparecer com esse aviso. As identidades Google não são mescladas com UID anônimo anterior.

Não há leitura das respostas ou observações por outros estudantes nas regras fornecidas. A interface não é mecanismo de autorização: a proteção é nas regras. Não deixe regras globais allow read/write true, pois permissões são cumulativas.

Sem teste real de leitura/escrita no projeto nesta entrega. Após configurar, faça teste com duas contas: aluno deve ser impedido de acessar área docente; professora deve listar o envio e salvar/reabrir observações. A consulta collection-group sem filtros/ordenação por campos usa apenas ordenação por identificador. Se o Firebase reportar índice, siga o link exato do erro no console; não abra regras para resolver erro de índice.
