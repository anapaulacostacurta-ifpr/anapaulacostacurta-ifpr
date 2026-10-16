# Laboratório de Sub-redes IPv4

Site em HTML, CSS e JavaScript com diagnóstico, charada, vídeo e questionário. Respostas enviadas ao Cloud Firestore com autenticação anônima. Vídeo sem áudio incluído.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Extraia este ZIP no computador e envie o conteúdo da pasta para a raiz do repositório. index.html deve ficar na raiz, ao lado de app.js, firebase.js, style.css e video.mp4.
3. Abra Settings > Pages > Build and deployment. Escolha Deploy from a branch, branch main e pasta / (root). Salve.
4. Aguarde a publicação e abra a URL informada pelo GitHub Pages. Os caminhos dos arquivos são relativos e funcionam em repositórios publicados sob /nome-do-repositorio/.
5. Faça teste com identificação fictícia antes da aula. A publicação do HTML não ativa os serviços Firebase nem publica as regras.

## Firebase

A configuração pública do aplicativo está em firebase.js. Ative Authentication Anônimo, crie o Firestore padrão e publique firestore.rules pelo console. Consulte FIREBASE.md. Se houver restrições de domínio ou referenciador na chave API, ajuste-as para a URL do GitHub Pages. Não adicione chaves privadas ou credenciais de conta de serviço ao repositório.

As respostas ficam no Firebase; não envie arquivos JSON de estudantes ao repositório. As regras restringem envios ao UID autenticado; a professora consulta pelo console. A identidade é autodeclarada, não é login institucional.

## Mudança de endereço

O armazenamento local pertence ao domínio de cada site. Progresso no endereço anterior não migra automaticamente para GitHub Pages. Conclua/exporte participações anteriores antes de mudar o link. O código atual não importa JSON anteriores.

## Acompanhamento

O site não bloqueia abas, aplicativos ou dispositivos. Registra eventos limitados de visibilidade e foco; não comprovam fraude. A tela cheia depende do navegador. Envios de respostas aguardam confirmação; eventos são sincronizados em fila e podem ficar pendentes. Preserve a cópia JSON e confira no console Firebase.

## Arquivos

- index.html: estrutura da página.
- style.css: aparência responsiva.
- app.js: etapas, formulários, salvamento local e acompanhamento.
- firebase.js: configuração pública, autenticação e gravação no Firestore.
- video.mp4: explicação da divisão /24 em duas /25.
- firestore.rules: regras para publicação no console Firebase.
- FIREBASE.md: ativação e limitações.

Não há compilação nem instalação de pacotes. Use hospedagem HTTPS. Somente a sintaxe dos scripts foi verificada; faça teste completo no navegador e no Firebase após publicar.
