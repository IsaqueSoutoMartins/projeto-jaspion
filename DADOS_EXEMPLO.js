// ===================================
// Script para popular localStorage com dados de exemplo
// Execute isto no console do navegador ANTES de abrir a aplicação
// ===================================

// Opção 1: Cole este código no console e pressione Enter
// (Abra o DevTools com F12, vá para "Console" e cole aqui)

const exampleUsers = {
    "demo": {
        username: "demo",
        password: "1234",
        history: [
            {
                date: "07/04/2026 14:30:45",
                score: 5,
                totalQuestions: 6,
                percentage: 83,
                answers: [0, 1, 2, 1, 0, 1]
            },
            {
                date: "06/04/2026 10:15:20",
                score: 4,
                totalQuestions: 6,
                percentage: 67,
                answers: [0, 1, 3, 1, 0, 1]
            },
            {
                date: "05/04/2026 16:45:00",
                score: 6,
                totalQuestions: 6,
                percentage: 100,
                answers: [0, 1, 2, 1, 2, 1]
            }
        ]
    },
    "usuario1": {
        username: "usuario1",
        password: "senha123",
        history: [
            {
                date: "08/04/2026 11:00:00",
                score: 3,
                totalQuestions: 6,
                percentage: 50,
                answers: [1, 0, 1, 2, 1, 0]
            }
        ]
    },
    "jaspion": {
        username: "jaspion",
        password: "1984",
        history: [
            {
                date: "08/04/2026 09:30:15",
                score: 6,
                totalQuestions: 6,
                percentage: 100,
                answers: [0, 1, 2, 1, 2, 1]
            },
            {
                date: "07/04/2026 13:20:45",
                score: 6,
                totalQuestions: 6,
                percentage: 100,
                answers: [0, 1, 2, 1, 2, 1]
            }
        ]
    }
};

// Salvar no localStorage
localStorage.setItem('users', JSON.stringify(exampleUsers));

// Mensagem de confirmação
console.log('✅ Dados de exemplo carregados com sucesso!');
console.log('Contas disponíveis:');
console.log('  - demo / 1234 (3 quizzes no histórico)');
console.log('  - usuario1 / senha123 (1 quiz no histórico)');
console.log('  - jaspion / 1984 (2 quizzes no histórico)');
console.log('');
console.log('Agora você pode:');
console.log('1. Recarregar a página (F5)');
console.log('2. Fazer login com uma dessas contas');
console.log('3. Ver o histórico pré-carregado');

// ===================================
// INSTRUÇÕES:
// ===================================
// 
// 1. Abra index.html no navegador
// 2. Pressione F12 para abrir o DevTools
// 3. Clique na aba "Console"
// 4. Cole TODO o conteúdo deste arquivo
// 5. Pressione Enter
// 6. Veja a mensagem ✅ de confirmação
// 7. Recarregue a página (F5)
// 8. Faça login com qualquer conta acima
//
// ===================================
// CONTAS DE TESTE:
// ===================================
//
// Conta: demo
// Senha: 1234
// Histórico: 3 quizzes (83%, 67%, 100%)
//
// Conta: usuario1
// Senha: senha123
// Histórico: 1 quiz (50%)
//
// Conta: jaspion
// Senha: 1984
// Histórico: 2 quizzes (100%, 100%)
//
// ===================================
