// Variáveis globais que serão preenchidas pela Planilha Google
let casas = {}; 
let perguntas = []; 

// **IMPORTANTE:** SUBSTITUA PELA URL DE DEPLOYMENT DO SEU GOOGLE APPS SCRIPT
const APPS_SCRIPT_BUSCA_URL = "https://script.google.com/macros/s/AKfycbwAUsfD1CS_BviMUHzfnAj97aVKDGVydkytJOqmt9eTJ_iQRv1a8x5JwGP0VjAa5ucA7g/exec"; 

// --- FUNÇÃO PARA MONTAR O QUIZ NA TELA ---
function montarQuiz() {
    const quizContainer = document.getElementById("quiz");
    
    if (!perguntas || perguntas.length === 0) {
        quizContainer.innerHTML = "<p>Não foi possível carregar as perguntas. Verifique a planilha.</p>";
        return;
    }
    
    quizContainer.innerHTML = ""; // Limpa a mensagem de "Carregando"
    
    perguntas.forEach((p, i) => {
        let html = `<div class='question'><p>${i+1}.${p.texto}</p><div class='options'>`;
    
        let optionIndex = 0;
        for (const casa in p.opcoes) {
            const inputId = `q${i}_${optionIndex}`; // Cria um ID único
            // Estrutura corrigida: Input e Label são irmãos
            html += `<input type='radio' name='q${i}' id='${inputId}' value='${casa}'>`;
            html += `<label for='${inputId}'> ${p.opcoes[casa]}</label>`; 
            optionIndex++;
        }
        html += "</div></div>";
        quizContainer.innerHTML += html;
    });
}

// --- FUNÇÃO PARA CARREGAR OS DADOS DA PLANILHA (perguntas e casas) ---
async function carregarDados() {
    try {
        const response = await fetch(APPS_SCRIPT_BUSCA_URL, {
            method: 'GET',
            mode: 'cors'
        });

        const data = await response.json();
        
        if (data.status === "sucesso" && data.casas && data.perguntas) {
            casas = data.casas; 
            perguntas = data.perguntas; 
            
            montarQuiz(); // Monta a interface do quiz
            
        } else {
            console.error("Erro ao carregar dados da planilha:", data.mensagem);
            document.getElementById("quiz").innerHTML = "<p style='color:#ff4d4d; text-align:center;'>Erro ao carregar o quiz. Detalhes no console.</p>";
        }

    } catch (error) {
        console.error('Erro de rede ao buscar dados:', error);
        document.getElementById("quiz").innerHTML = "<p style='color:#ff4d4d; text-align:center;'>Erro de conexão. O Apps Script está ativo?</p>";
    }
}


// --- LÓGICA DE FINALIZAÇÃO (CALCULA A CASA) ---
function finalizarQuiz() {
    // Verifica se os dados foram carregados
    if (Object.keys(casas).length === 0 || perguntas.length === 0) {
        alert("Aguarde, o Chapéu Seletor ainda está carregando as perguntas. Tente novamente em instantes.");
        return;
    }
    
    const respostas = document.querySelectorAll('input[type="radio"]:checked');
    const erroMensagem = document.getElementById('erroMensagem');

    if (respostas.length < perguntas.length) {
        erroMensagem.style.display = "block";
        return;
    }
    erroMensagem.style.display = "none";
    
    // Lógica de contagem
    let contagem = {};
    respostas.forEach(r => {
        const casa = r.value;
        contagem[casa] = (contagem[casa] || 0) + 1;
    });

    const casaFinal = Object.keys(contagem).reduce((a,b) => contagem[a] > contagem[b] ? a : b);
    
    // Exibe o resultado com dados da planilha
    document.getElementById("houseName").innerText = `🏠 Casa ${casaFinal}`;
    document.getElementById("houseName").style.color = casas[casaFinal].cor; 
    document.getElementById("houseLema").innerText = casas[casaFinal].lema; 
    
    document.getElementById("result").style.display = "block";
    document.getElementById("quizForm").style.display = "none";
    
    localStorage.setItem("casaTech", casaFinal);
}

// --- FUNÇÃO DE ENVIO PARA O GOOGLE FORMS ---
function enviarForm() {
    const casaEscolhida = localStorage.getItem("casaTech");
    if (!casaEscolhida) {
        alert("Erro: A Casa Tech não foi determinada. Finalize o Quiz primeiro.");
        return;
    }

    // Solicita o nome e o email
    const nome = prompt("Digite seu nome completo para finalizar a pré-inscrição:");
    if (!nome) return;

    const email = prompt("Digite seu endereço de email:");
    if (!email) return;

    const ENTRY_ID_NOME = "entry.1657610344";   // <-- ID da pergunta NOME
    const ENTRY_ID_EMAIL = "entry.1241355614"; // <-- ID da pergunta EMAIL
    const ENTRY_ID_CASA = "entry.1821870761";  // <-- ID da pergunta CASA

    // Base da URL de envio (use o link de visualização do seu Forms)
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfT_nWuVhA1Hs8Xd_JBI-_R4S2wyYOpCNRYyVN8R_YKSdrQmg/viewform"
            // 1. Envia o NOME
        + `?${ENTRY_ID_NOME}=` + encodeURIComponent(nome) 
        // 2. Envia o EMAIL
        + `&${ENTRY_ID_EMAIL}=` + encodeURIComponent(email)
        // 3. Envia a CASA ESCOLHIDA
        + `&${ENTRY_ID_CASA}=` + encodeURIComponent(casaEscolhida); 

    // Abre a URL, enviando os dados para o Forms
    window.open(googleFormURL, "_blank");
}

// --- EXECUÇÃO INICIAL ---
// Inicia o processo de carregamento de todos os dados da Planilha Google
carregarDados();