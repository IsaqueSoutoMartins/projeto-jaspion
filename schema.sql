create database quizjaspion;
use quizjaspion;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    account_status ENUM('active', 'inactive', 'deleted', 'suspended') DEFAULT 'active'
);

-- =====================================================
-- 2. TABELA DE PERGUNTAS DO QUIZ
-- =====================================================
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    question_number INT NOT NULL UNIQUE,
    image_path VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. TABELA DE RESPOSTAS POSSÍVEIS
-- =====================================================
CREATE TABLE answer_options (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    question_id INT NOT NULL,
    answer_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    position INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_question_position (question_id, position)
);

-- =====================================================
-- 4. TABELA DE RESULTADOS DOS QUIZZES
-- =====================================================
CREATE TABLE quiz_results (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    quiz_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    score_percentage DECIMAL(5,2) NOT NULL,
    completion_time INT,
    quiz_status ENUM('completed', 'incomplete', 'abandoned') DEFAULT 'completed',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_date (user_id, quiz_date),
    INDEX idx_user_percentage (user_id, score_percentage)
);

-- =====================================================
-- 5. TABELA DE RESPOSTAS DO USUÁRIO
-- =====================================================
CREATE TABLE user_answers (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quiz_result_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_answer_id INT,
    is_correct BOOLEAN,
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_result_id) REFERENCES quiz_results(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_answer_id) REFERENCES answer_options(id),
    INDEX idx_quiz_result (quiz_result_id)
);

-- =====================================================
-- 6. TABELA DE EDIÇÕES DE PERFIL
-- =====================================================
CREATE TABLE profile_edits (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    edit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    field_changed VARCHAR(100) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_edit_date (user_id, edit_date)
);

-- =====================================================
-- 7. TABELA DE HISTÓRICO DE LOGIN
-- =====================================================
CREATE TABLE login_history (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    login_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    login_status ENUM('success', 'failed', 'blocked') DEFAULT 'success',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_login_date (user_id, login_date)
);

-- =====================================================
-- 8. TABELA DE EXCLUSÃO DE PERFIL
-- =====================================================
CREATE TABLE deleted_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deletion_reason VARCHAR(255),
    total_quizzes_completed INT,
    average_score DECIMAL(5,2),
    best_score DECIMAL(5,2),
    account_age_days INT,
    ip_address VARCHAR(45),
    deletion_type ENUM('user_requested', 'admin_action', 'inactivity') DEFAULT 'user_requested'
);

-- =====================================================
-- 9. TABELA DE LOGS DE AUDITORIA
-- =====================================================
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    user_id INT,
    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    details JSON,
    ip_address VARCHAR(45),
    status ENUM('success', 'failure') DEFAULT 'success',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_action_type (action_type),
    INDEX idx_action_date (action_date)
);

-- =====================================================
-- 10. TABELA DE ESTATÍSTICAS DO USUÁRIO
-- =====================================================
CREATE TABLE user_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL UNIQUE,
    total_quizzes INT DEFAULT 0,
    completed_quizzes INT DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    best_score DECIMAL(5,2) DEFAULT 0,
    worst_score DECIMAL(5,2) DEFAULT 0,
    total_correct_answers INT DEFAULT 0,
    total_incorrect_answers INT DEFAULT 0,
    last_quiz_date DATETIME,
    first_quiz_date DATETIME,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_users_active ON users(is_active, account_status);
CREATE INDEX idx_users_created ON users(date_created);
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);

-- =====================================================
-- DADOS INICIAIS - PERGUNTAS DO QUIZ
-- =====================================================
INSERT INTO questions (question_number, question_text, image_path, category, difficulty) VALUES
(1, 'Qual é o verdadeiro nome do herói Jaspion?', '1.png', 'Characters', 'easy'),
(2, 'De qual planeta/dimensão Jaspion veio para proteger a Terra?', '2.png', 'Origin', 'medium'),
(3, 'Qual é a principal transformação/modo de poder de Jaspion?', '3.png', 'Powers', 'medium'),
(4, 'Qual é o nome da organização malévola que Jaspion combate?', '4.png', 'Enemies', 'medium'),
(5, 'Qual é o nome do dispositivo/arma especial de Jaspion?', '5.png', 'Equipment', 'easy'),
(6, 'Em que ano o tokusatsu Jaspion foi ao ar pela primeira vez?', '6.png', 'Trivia', 'hard');

-- =====================================================
-- DADOS INICIAIS - RESPOSTAS DAS PERGUNTAS
-- =====================================================
-- Pergunta 1
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(1, 'Ryo Shimizu', TRUE, 1),
(1, 'Takeshi Yamamoto', FALSE, 2),
(1, 'Goro Nakamura', FALSE, 3),
(1, 'Hiroshi Tanaka', FALSE, 4);

-- Pergunta 2
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(2, 'Planeta Phantom', FALSE, 1),
(2, 'Dimensão Jaspion', TRUE, 2),
(2, 'Planeta Zimba', FALSE, 3),
(2, 'Galáxia de Orion', FALSE, 4);

-- Pergunta 3
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(3, 'Forma Dourada', FALSE, 1),
(3, 'Modo Super Jaspion', TRUE, 2),
(3, 'Transformação Cósmica', FALSE, 3),
(3, 'Poder Infinito', FALSE, 4);

-- Pergunta 4
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(4, 'Organização Makai', FALSE, 1),
(4, 'Exército Zimba', TRUE, 2),
(4, 'Força Sombria', FALSE, 3),
(4, 'Tribo Demoníaca', FALSE, 4);

-- Pergunta 5
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(5, 'Jaspy Cutter', FALSE, 1),
(5, 'Laser Blade', FALSE, 2),
(5, 'Jaspion Sword', TRUE, 3),
(5, 'Power Buster', FALSE, 4);

-- Pergunta 6
INSERT INTO answer_options (question_id, answer_text, is_correct, position) VALUES
(6, '1983', FALSE, 1),
(6, '1984', TRUE, 2),
(6, '1985', FALSE, 3),
(6, '1982', FALSE, 4);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Resumo de Performance do Usuário
CREATE VIEW user_performance_summary AS
SELECT 
    u.id,
    u.username,
    COALESCE(COUNT(qr.id), 0) as total_quizzes,
    COALESCE(AVG(qr.score_percentage), 0) as average_score,
    COALESCE(MAX(qr.score_percentage), 0) as best_score,
    COALESCE(MIN(qr.score_percentage), 0) as worst_score,
    MAX(qr.quiz_date) as last_quiz_date,
    MIN(qr.quiz_date) as first_quiz_date
FROM users u
LEFT JOIN quiz_results qr ON u.id = qr.user_id
GROUP BY u.id, u.username;

-- View: Histórico de Mudanças no Perfil
CREATE VIEW profile_changes_log AS
SELECT 
    u.username,
    pe.edit_date,
    pe.field_changed,
    pe.old_value,
    pe.new_value,
    pe.ip_address
FROM profile_edits pe
JOIN users u ON pe.user_id = u.id
ORDER BY pe.edit_date DESC;

-- View: Contas Deletadas com Estatísticas
CREATE VIEW deleted_accounts_report AS
SELECT 
    username,
    deleted_at,
    deletion_type,
    total_quizzes_completed,
    average_score,
    best_score,
    account_age_days,
    DATEDIFF(deleted_at, DATE_SUB(deleted_at, INTERVAL account_age_days DAY)) as account_created
FROM deleted_accounts
ORDER BY deleted_at DESC;

-- View: Questões Mais Acertadas
CREATE VIEW most_answered_questions AS
SELECT 
    q.question_number,
    q.question_text,
    COUNT(ua.id) as total_attempts,
    SUM(CASE WHEN ua.is_correct = TRUE THEN 1 ELSE 0 END) as correct_count,
    ROUND((SUM(CASE WHEN ua.is_correct = TRUE THEN 1 ELSE 0 END) / COUNT(ua.id) * 100), 2) as success_rate
FROM questions q
LEFT JOIN user_answers ua ON q.id = ua.question_id
GROUP BY q.id, q.question_number, q.question_text
ORDER BY success_rate DESC;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Procedure: Registrar Exclusão de Conta
DELIMITER $$
CREATE PROCEDURE delete_user_account(
    IN p_user_id INT,
    IN p_reason VARCHAR(255),
    IN p_ip_address VARCHAR(45)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Copiar dados para a tabela de contas deletadas
    INSERT INTO deleted_accounts (
        username, deletion_reason, total_quizzes_completed,
        average_score, best_score, account_age_days, ip_address
    )
    SELECT 
        u.username,
        p_reason,
        COALESCE(COUNT(qr.id), 0),
        COALESCE(AVG(qr.score_percentage), 0),
        COALESCE(MAX(qr.score_percentage), 0),
        DATEDIFF(NOW(), u.date_created),
        p_ip_address
    FROM users u
    LEFT JOIN quiz_results qr ON u.id = qr.user_id
    WHERE u.id = p_user_id
    GROUP BY u.id;
    
    -- Registrar ação de auditoria
    INSERT INTO audit_logs (action_type, user_id, details, ip_address, status)
    VALUES ('ACCOUNT_DELETED', p_user_id, JSON_OBJECT('reason', p_reason), p_ip_address, 'success');
    
    -- Atualizar status do usuário (não deletar imediatamente, apenas inativar)
    UPDATE users SET account_status = 'deleted', is_active = FALSE WHERE id = p_user_id;
    
    COMMIT;
END$$
DELIMITER ;

-- Procedure: Registrar Login
DELIMITER $$
CREATE PROCEDURE log_user_login(
    IN p_user_id INT,
    IN p_ip_address VARCHAR(45),
    IN p_user_agent VARCHAR(500),
    IN p_success BOOLEAN
)
BEGIN
    INSERT INTO login_history (user_id, ip_address, user_agent, login_status)
    VALUES (p_user_id, p_ip_address, p_user_agent, IF(p_success, 'success', 'failed'));
    
    IF p_success THEN
        UPDATE users SET last_login = NOW() WHERE id = p_user_id;
    END IF;
END$$
DELIMITER ;

-- Procedure: Registrar Edição de Perfil
DELIMITER $$
CREATE PROCEDURE log_profile_edit(
    IN p_user_id INT,
    IN p_field_changed VARCHAR(100),
    IN p_old_value VARCHAR(255),
    IN p_new_value VARCHAR(255),
    IN p_ip_address VARCHAR(45)
)
BEGIN
    INSERT INTO profile_edits (
        user_id, field_changed, old_value, new_value, ip_address
    )
    VALUES (p_user_id, p_field_changed, p_old_value, p_new_value, p_ip_address);
    
    INSERT INTO audit_logs (
        action_type, user_id, details, ip_address
    )
    VALUES (
        'PROFILE_EDIT',
        p_user_id,
        JSON_OBJECT('field', p_field_changed, 'old', p_old_value, 'new', p_new_value),
        p_ip_address
    );
END$$
DELIMITER ;

-- Procedure: Atualizar Estatísticas do Usuário
DELIMITER $$
CREATE PROCEDURE update_user_statistics(IN p_user_id INT)
BEGIN
    DECLARE v_total INT;
    DECLARE v_avg DECIMAL(5,2);
    DECLARE v_best DECIMAL(5,2);
    
    SELECT 
        COUNT(*),
        AVG(score_percentage),
        MAX(score_percentage)
    INTO v_total, v_avg, v_best
    FROM quiz_results
    WHERE user_id = p_user_id;
    
    IF EXISTS (SELECT 1 FROM user_statistics WHERE user_id = p_user_id) THEN
        UPDATE user_statistics
        SET 
            total_quizzes = v_total,
            average_score = COALESCE(v_avg, 0),
            best_score = COALESCE(v_best, 0),
            last_updated = NOW()
        WHERE user_id = p_user_id;
    ELSE
        INSERT INTO user_statistics (user_id, total_quizzes, average_score, best_score)
        VALUES (p_user_id, v_total, COALESCE(v_avg, 0), COALESCE(v_best, 0));
    END IF;
END$$
DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger: Atualizar estatísticas quando novo resultado é inserido
DELIMITER $$
CREATE TRIGGER after_quiz_result_insert
AFTER INSERT ON quiz_results
FOR EACH ROW
BEGIN
    CALL update_user_statistics(NEW.user_id);
    
    INSERT INTO audit_logs (action_type, user_id, details)
    VALUES (
        'QUIZ_COMPLETED',
        NEW.user_id,
        JSON_OBJECT(
            'quiz_id', NEW.id,
            'score', NEW.score_percentage,
            'correct_answers', NEW.correct_answers
        )
    );
END$$
DELIMITER ;

-- Trigger: Registrar quando usuário é criado
DELIMITER $$
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_statistics (user_id) VALUES (NEW.id);
    
    INSERT INTO audit_logs (action_type, user_id, details)
    VALUES ('USER_CREATED', NEW.id, JSON_OBJECT('username', NEW.username));
END$$
DELIMITER ;

-- =====================================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- =====================================================
/*
TABELAS DESCRIÇÃO:

1. users
   - Armazena informações básicas do usuário
   - password_hash: deve ser criptografado com bcrypt em produção
   - account_status: rastreia o estado da conta

2. questions
   - Armazena todas as perguntas do quiz
   - Inclui imagem associada e nível de dificuldade

3. answer_options
   - Respostas possíveis para cada pergunta
   - is_correct marca a resposta correta

4. quiz_results
   - Resultado geral de cada tentativa de quiz
   - Armazena percentual e tempo de conclusão

5. user_answers
   - Detalha cada resposta individual do usuário
   - Permite análise de padrões de erro

6. profile_edits
   - LOG de todas as mudanças de perfil
   - Rastreia when, what e who modificou

7. login_history
   - Histórico de tentativas de login
   - Segurança e auditoria

8. deleted_accounts
   - Registro permanente de contas deletadas
   - Importante para conformidade legal (GDPR, LGPD)

9. audit_logs
   - Log centralizado de todas as ações importantes
   - JSON para flexibilidade de dados

10. user_statistics
    - Tabela desnormalizada para queries rápidas
    - Melhora performance em dashboards

MELHORIAS SUGERIDAS PARA PRODUÇÃO:
- Implementar criptografia de senhas (bcrypt)
- Adicionar 2FA (autenticação de dois fatores)
- Implementar rate limiting para login
- Backup regular do banco de dados
- Monitoramento de integridade referencial
- Limpeza periódica de logs antigos
- Análise de anomalias de login/edição
- Conformidade GDPR/LGPD
*/

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
