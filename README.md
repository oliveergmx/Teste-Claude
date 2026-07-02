# D'Bulltique — Site Institucional

Site estático da **D'Bulltique** — Parrilla · Vinhos · Cervejaria (Castelo, Belo Horizonte).
Tese criativa: **"Três casas, um fogo."**

## Estrutura

```
index.html          Página única (CSS crítico inline + SEO + JSON-LD)
robots.txt          Indexação + link do sitemap
sitemap.xml         Sitemap de página única
assets/
  css/main.css      Estilos abaixo da dobra (o crítico está inline no <head>)
  js/main.js        Vanilla JS: menu, brasas, scroll-reveal, contadores
  img/              Fotos em WebP + fallback JPEG, logos PNG, og-image 1200×630
```

Sem build, sem dependências: é só servir a pasta.

## Rodar localmente

```bash
python3 -m http.server 8080
# ou: npx serve .
```

Abra `http://localhost:8080`.

## Deploy

Qualquer host estático serve a raiz do repositório diretamente:

- **Netlify / Vercel**: aponte para o repositório, sem comando de build, diretório de publicação = raiz.
- **Hostinger / cPanel**: envie todos os arquivos para `public_html/`.

## Trocar a fonte display pela Cheddar Gothic Rough

A fonte oficial do manual é paga e não estava na pasta do projeto, então **Oswald**
(Google Fonts) atua como placeholder. Para ativar a oficial:

1. Coloque o arquivo em `assets/fonts/cheddar-gothic-rough.woff2`.
2. Em `assets/css/main.css`, descomente o bloco `@font-face` no topo do arquivo.
3. Em `index.html`, no CSS crítico do `<head>`, troque a linha da variável:
   ```css
   --disp:'Cheddar Gothic Rough','Oswald',sans-serif;
   ```

## Dados pendentes (buscar e substituir antes de publicar)

| Placeholder | Onde | Substituir por |
|---|---|---|
| `5531XXXXXXXXX` | Todos os links `wa.me` (index.html) e `telephone` no JSON-LD | Número real com DDI (formato `5531XXXXXXXXX`) |
| `[ (31) 9 XXXX-XXXX ]` | Seção "Onde estamos" | Número formatado para exibição |
| `[Ter–Sáb: 18h às 00h · Dom: 12h às 17h — confirmar]` | Seção "Onde estamos" | Horários reais (confirmar com a Débora) — ajustar também o `openingHoursSpecification` no JSON-LD |
| `[LINK_CARDAPIOWEB]` | Botão "Ver cardápio digital" | URL do cardápio no CardápioWeb |
| `https://www.dbulltique.com.br` | Canonical, Open Graph, JSON-LD, robots.txt, sitemap.xml | Domínio real quando definido |
| Coordenadas `-19.8829, -43.9836` | `geo` no JSON-LD | Coordenadas exatas do Google Maps (as atuais são aproximadas para o Castelo) |

Cada CTA de WhatsApp já carrega mensagem pré-formatada por contexto
(reserva geral, parrilla, carta de vinhos, Copa, comercial B2B).

## Identidade visual

Paleta oficial do manual (hex exatos): bordô `#6b1f2a`, terroso `#8c3a3a`,
fogo `#c65a2e`, ouro `#c89b3c`, oliva `#5e6f3b`, off-white `#f4efe9`,
derivados de profundidade `#48121b` / `#2e0a10`.
Tipografia: Cheddar Gothic Rough (display, placeholder Oswald) + Montserrat (corpo).

> Nota: os PDFs do manual e do logotipo vetorial não estavam na pasta na hora do build.
> Os logos usados (`logo-horizontal.png`, `logo-lockup.png`, `touro-simbolo.png`) foram
> extraídos da versão-base aprovada. Quando os vetores estiverem disponíveis, vale trocar
> por SVG (mesmos nomes de arquivo) — em especial um lockup empilhado para o hero.

## Fotos — o que mudou em relação à base e o que ainda falta

Na versão-base, várias imagens embutidas estavam trocadas (ex.: pacote de levedura no
card da Pilsen, tanques no painel do Wine Bar). Este build reatribui cada foto ao seu
conteúdo real:

- A foto da **fileira numerada dos 5 chopps** agora abre a seção D'BullBeer (`lineup-chopps`),
  e os 5 cards de estilo usam recortes dela + a foto dedicada do Chopp de Vinho.
- As fotos das **sacas de insumos** (El Jaguar, UMA Malta, Hallertau, SafLager) ilustram
  os cards de insumos rastreados — antes não tinham foto.
- Os **tanques de fermentação** assinam o painel "Cervejaria" do hero; a arte
  "Da nossa fábrica para sua mesa" ilustra a seção homônima; a arte de lançamento da
  **Session IPA** ilustra o destaque (com as notas de fruta) e o fundo da seção Copa.

Fotos que **não existem** no material recebido — enviar quando possível e trocar
mantendo o nome do arquivo (gerar também a versão `.webp`):

| Falta | Usado provisoriamente | Arquivo |
|---|---|---|
| Foto de vinho/taça/adega (Wine Bar) | Chopp de Vinho sobre o barril | `chopp-vinho.{jpg,webp}` (hero painel 02 e seção Wine Bar) |
| Foto do growler 1L | Recorte de taças de chopp | `growler-chopp.{jpg,webp}` |

## Compatibilidade e performance

- Fotos servidas via `<picture>` (WebP + fallback JPEG), `loading="lazy"` fora do hero,
  `width`/`height` explícitos (sem CLS), hero com `fetchpriority="high"`.
- Sem `background-attachment: fixed`; nav com `position: sticky`; `backdrop-filter`
  com fallback de cor sólida; `100svh` com fallback `100vh`; prefixos `-webkit-`;
  JS ES5-friendly com fallback para navegadores sem `IntersectionObserver`.
- `prefers-reduced-motion` respeitado em todas as animações (brasas, reveal, contadores).
- Brasas do hero: apenas desktop (>640px) e sem reduced-motion.
