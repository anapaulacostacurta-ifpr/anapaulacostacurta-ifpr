# Patrulha com espera no Unity

## Correção do login e atualização no GitHub

O botão de demonstração foi removido junto da referência JavaScript que causava Cannot set properties of null (setting onclick).

O index.html agora incorpora o código e os estilos. Para atualizar o site publicado, substitua apenas o index.html da raiz do repositório pelo deste pacote. Aguarde o GitHub Pages publicar e use Ctrl+Shift+R. Não é necessário apagar os arquivos antigos app.js e style.css.

## Primeira publicação

Extraia o ZIP e envie os arquivos à raiz do repositório, com index.html na raiz. Em Settings > Pages, escolha Deploy from a branch > main > / (root). Não exige npm ou compilação.

## Firebase

A configuração pública aponta para networking-taks. Habilite login Google e autorize SEU-USUARIO.github.io (sem protocolo nem caminho) no Firebase Authentication. Instale as regras firestore.rules preservando as regras das outras atividades e removendo permissões globais que anulem as restrições. Cadastre o UID docente, configure o local e libere respostas/etapas na Área da professora. Veja CONFIGURACAO.md.

Se as regras anteriores já são as desta atividade com o painel de eventos, esta correção de login não exige novas regras.

## Funções

Seis etapas com respostas preservadas, código inicial nas etapas 1/3/5, fontes Unity, simulação guiada e comparação com a hipótese inicial. Controle docente geral e por etapa, geolocalização, painel de respostas, observações individuais/gerais e linha do tempo de eventos.

As observações são privadas da equipe docente. Cópia e colagem são bloqueadas pelos comandos usuais, mas fotos, OCR, transcrição e outras formas de contornar o bloqueio continuam possíveis. Eventos não comprovam uso de IA nem identificam o aplicativo acessado. Geolocalização pode ser imprecisa ou falsificada.

## Edição do código

app.js e style.css são fontes para edição. A estrutura HTML fica em fontes/index.template.html. Após editar, execute python3 gerar_index.py para regenerar index.html antes de publicar. Alterar somente app.js ou style.css não atualiza a página nesta versão.

## Validação

Inicialização completa verificada com DOM e Firebase simulados e sem o botão de demonstração. Login Google, regras, consultas e gravações reais devem ser verificados no seu domínio e projeto Firebase.
