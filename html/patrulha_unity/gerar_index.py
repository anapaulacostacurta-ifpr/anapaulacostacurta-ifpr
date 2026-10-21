from pathlib import Path
base = Path(__file__).resolve().parent
template = (base / "fontes/index.template.html").read_text(encoding="utf-8")
css = (base / "style.css").read_text(encoding="utf-8")
js = (base / "app.js").read_text(encoding="utf-8")
bootstrap = """<script>
const bootStatus=document.getElementById('authStatus');
bootStatus.textContent='Carregando conexão com o Firebase…';
function showStartupError(detail){
 const message='Não foi possível iniciar o site: '+detail+'. Recarregue com Ctrl+Shift+R. Se o erro continuar, informe esta mensagem à professora.';
 document.getElementById('authStatus').textContent=message;
 document.getElementById('status').textContent=message;
}
window.addEventListener('error',e=>showStartupError(e.message||'Falha de carregamento. Verifique se a rede permite www.gstatic.com'));
window.addEventListener('unhandledrejection',e=>showStartupError(e.reason?.message||'Falha inesperada'));
</script>"""
# Código e estilos embutidos evitam versões incompatíveis no GitHub Pages.
output=template.replace('<!-- APP_STYLES -->','<style>'+css+'</style>')
output=output.replace('<!-- APP_SCRIPT -->',bootstrap+'<script type="module">'+js+'</script>')
(base / 'index.html').write_text(output,encoding='utf-8')
print('index.html gerado com código e estilos incorporados.')
