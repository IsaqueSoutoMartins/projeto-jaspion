# 📚 Documentação Técnica - Quiz Jaspion

## 🏗️ Arquitetura do Projeto

### Estrutura Cliente-Side (No Navegador)

O projeto é totalmente desenvolvido em **HTML, CSS e JavaScript** puro (Vanilla JS), sem dependências externas.

```
┌─────────────────────────────────────────┐
│         Camada de Apresentação          │
│  (HTML + CSS)                           │
│  - Telas: Login, Quiz, Histórico        │
│  - Componentes UI: Abas, Botões, Cards  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Camada de Lógica (JavaScript)      │
│  - Autenticação de Usuários             │
│  - Gerenciador de Quiz                  │
│  - Gerenciador de Histórico             │
│  - Gerenciador de Estado                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Camada de Armazenamento             │
│  - localStorage (Navegador)             │
│  - Cache de Usuários e Histórico        │
└─────────────────────────────────────────┘
```

## 📄 Descrição dos Arquivos

### 1. **index.html** (Estrutura HTML)
- Define a estrutura semântica da aplicação
- Organiza em 3 telas principais:
  - Screen 1: Login e Signup
  - Screen 2: Quiz (Home, Quiz, Histórico)
- Inclui Schema.org para SEO
- Estrutura responsiva baseada em flexbox e grid

**Principais elementos:**
- `#loginScreen` - Tela de autenticação
- `#mainScreen` - Tela principal com abas
- `.screen` - Controle de visibilidade
- `.tab-content` - Conteúdo das abas

### 2. **style.css** (Estilos)
- Design moderno com gradientes
- Sistema de cores em CSS variables
- Responsividade com media queries
- Animações e transições suaves

**Paleta de cores:**
```css
--primary-color: #ff6b35      (Laranja)
--secondary-color: #004e89    (Azul Marinho)
--accent-color: #f7b801       (Amarelo)
--success-color: #2ecc71      (Verde)
--danger-color: #e74c3c       (Vermelho)
```

**Componentes principais:**
- `.login-box` - Formulário de autenticação
- `.quiz-container` - Container do quiz
- `.tab-content` - Abas do menu principal
- `.stats-grid` - Grid de estatísticas

### 3. **script.js** (Lógica & Estado)
A aplicação é dividida em módulos funcionais:

#### A. **Dados do Quiz** (`quizData`)
```javascript
{
    title: string,
    questions: [
        {
            id: number,
            image: string,
            question: string,
            answers: [
                { text: string, correct: boolean }
            ]
        }
    ]
}
```

#### B. **Variáveis Globais**
```javascript
users                  // Dicionário de usuários
currentUser           // Usuário logado
currentQuizAnswers    // Respostas do quiz atual
quizInProgress        // Flag de estado
currentQuestionIndex  // Índice da pergunta atual
```

#### C. **Módulos Funcionais**

**Autenticação:**
- `handleLogin()` - Valida e faz login
- `handleSignup()` - Cria nova conta
- `handleLogout()` - Realiza logout
- `checkIfUserLoggedIn()` - Verifica sessão

**Quiz:**
- `startQuiz()` - Inicia novo quiz
- `showQuestion()` - Renderiza pergunta
- `selectAnswer()` - Seleciona resposta
- `nextQuestion()` / `prevQuestion()` - Navegação
- `finishQuiz()` - Finaliza e calcula score
- `calculateScore()` - Calcula pontuação

**Histórico:**
- `saveQuizResult()` - Salva resultado
- `updateHistoryDisplay()` - Renderiza histórico
- `clearHistory()` - Limpa histórico

**Estatísticas:**
- `updateStats()` - Atualiza cards de stats
- `resetStats()` - Reseta para zero

**UI & Abas:**
- `showScreen()` - Muda entre telas
- `handleTabChange()` - Troca abas
- `setupEventListeners()` - Registra listeners

### 4. **quiz-schema.json** (Schema Estruturado)
Schema.org Quiz com todas as perguntas, respostas e metadados:
- Estruturado segundo `@context: "https://schema.org"`
- Type: `Quiz`
- Respostas marcadas como `acceptedAnswer`
- Alternativas como `suggestedAnswer`

**Usado para:**
- SEO e indexação
- Documentação das perguntas
- Referência de respostas corretas
- Integração com ferramentas de busca

### 5. **README.md** (Documentação de Usuário)
- Guia de uso prático
- Instruções de instalação
- Descrição das perguntas
- Troubleshooting

### 6. **COMECE_AQUI.html** (Página de Boas-vindas)
- Página inicial amigável
- Links para iniciar o app
- Apresentação de recursos
- Credenciais de demonstração

## 💾 Sistema de Armazenamento (localStorage)

### Estrutura de Dados

**localStorage['users']** - JSON com todos os usuários:
```javascript
{
    "username1": {
        username: "username1",
        password: "senha_texto_plano",
        history: [
            {
                date: "08/04/2026 10:30:45",
                score: 5,
                totalQuestions: 6,
                percentage: 83,
                answers: [0, 1, 2, 1, 0, 1]  // índices das respostas
            }
        ]
    },
    "username2": { ... }
}
```

**localStorage['currentUser']** - Usuário logado:
```javascript
{
    username: "username1",
    password: "senha_texto_plano"
}
```

### Operações LocalStorage

1. **Ler usuários:**
   ```javascript
   let users = JSON.parse(localStorage.getItem('users')) || {};
   ```

2. **Salvar usuários:**
   ```javascript
   localStorage.setItem('users', JSON.stringify(users));
   ```

3. **Verificar login:**
   ```javascript
   let savedUser = localStorage.getItem('currentUser');
   ```

## 🔄 Fluxo de Dados

### 1. Login/Signup
```
Usuário input → Validação → localStorage → currentUser → showScreen('mainScreen')
```

### 2. Realizar Quiz
```
startQuiz() → showQuestion() → selectAnswer() → nextQuestion() → finishQuiz() → saveQuizResult()
```

### 3. Visualizar Histórico
```
handleTabChange('history') → updateHistoryDisplay() → renderizar cards
```

### 4. Atualizar Estatísticas
```
updateStats() → calcular média/max → atualizar DOM
```

## 🎯 Fluxo de Estados da Aplicação

```
┌─────────────────┐
│  loginScreen    │
│  signupScreen   │
└────────┬────────┘
         │
      Login OK
         │
         ▼
┌─────────────────┐
│   mainScreen    │
│  - Home         │
│  - Quiz         │
│  - History      │
└────────┬────────┘
         │
   Quiz started
         │
         ▼
┌─────────────────┐
│  quizContainer  │
│  - pergunta 1   │
│  - pergunta 2   │
│  - ...          │
│  - pergunta 6   │
└────────┬────────┘
         │
   Quiz finished
         │
         ▼
┌─────────────────┐
│  quizResult     │
│  Score display  │
│  Feedback       │
└─────────────────┘
```

## 🔐 Segurança (Limitações Atuais)

⚠️ Este projeto é educacional. As seguintes limitações de segurança devem ser consideradas:

1. **Senhas em Texto Plano**
   - Soluções: Implementar hash com bcrypt no servidor

2. **Dados no localStorage**
   - Vulnerável a XSS
   - Soluções: Content Security Policy, sanitização de input

3. **Sem Backend**
   - Qualquer pessoa pode fingir ser outro usuário
   - Soluções: Servidor com autenticação JWT

4. **Sem HTTPS**
   - Dados trafegam sem criptografia
   - Soluções: Usar HTTPS em produção

## 📱 Responsividade

**Breakpoints:**
- 768px - Tablets (grid 1fr)
- 480px - Celulares (ajustes de padding/font)

**Estratégia:**
- Mobile-first (CSS base para mobile)
- Media queries para maior quebra
- Flexbox e Grid para layout fluido

## 🚀 Como Expandir

### Adicionar Nova Pergunta
1. Editar `quizData.questions` em script.js
2. Atualizar `quiz-schema.json`
3. Adicionar imagem correspondente

### Adicionar Novo Recurso
1. Criar função em script.js
2. Registrar event listener em setupEventListeners()
3. Adicionar elementos HTML necessários
4. Estilizar em style.css

### Integrar com Backend
1. Criar endpoints para autenticação
2. Substituir localStorage por chamadas fetch()
3. Implementar tokens JWT
4. Adicionar hash de senhas

## 📊 Performance

**Otimizações atuais:**
- Vanilla JS (sem dependências)
- CSS Grid/Flexbox (sem pré-processador)
- Imagens PNG (pré-comprimidas)
- localStorage (sem servidor)

**Possíveis melhorias:**
- Lazy loading de imagens
- Service Workers (PWA)
- Compressão Gzip
- Minificação de CSS/JS

## 🧪 Testando

**Casos de teste recomendados:**
1. ✅ Criar conta com validação
2. ✅ Login com credenciais incorretas
3. ✅ Completar quiz e verificar score
4. ✅ Verificar histórico atualizado
5. ✅ Limpar histórico
6. ✅ Logout e login outro usuário
7. ✅ Responsividade em diferentes tamanhos

---

**Desenvolvido como projeto educacional em 2026**
