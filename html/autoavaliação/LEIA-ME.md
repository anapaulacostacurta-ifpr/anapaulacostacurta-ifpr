# Autoavaliação independente

Página geral de autoavaliação, sem referência à atividade de Unity. Usa o projeto Firebase networking-taks, mas mantém respostas e permissões docentes em coleções próprias. Não depende das etapas, localização ou liberação da outra atividade.

## Publicação no GitHub Pages

1. Crie uma pasta nova, por exemplo `html/autoavaliacao`, no seu repositório. Não substitua a pasta da atividade anterior.
2. Coloque o `index.html` deste pacote nessa pasta e publique no GitHub Pages. Ele já contém JavaScript e CSS incorporados, evitando incompatibilidade entre versões. Os arquivos app.js, style.css e template.html são fontes para edição.
3. No Firebase Authentication, mantenha o provedor Google habilitado. Autorize o domínio do GitHub Pages: `anapaulacostacurta-ifpr.github.io` (sem caminho e sem https).
4. Incorpore às regras existentes do Firestore a função `docenteAutoavaliacao` e os dois blocos match do arquivo firestore.rules, DENTRO do match `/databases/{database}/documents`. Não cole um segundo cabeçalho rules_version e não apague regras de outras atividades. Permissões globais amplas podem anular estas restrições.
5. Em Authentication > Users, copie o UID da professora. No Firestore, crie `autoavaliacaoDocentes/{UID}` com `ativo: true` (booleano). Esse cadastro é próprio desta página, separado da atividade anterior.
6. Entre como professora e clique em Carregar respostas. É possível filtrar por nome, e-mail ou turma, abrir as respostas e exportá-las em JSON.

Se publicar na pasta sugerida, o endereço será:
https://anapaulacostacurta-ifpr.github.io/anapaulacostacurta-ifpr/html/autoavaliacao/
Esse endereço só ficará disponível depois que você publicar os arquivos.

## Funcionamento

- Seis perguntas abertas, campo de turma/disciplina e identificação pelo Google.
- Um envio por conta nesta versão. Após enviar, o aluno consulta o registro, sem edição. Para outra rodada, use uma nova coleção e ajuste as regras correspondentes.
- Rascunho local por conta até o envio; não é sincronizado entre dispositivos. Trocar de aba não apaga o texto.
- Não há bloqueio de cópia/colagem, geolocalização ou registro de troca de aba nesta página.
- Respostas em `autoavaliacaoGeralV1/{UID}`. Alunos consultam apenas o próprio envio; docentes cadastrados consultam todos.
- Os textos dos estudantes são exibidos como texto, sem interpretar HTML.

## Edição

Após alterar app.js, style.css ou template.html, execute `python3 gerar_index.py` e publique o novo index.html.

## Verificação antes de enviar à turma

Teste com contas distintas de professora e aluno: entrar; preencher; enviar; recarregar; consultar; verificar que outro aluno não consegue ler registros alheios; conferir leitura e exportação docente. No simulador do Firestore, confira que aluno não lista respostas nem se cadastra como docente e que atualização e exclusão são negadas. O pacote teve sintaxe e integridade verificadas localmente; autenticação e gravação precisam ser testadas no Firebase real após a configuração.
