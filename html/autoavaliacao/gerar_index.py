from pathlib import Path
base=Path(__file__).resolve().parent
html=(base/'template.html').read_text()
html=html.replace('<!-- CSS -->','<style>'+(base/'style.css').read_text()+'</style>')
bootstrap="""<script>window.addEventListener('error',e=>{document.getElementById('status').textContent='Falha ao iniciar: '+e.message+'. Verifique a conexão e recarregue.';});window.addEventListener('unhandledrejection',e=>{document.getElementById('status').textContent='Falha de conexão: '+(e.reason?.message||'verifique se a rede permite www.gstatic.com')+'. Recarregue para tentar novamente.';});</script>"""
html=html.replace('<!-- JS -->',bootstrap+'<script type="module">'+(base/'app.js').read_text()+'</script>')
(base/'index.html').write_text(html)
