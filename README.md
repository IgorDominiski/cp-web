## Checkpoint 1 – WebDev com React: lista de tarefas 
Integrantes do grupo: Igor Dominiski RM562055, Murillo Akira RM561886, Murilo Canestri RM564053.

### Objetivo
Aplicação React simples para demonstrar fundamentos: componentes, props, state, hooks e estilização com TailwindCSS.

### Nome do projeto
lista de tarefas

### Tecnologias usadas
- React + TypeScript + Vite
- TailwindCSS v4

- ### Como executar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
Abra o endereço indicado no terminal (geralmente `http://localhost:5173`).

### Sobre a aplicação
- Mínimo de 3 componentes: `Header`, `TodoForm`, `TodoList`/`TodoItem`.
- Props: títulos do header, callbacks (`onAdd`, `onToggle`, `onRemove`).
- State: lista de tarefas, filtro ativo, campo de input.
- Hooks: `useState` e `useEffect` para persistência no `localStorage`.
- Estilo: classes utilitárias do Tailwind para layout e cores
