# 📸 Portfólio de Fotografia – React + TypeScript + Vite

Este projeto é um site de portfólio para fotógrafo, desenvolvido com **React**, **TypeScript** e **Vite**.  
Conta com animações modernas, grid interativo de imagens, design responsivo e integração com WhatsApp para orçamentos.

---

## 🚀 Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) para build rápido e HMR
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Framer Motion](https://www.framer.com/motion/) para animações
- [Lucide Icons](https://lucide.dev/) para ícones leves
- ESLint + configurações recomendadas para código limpo

---

## 📂 Estrutura do Projeto

📦 meu-projeto
├─ public/
│ └─ gallery/ # Imagens do portfólio (Surf.png, Casamento.png, 01.webp, etc.)
├─ src/
│ ├─ components/ # Componentes React (Header, ShuffleHero, ShuffleGrid, etc.)
│ ├─ data/ # Arquivos de dados (ex: photos.ts com lista de imagens)
│ ├─ lib/ # Funções utilitárias
│ ├─ App.tsx # Componente raiz
│ └─ main.tsx # Entrada da aplicação
├─ tsconfig.json
├─ vite.config.ts
└─ package.json

yaml
Copiar código

---

## ⚙️ Instalação e Uso

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
Desenvolvimento
bash
Copiar código
npm run dev
O projeto rodará em http://localhost:5173

Build de Produção
bash
Copiar código
npm run build
npm run preview
✨ Recursos
Hero interativo com grid embaralhável de fotos.

Botões de ação (ver portfólio, reservar sessão).

Ícones representando categorias (Retratos, Casamentos, Editorial, Comercial, Eventos, Paisagens).

Design moderno e responsivo.

Estrutura pronta para SEO.

🖼️ Como adicionar fotos
Coloque suas imagens em public/gallery/
(ex.: public/gallery/Surf.png, public/gallery/Casamento.png, public/gallery/01.webp)

Atualize a lista no arquivo src/data/photos.ts ou squareData no componente:

ts
Copiar código
const squareData = [
  { id: 1, src: "/gallery/Surf.png" },
  { id: 2, src: "/gallery/Casamento.png" },
  { id: 3, src: "/gallery/03.webp" },
  ...
];
📌 Melhorias Futuras
Criar página exclusiva de Portfólio com galerias categorizadas.

Implementar formulário de contato integrado.

Otimizar imagens em WebP para maior desempenho.

Adicionar animações de scroll (Scroll Reveal).

