// ========== DADOS DO QUIZ ==========
const quizData = {
    title: "Quiz Jaspion - Herói do Espaço",
    questions: [
        {
            id: 1,
            image: "1.png",
            question: "Qual é o verdadeiro nome do herói Jaspion?",
            answers: [
                { text: "Ryo Shimizu", correct: true },
                { text: "Takeshi Yamamoto", correct: false },
                { text: "Goro Nakamura", correct: false },
                { text: "Hiroshi Tanaka", correct: false }
            ]
        },
        {
            id: 2,
            image: "2.png",
            question: "De qual planeta/dimensão Jaspion veio para proteger a Terra?",
            answers: [
                { text: "Planeta Phantom", correct: false },
                { text: "Dimensão Jaspion", correct: true },
                { text: "Planeta Zimba", correct: false },
                { text: "Galáxia de Orion", correct: false }
            ]
        },
        {
            id: 3,
            image: "3.png",
            question: "Qual é a principal transformação/modo de poder de Jaspion?",
            answers: [
                { text: "Forma Dourada", correct: false },
                { text: "Modo Super Jaspion", correct: true },
                { text: "Transformação Cósmica", correct: false },
                { text: "Poder Infinito", correct: false }
            ]
        },
        {
            id: 4,
            image: "4.png",
            question: "Qual é o nome da organização malévola que Jaspion combate?",
            answers: [
                { text: "Organização Makai", correct: false },
                { text: "Exército Zimba", correct: true },
                { text: "Força Sombria", correct: false },
                { text: "Tribo Demoníaca", correct: false }
            ]
        },
        {
            id: 5,
            image: "5.png",
            question: "Qual é o nome do dispositivo/arma especial de Jaspion?",
            answers: [
                { text: "Jaspy Cutter", correct: false },
                { text: "Laser Blade", correct: false },
                { text: "Jaspion Sword", correct: true },
                { text: "Power Buster", correct: false }
            ]
        },
        {
            id: 6,
            image: "6.png",
            question: "Em que ano o tokusatsu 'Jaspion' foi ao ar pela primeira vez?",
            answers: [
                { text: "1983", correct: false },
                { text: "1984", correct: true },
                { text: "1985", correct: false },
                { text: "1982", correct: false }
            ]
        }
    ]
};

// ========== VARIÁVEIS GLOBAIS ==========
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;
let currentQuizAnswers = [];
let quizInProgress = false;
let currentQuestionIndex = 0;

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    checkIfUserLoggedIn();
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Login & Signup
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('toggleSignup').addEventListener('click', toggleSignup);
    document.getElementById('toggleLogin').addEventListener('click', toggleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });

    // Quiz
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('retakeQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);

    // Histórico
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);

    // Perfil
    document.getElementById('editProfileBtn').addEventListener('click', showEditProfile);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEditProfile);
    document.getElementById('editProfileForm').addEventListener('submit', handleProfileEdit);
    document.getElementById('deleteProfileBtn').addEventListener('click', showDeleteConfirm);
    document.getElementById('cancelDeleteBtn').addEventListener('click', cancelDeleteProfile);
    document.getElementById('confirmDeleteBtn').addEventListener('click', handleProfileDelete);
}

// ========== AUTENTICAÇÃO ==========
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!users[username]) {
        alert('Usuário não encontrado!');
        return;
    }

    if (users[username].password !== password) {
        alert('Senha incorreta!');
        return;
    }

    currentUser = {
        username: username,
        password: password
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showScreen('mainScreen');
    updateWelcomeMessage();
    updateStats();
    document.getElementById('loginForm').reset();
}

function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    if (!username || !password || !confirm) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (password !== confirm) {
        alert('As senhas não correspondem!');
        return;
    }

    if (password.length < 4) {
        alert('A senha precisa ter no mínimo 4 caracteres!');
        return;
    }

    if (users[username]) {
        alert('Esse usuário já existe!');
        return;
    }

    users[username] = {
        username: username,
        password: password,
        history: [],
        dateCreated: new Date().toLocaleDateString('pt-BR'),
        editHistory: [],
        deletionLog: null
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('Conta criada com sucesso! Agora faça login.');
    toggleLogin(e);
    document.getElementById('signupForm').reset();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showScreen('loginScreen');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
}

function checkIfUserLoggedIn() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showScreen('mainScreen');
        updateWelcomeMessage();
        updateStats();
    } else {
        showScreen('loginScreen');
    }
}

// ========== TELAS ==========
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function toggleSignup(e) {
    e.preventDefault();
    showScreen('signupScreen');
}

function toggleLogin(e) {
    e.preventDefault();
    showScreen('loginScreen');
}

function updateWelcomeMessage() {
    if (currentUser) {
        document.getElementById('welcomeUser').textContent = `Bem-vindo, ${currentUser.username}! 👋`;
    }
}

// ========== ABAS ==========
function handleTabChange(e) {
    const tabName = e.target.getAttribute('data-tab');
    
    // Remover classe ativa de todos os botões e conteúdos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adicionar classe ativa ao botão e conteúdo clicado
    e.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Atualizar dados quando mudar de aba
    if (tabName === 'history') {
        updateHistoryDisplay();
    } else if (tabName === 'home') {
        updateStats();
    } else if (tabName === 'profile') {
        showProfileInfo();
    }
}

// ========== QUIZ ==========
function startQuiz() {
    quizInProgress = true;
    currentQuestionIndex = 0;
    currentQuizAnswers = new Array(quizData.questions.length).fill(null);
    
    document.getElementById('quizPlaceholder').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    showQuestion();
}

function showQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    
    // Atualizar progressão
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionNumber').textContent = 
        `Pergunta ${currentQuestionIndex + 1} de ${quizData.questions.length}`;
    
    // Atualizar imagem
    document.getElementById('quizImage').src = question.image;
    
    // Atualizar pergunta
    document.getElementById('questionText').textContent = question.question;
    
    // Atualizar respostas
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        if (currentQuizAnswers[currentQuestionIndex] === index) {
            answerDiv.classList.add('selected');
        }
        answerDiv.textContent = answer.text;
        answerDiv.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerDiv);
    });
    
    // Atualizar botões
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === quizData.questions.length - 1 ? 'Finalizar' : 'Próxima';
    document.getElementById('nextBtn').disabled = currentQuizAnswers[currentQuestionIndex] === null;
}

function selectAnswer(index) {
    currentQuizAnswers[currentQuestionIndex] = index;
    
    // Atualizar visualização
    document.querySelectorAll('.answer-option').forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    // Habilitar botão Próxima
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function finishQuiz() {
    quizInProgress = false;
    const score = calculateScore();
    const percentage = Math.round((score / quizData.questions.length) * 100);
    
    // Salvar resultado no histórico
    saveQuizResult(score, percentage);
    
    // Mostrar resultados
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('finalScore').textContent = `${score} / ${quizData.questions.length}`;
    document.getElementById('finalPercentage').textContent = `${percentage}%`;
    
    // Feedback
    let feedback = '';
    if (percentage >= 80) {
        feedback = `<p style="color: #2ecc71; font-weight: bold; font-size: 1.2em;">Parabéns! 🎉 Você é um verdadeiro fã de Jaspion!</p>`;
    } else if (percentage >= 60) {
        feedback = `<p style="color: #f7b801; font-weight: bold; font-size: 1.2em;">Muito bom! 👍 Você conhece bem o herói do espaço!</p>`;
    } else {
        feedback = `<p style="color: #e74c3c; font-weight: bold; font-size: 1.2em;">Que pena! 😅 Estude mais sobre Jaspion e tente novamente!</p>`;
    }
    
    // Detalhe das respostas
    feedback += '<div class="feedback-item" style="margin-top: 20px;"><strong>Suas Respostas:</strong></div>';
    quizData.questions.forEach((question, index) => {
        const userAnswer = currentQuizAnswers[index];
        const correct = question.answers[userAnswer]?.correct;
        const className = correct ? 'correct' : 'incorrect';
        const icon = correct ? '✓' : '✗';
        
        feedback += `
            <div class="feedback-item ${className}">
                <div class="feedback-question">${icon} ${question.question}</div>
                <div class="feedback-answer">Sua resposta: ${question.answers[userAnswer]?.text || 'Não respondida'}</div>
                ${!correct ? `<div class="feedback-answer"><strong>Resposta correta:</strong> ${question.answers.find(a => a.correct).text}</div>` : ''}
            </div>
        `;
    });
    
    document.getElementById('resultFeedback').innerHTML = feedback;
    updateStats();
}

function calculateScore() {
    let score = 0;
    quizData.questions.forEach((question, index) => {
        const userAnswerIndex = currentQuizAnswers[index];
        if (userAnswerIndex !== null && question.answers[userAnswerIndex].correct) {
            score++;
        }
    });
    return score;
}

function saveQuizResult(score, percentage) {
    if (!currentUser) return;
    
    if (!users[currentUser.username]) {
        users[currentUser.username] = { history: [] };
    }
    
    if (!users[currentUser.username].history) {
        users[currentUser.username].history = [];
    }
    
    const result = {
        date: new Date().toLocaleString('pt-BR'),
        score: score,
        totalQuestions: quizData.questions.length,
        percentage: percentage,
        answers: currentQuizAnswers
    };
    
    users[currentUser.username].history.push(result);
    localStorage.setItem('users', JSON.stringify(users));
}

// ========== HISTÓRICO ==========
function updateHistoryDisplay() {
    if (!currentUser || !users[currentUser.username]) {
        document.getElementById('historyList').innerHTML = '<p class="empty-message">Você ainda não realizou nenhum quiz.</p>';
        document.getElementById('clearHistoryBtn').style.display = 'none';
        return;
    }
    
    const history = users[currentUser.username].history || [];
    
    if (history.length === 0) {
        document.getElementById('historyList').innerHTML = '<p class="empty-message">Você ainda não realizou nenhum quiz.</p>';
        document.getElementById('clearHistoryBtn').style.display = 'none';
        return;
    }
    
    let historyHTML = '';
    history.forEach((result, index) => {
        historyHTML += `
            <div class="history-card">
                <h3>Quiz #${index + 1}</h3>
                <div class="history-info">
                    <span class="history-label">Data:</span>
                    <span class="history-value">${result.date}</span>
                </div>
                <div class="history-info">
                    <span class="history-label">Pontuação:</span>
                    <span class="history-score">${result.score}/${result.totalQuestions}</span>
                </div>
                <div class="history-info">
                    <span class="history-label">Porcentagem:</span>
                    <span class="history-value">${result.percentage}%</span>
                </div>
                <div class="history-timestamp">
                    ⏰ ${formatDate(result.date)}
                </div>
            </div>
        `;
    });
    
    document.getElementById('historyList').innerHTML = historyHTML;
    document.getElementById('clearHistoryBtn').style.display = 'inline-block';
}

function clearHistory() {
    if (!confirm('Tem certeza que deseja limpar todo o histórico?')) {
        return;
    }
    
    if (currentUser && users[currentUser.username]) {
        users[currentUser.username].history = [];
        localStorage.setItem('users', JSON.stringify(users));
        updateHistoryDisplay();
        updateStats();
    }
}

// ========== ESTATÍSTICAS ==========
function updateStats() {
    if (!currentUser || !users[currentUser.username]) {
        resetStats();
        return;
    }
    
    const history = users[currentUser.username].history || [];
    
    if (history.length === 0) {
        resetStats();
        return;
    }
    
    // Total de quizzes
    document.getElementById('totalQuizzes').textContent = history.length;
    
    // Melhor pontuação
    const bestResult = history.reduce((max, current) => 
        current.percentage > max.percentage ? current : max
    );
    document.getElementById('bestScore').textContent = bestResult.percentage + '%';
    
    // Pontuação média
    const avgPercentage = Math.round(
        history.reduce((sum, result) => sum + result.percentage, 0) / history.length
    );
    document.getElementById('averageScore').textContent = avgPercentage + '%';
}

function resetStats() {
    document.getElementById('totalQuizzes').textContent = '0';
    document.getElementById('averageScore').textContent = '0%';
    document.getElementById('bestScore').textContent = '0%';
}

// ========== UTILITÁRIOS ==========
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
        return dateString;
    }
}

// ========== PERFIL ==========
function showProfileInfo() {
    if (!currentUser || !users[currentUser.username]) {
        return;
    }

    const userData = users[currentUser.username];
    const history = userData.history || [];
    
    // Mostrar nome do usuário
    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('infoUsername').textContent = currentUser.username;
    
    // Data de criação
    const dateCreated = userData.dateCreated || new Date().toLocaleDateString('pt-BR');
    document.getElementById('infoDateCreated').textContent = dateCreated;
    
    // Total de quizzes
    document.getElementById('infoTotalQuizzes').textContent = history.length;
    
    // Validar se há histórico para calcular média e melhor
    if (history.length === 0) {
        document.getElementById('infoAverageScore').textContent = '0%';
        document.getElementById('infoBestScore').textContent = '0%';
    } else {
        const avgPercentage = Math.round(
            history.reduce((sum, result) => sum + result.percentage, 0) / history.length
        );
        const bestResult = history.reduce((max, current) => 
            current.percentage > max.percentage ? current : max
        );
        
        document.getElementById('infoAverageScore').textContent = avgPercentage + '%';
        document.getElementById('infoBestScore').textContent = bestResult.percentage + '%';
    }
}

function showEditProfile() {
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('profileEdit').style.display = 'block';
    document.getElementById('deleteConfirm').style.display = 'none';
}

function cancelEditProfile() {
    document.getElementById('profileView').style.display = 'block';
    document.getElementById('profileEdit').style.display = 'none';
    document.getElementById('editProfileForm').reset();
}

function handleProfileEdit(e) {
    e.preventDefault();
    
    if (!currentUser) return;

    const newUsername = document.getElementById('editUsername').value.trim();
    const newPassword = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editPasswordConfirm').value;
    const currentPassword = document.getElementById('currentPassword').value;
    
    // Verificar senha atual
    if (currentPassword !== currentUser.password) {
        alert('❌ Senha atual incorreta!');
        return;
    }
    
    // Validar se quer mudar algo
    if (!newUsername && !newPassword) {
        alert('⚠️ Digite um novo usuário ou uma nova senha!');
        return;
    }
    
    // Se quer mudar senha, validar
    if (newPassword) {
        if (newPassword.length < 4) {
            alert('⚠️ A nova senha precisa ter no mínimo 4 caracteres!');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('❌ As senhas não correspondem!');
            return;
        }
    }
    
    // Se quer mudar username, validar
    if (newUsername) {
        if (users[newUsername] && newUsername !== currentUser.username) {
            alert('❌ Esse novo usuário já existe!');
            return;
        }
    }
    
    // Registrar edição no histórico
    if (!users[currentUser.username].editHistory) {
        users[currentUser.username].editHistory = [];
    }
    
    const editLog = {
        date: new Date().toLocaleString('pt-BR'),
        changes: []
    };
    
    // Aplicar mudanças de username
    if (newUsername && newUsername !== currentUser.username) {
        // Copiar dados para novo username
        users[newUsername] = users[currentUser.username];
        users[newUsername].username = newUsername;
        
        // Registrar mudança
        editLog.changes.push(`Username alterado: "${currentUser.username}" → "${newUsername}"`);
        
        // Deletar username antigo
        delete users[currentUser.username];
        
        // Atualizar currentUser
        currentUser.username = newUsername;
    }
    
    // Aplicar mudanças de senha
    if (newPassword) {
        users[currentUser.username].password = newPassword;
        currentUser.password = newPassword;
        editLog.changes.push('Senha alterada com sucesso');
    }
    
    // Salvar log de edição
    users[currentUser.username].editHistory.push(editLog);
    
    // Salvar tudo
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('✅ Perfil atualizado com sucesso!');
    
    document.getElementById('editProfileForm').reset();
    cancelEditProfile();
    updateWelcomeMessage();
    showProfileInfo();
}

function showDeleteConfirm() {
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('profileEdit').style.display = 'none';
    document.getElementById('deleteConfirm').style.display = 'block';
}

function cancelDeleteProfile() {
    document.getElementById('profileView').style.display = 'block';
    document.getElementById('deleteConfirm').style.display = 'none';
    document.getElementById('deleteConfirmPassword').value = '';
}

function handleProfileDelete(e) {
    e.preventDefault();
    
    if (!currentUser) return;

    const confirmPassword = document.getElementById('deleteConfirmPassword').value;
    
    // Verificar senha
    if (confirmPassword !== currentUser.password) {
        alert('❌ Senha incorreta! Não foi possível excluir a conta.');
        return;
    }
    
    // Registrar exclusão
    if (!users[currentUser.username].deletionLog) {
        users[currentUser.username].deletionLog = {
            deletionDate: new Date().toLocaleString('pt-BR'),
            username: currentUser.username,
            quizzesCount: (users[currentUser.username].history || []).length,
            status: 'deleted'
        };
    }
    
    // Salvar log antes de deletar (em caso de auditoria)
    const deletionRecord = {
        username: currentUser.username,
        deletedAt: new Date().toLocaleString('pt-BR'),
        quizzesCount: (users[currentUser.username].history || []).length
    };
    
    // Criar lista de logs se não existir
    if (!localStorage.getItem('deletionLogs')) {
        localStorage.setItem('deletionLogs', JSON.stringify([]));
    }
    
    let deletionLogs = JSON.parse(localStorage.getItem('deletionLogs')) || [];
    deletionLogs.push(deletionRecord);
    localStorage.setItem('deletionLogs', JSON.stringify(deletionLogs));
    
    // Deletar usuário
    delete users[currentUser.username];
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Sua conta foi excluída permanentemente. Redirecionando para a tela de login...');
    
    // Fazer logout
    currentUser = null;
    localStorage.removeItem('currentUser');
    showScreen('loginScreen');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
}
