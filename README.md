# 🌟 Quiz Jaspion - Herói do Espaço 🌟

Um aplicativo web interativo para testar seus conhecimentos sobre o super-herói Jaspion do tokusatsu clássico!

## 📋 Características

✅ **Sistema de Autenticação**
- Criar conta de usuário
- Login seguro com senha
- Sessão persistente (mantém você logado)

✅ **Quiz Interativo**
- 6 perguntas sobre Jaspion
- Baseado em imagens (1.png até 6.png)
- Respostas múltiplas escolha
- Navegação entre perguntas (anterior/próxima)
- Barra de progresso em tempo real

✅ **Histórico de Quizzes**
- Salva automaticamente cada quiz completado
- Mostra data, hora, pontuação e porcentagem
- Visualize feedback detalhado com respostas corretas
- Limpar histórico quando desejar

✅ **Estatísticas do Usuário**
- Total de quizzes realizados
- Pontuação média
- Melhor pontuação
- Atualização automática após cada quiz

✅ **Design Responsivo**
- Funciona em desktop, tablet e celular
- Interface moderna com cores temáticas
- Animações suaves

## 🚀 Como Usar

### 1. Abrir a Aplicação
- Abra o arquivo `index.html` no seu navegador
- A página será carregada automaticamente

### 2. Criar Conta
- Clique em "Criar conta" na tela de login
- Escolha um usuário e uma senha (mínimo 4 caracteres)
- Confirme a senha
- Clique em "Criar Conta"

### 3. Fazer Login
- Digite seu usuário e senha
- Clique em "Entrar"
- Você será redirecionado para a página principal

### 4. Realizar um Quiz
- Na aba "Home", clique em "Começar Quiz"
- Você será levado à aba "Quiz"
- Selecione a resposta para cada pergunta
- Navegue entre as perguntas com os botões "Anterior" e "Próxima"
- Na última pergunta, clique "Finalizar"
- Veja seus resultados e feedback detalhado

### 5. Verificar Histórico
- Clique na aba "Histórico"
- Veja todos os seus quizzes realizados
- Cada card mostra data, hora, pontuação e porcentagem
- Clique em "Limpar Histórico" para remover todos os registros

## 📁 Estrutura de Arquivos

```
projeto jaspion/
├── index.html          # Arquivo principal do HTML
├── style.css          # Estilos CSS
├── script.js          # Lógica JavaScript
├── quiz-schema.json   # Schema estruturado dos dados
├── 1.png até 6.png    # Imagens do quiz
└── README.md          # Este arquivo
```

## 🗂️ Armazenamento de Dados

Todos os dados são armazenados localmente no navegador usando **localStorage**:
- **users**: Informações de usuários e histórico de quizzes
- **currentUser**: Usuário logado atualmente

Os dados persistem mesmo depois de fechar o navegador!

## ❓ Perguntas do Quiz

1. **Qual é o verdadeiro nome do herói Jaspion?**
   - Resposta: Ryo Shimizu

2. **De qual planeta/dimensão Jaspion veio para proteger a Terra?**
   - Resposta: Dimensão Jaspion

3. **Qual é a principal transformação/modo de poder de Jaspion?**
   - Resposta: Modo Super Jaspion

4. **Qual é o nome da organização malévola que Jaspion combate?**
   - Resposta: Exército Zimba

5. **Qual é o nome do dispositivo/arma especial de Jaspion?**
   - Resposta: Jaspion Sword

6. **Em que ano o tokusatsu 'Jaspion' foi ao ar pela primeira vez?**
   - Resposta: 1984

## 🎨 Personalizações Possíveis

### Adicionar Mais Perguntas
Edite o arquivo `script.js` e adicione novos objetos no array `quizData.questions`:

```javascript
{
    id: 7,
    image: "7.png",
    question: "Sua pergunta aqui?",
    answers: [
        { text: "Resposta correta", correct: true },
        { text: "Resposta incorreta", correct: false },
        { text: "Resposta incorreta", correct: false },
        { text: "Resposta incorreta", correct: false }
    ]
}
```

### Mudar Cores
Edite as variáveis CSS no arquivo `style.css`:

```css
:root {
    --primary-color: #ff6b35;      /* Cor principal */
    --secondary-color: #004e89;    /* Cor secundária */
    --accent-color: #f7b801;       /* Cor de destaque */
}
```

### Adicionar Validações
Edite o arquivo `script.js` para adicionar mais regras de validação no cadastro ou login.

## 🔒 Segurança

⚠️ **Nota Importante**: Este é um projeto educacional. As senhas são armazenadas em texto plano no localStorage. Para uma aplicação real, implemente:
- Hash de senhas
- Autenticação por servidor
- HTTPS
- Tokens JWT
- Proteção contra XSS e CSRF

## 📱 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Chrome
- Mobile Safari

## 🐛 Troubleshooting

**As imagens não estão carregando:**
- Verifique se os arquivos 1.png até 6.png estão na mesma pasta que index.html

**Os dados não estão sendo salvos:**
- Verifique se localStorage está habilitado no navegador
- Tente limpar o cache e reload

**Alguns elementos aparecem com estilo estranho:**
- Tente limpar o cache do navegador (Ctrl+Shift+Delete)
- Recarregue a página (Ctrl+F5)

## 📄 Licença

Este projeto é de uso livre para fins educacionais.

## 👨‍💻 Créditos

- Desenvolvido como projeto educacional
- Baseado no tokusatsu "Jaspion" (1984-1985)
- Imagens fornecidas pelo usuário

---

**Divirta-se testando seus conhecimentos sobre Jaspion!** ⚡🌟
