from pathlib import Path
import base64,json
root=Path(__file__).resolve().parent
shell=(root/'src/shell.html').read_text()
web=shell.replace('<style>/*STYLE*/</style>','<link rel="stylesheet" href="src/style.css">').replace('<script>/*BUNDLE*/</script>',''.join('<script src="src/'+n+'.js" defer></script>' for n in ['art','core','field','render','app']))
(root/'index.html').write_text(web)
(root/'src/art.js').write_text("const ART=['assets/founding-family.png','assets/settlers.png'];\n")
art=['data:image/png;base64,'+base64.b64encode((root/'assets'/n).read_bytes()).decode() for n in ['founding-family.png','settlers.png']]
bundle='const ART='+json.dumps(art)+';\n'+'\n'.join((root/'src'/(n+'.js')).read_text() for n in ['core','field','render','app'])
(root/'dist').mkdir(exist_ok=True)
(root/'dist/first-kin.html').write_text(shell.replace('/*STYLE*/',(root/'src/style.css').read_text()).replace('/*BUNDLE*/',bundle))
print('Web build: index.html; optional offline copy: dist/first-kin.html')
