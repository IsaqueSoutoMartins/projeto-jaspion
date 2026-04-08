# 📊 Schema SQL - Quiz Jaspion

## Visão Geral

O arquivo `schema.sql` contém a estrutura completa do banco de dados para integração com um backend. Este documento explica como usar o schema e integrá-lo com a aplicação.

## 📁 Arquivos Disponíveis

- **schema.sql** - Schema SQL completo com todas as tabelas, views e procedures

## 🗄️ Tabelas Principais

### 1. **users** - Usuários do Sistema
```sql
Armazena:
- Identificadores únicos
- Credenciais (username, password_hash)
- Datas de criação e último login
- Status da conta (ativo, inativo, deletado, suspenso)
```

**Campos:**
- `id` - Identificador único
- `username` - Nome de usuário (único)
- `password_hash` - Senha criptografada com bcrypt
- `email` - Email do usuário
- `date_created` - Data de criação
- `last_login` - Último acesso
- `is_active` - Se a conta está ativa
- `account_status` - Estado atual da conta

---

### 2. **questions** - Perguntas do Quiz
```sql
Armazena:
- Texto da pergunta
- Numero sequencial
- Caminho da imagem
- Categoria e dificuldade
```

**Campos:**
- `id` - Identificador único
- `question_text` - Pergunta em formato texto
- `question_number` - Ordem da pergunta (1-6)
- `image_path` - Caminho para a imagem (ex: 1.png)
- `category` - Categoria (Characters, Origin, Powers, etc)
- `difficulty` - Nível (easy, medium, hard)

---

### 3. **answer_options** - Opções de Resposta
```sql
Armazena:
- Texto de cada opção
- Se é a resposta correta
- Posição na pergunta
```

**Campos:**
- `id` - Identificador único
- `question_id` - Referência à pergunta
- `answer_text` - Texto da opção
- `is_correct` - Se é a resposta correta (TRUE/FALSE)
- `position` - Posição (1-4)

---

### 4. **quiz_results** - Resultados dos Quizzes
```sql
Armazena:
- Resultado geral de cada quiz
- Pontuação e acertos
- Data e tempo de conclusão
```

**Campos:**
- `id` - Identificador único
- `user_id` - Referência ao usuário
- `quiz_date` - Data/hora de realização
- `total_questions` - Total de perguntas (sempre 6)
- `correct_answers` - Número de acertos
- `score_percentage` - Percentual (0-100)
- `completion_time` - Tempo em segundos
- `quiz_status` - Status (completed, incomplete, abandoned)

---

### 5. **user_answers** - Respostas Individuais
```sql
Armazena:
- Cada resposta do usuário
- Se estava correta
- Horário da resposta
```

**Campos:**
- `id` - Identificador único
- `quiz_result_id` - Referência ao resultado
- `question_id` - Referência à pergunta
- `selected_answer_id` - Resposta selecionada
- `is_correct` - Se acertou
- `answered_at` - Data/hora da resposta

---

### 6. **profile_edits** - Histórico de Edições
```sql
Armazena:
- Todas as mudanças no perfil
- O que mudou (antes e depois)
- Quando e de onde foi alterado
```

**Campos:**
- `id` - Identificador único
- `user_id` - Referência ao usuário
- `edit_date` - Data/hora da edição
- `field_changed` - Campo alterado (username, password, etc)
- `old_value` - Valor anterior
- `new_value` - Novo valor
- `ip_address` - IP de onde foi alterado
- `user_agent` - Navegador/dispositivo

---

### 7. **login_history** - Histórico de Logins
```sql
Armazena:
- Todos os acessos ao sistema
- Sucessos e falhas
- IP e dispositivo usado
```

**Campos:**
- `id` - Identificador único
- `user_id` - Referência ao usuário
- `login_date` - Data/hora do login
- `ip_address` - IP do acesso
- `user_agent` - Navegador/dispositivo
- `login_status` - success, failed, blocked

---

### 8. **deleted_accounts** - Contas Deletadas
```sql
Armazena:
- Registro permanente de contas deletadas
- Motivo e estatísticas finais
- Importante para LGPD/GDPR
```

**Campos:**
- `id` - Identificador único
- `username` - Nome da conta (deletada)
- `deleted_at` - Data/hora da exclusão
- `deletion_reason` - Motivo da exclusão
- `total_quizzes_completed` - Total realizado
- `average_score` - Pontuação média
- `best_score` - Melhor já alcançado
- `account_age_days` - Quantos dias a conta existia
- `deletion_type` - user_requested, admin_action, inactivity

---

### 9. **audit_logs** - Log de Auditoria Central
```sql
Armazena:
- Todas as ações importantes
- Dados estruturados em JSON
- Para compliance e segurança
```

**Campos:**
- `id` - Identificador único
- `action_type` - Tipo de ação (ACCOUNT_CREATED, QUIZ_COMPLETED, etc)
- `user_id` - Referência ao usuário
- `action_date` - Data/hora da ação
- `details` - Detalhes em JSON
- `ip_address` - IP de origem
- `status` - success ou failure

---

### 10. **user_statistics** - Estatísticas Desnormalizadas
```sql
Armazena:
- Dados agregados de desempenho
- Atualizado automaticamente via trigger
- Otimiza queries de dashboard
```

**Campos:**
- `id` - Identificador único
- `user_id` - Referência ao usuário
- `total_quizzes` - Total realizado
- `completed_quizzes` - Total completados
- `average_score` - Média de acertos
- `best_score` - Melhor pontuação
- `worst_score` - Pior pontuação
- `total_correct_answers` - Número de acertos
- `total_incorrect_answers` - Número de erros
- `last_quiz_date` - Último quiz realizado
- `first_quiz_date` - Primeiro quiz realizado
- `last_updated` - Última atualização

---

## 📊 VIEWS (Consultas Pré-definidas)

### 1. **user_performance_summary**
Resumo de desempenho do usuário

```sql
SELECT * FROM user_performance_summary 
WHERE username = 'seu_usuario';

Retorna:
- Total de quizzes realizados
- Pontuação média
- Melhor e pior scores
- Datas do primeiro e último quiz
```

### 2. **profile_changes_log**
Histórico de mudanças no perfil

```sql
SELECT * FROM profile_changes_log 
WHERE username = 'seu_usuario';

Retorna:
- Todas as edições do perfil
- Data/hora de cada mudança
- O que foi alterado
- IP de origem
```

### 3. **deleted_accounts_report**
Relatório de contas deletadas

```sql
SELECT * FROM deleted_accounts_report;

Retorna:
- Contas deletadas
- Quando foram deletadas
- Motivo da exclusão
- Estatísticas finais
```

### 4. **most_answered_questions**
Questões mais acertadas

```sql
SELECT * FROM most_answered_questions;

Retorna:
- Cada pergunta
- Total de tentativas
- Taxa de sucesso
- Qual é mais fácil/difícil
```

---

## ⚙️ STORED PROCEDURES (Funções)

### 1. **delete_user_account**
Deleta uma conta com auditoria

```sql
CALL delete_user_account(
    p_user_id := 123,
    p_reason := 'Usuário solicitou exclusão',
    p_ip_address := '192.168.1.1'
);

Faz:
- Copia dados para deleted_accounts
- Registra em audit_logs
- Marca conta como deletada
- Inativa a conta
```

### 2. **log_user_login**
Registra tentativa de login

```sql
CALL log_user_login(
    p_user_id := 123,
    p_ip_address := '192.168.1.1',
    p_user_agent := 'Mozilla/5.0...',
    p_success := TRUE
);
```

### 3. **log_profile_edit**
Registra edição de perfil

```sql
CALL log_profile_edit(
    p_user_id := 123,
    p_field_changed := 'username',
    p_old_value := 'usuario_antigo',
    p_new_value := 'usuario_novo',
    p_ip_address := '192.168.1.1'
);
```

### 4. **update_user_statistics**
Atualiza estatísticas do usuário

```sql
CALL update_user_statistics(p_user_id := 123);

Recalcula:
- Total de quizzes
- Pontuação média
- Melhor/pior score
```

---

## ⏳ TRIGGERS (Automatismos)

### 1. **after_quiz_result_insert**
Acionado quando um novo quiz é inserido

**Faz automaticamente:**
- Atualiza tabela user_statistics
- Registra em audit_logs
- Rastreia score e respostas

### 2. **after_user_insert**
Acionado quando novo usuário é criado

**Faz automaticamente:**
- Cria registro em user_statistics
- Registra criação em audit_logs

---

## 🔗 Relacionamentos (ER Diagram)

```
users (1) ←→ (many) quiz_results
users (1) ←→ (many) profile_edits
users (1) ←→ (many) login_history
users (1) ←→ (many) audit_logs

quiz_results (1) ←→ (many) user_answers
questions (1) ←→ (many) answer_options
questions (1) ←→ (many) user_answers
answer_options (1) ←→ (many) user_answers

users (1) → (1) user_statistics
```

---

## 🚀 Como Usar em Produção

### 1. **Instalação**
```bash
# Criar banco de dados
CREATE DATABASE quiz_jaspion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Usar o banco
USE quiz_jaspion;

# Executar o schema
SOURCE /caminho/para/schema.sql;
```

### 2. **Integração com Node.js/Express**

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'quiz_jaspion'
});

// Criar usuário
async function createUser(username, passwordHash) {
    const conn = await pool.getConnection();
    const [result] = await conn.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [username, passwordHash]
    );
    await conn.release();
    return result.insertId;
}

// Salvar resultado do quiz
async function saveQuizResult(userId, questions, correctAnswers, percentage) {
    const conn = await pool.getConnection();
    const [result] = await conn.execute(
        'INSERT INTO quiz_results (user_id, total_questions, correct_answers, score_percentage) VALUES (?, ?, ?, ?)',
        [userId, questions, correctAnswers, percentage]
    );
    await conn.release();
    return result.insertId;
}

// Registrar login
async function logLogin(userId, ipAddress, userAgent, success) {
    const conn = await pool.getConnection();
    await conn.execute(
        'INSERT INTO login_history (user_id, ip_address, user_agent, login_status) VALUES (?, ?, ?, ?)',
        [userId, ipAddress, userAgent, success ? 'success' : 'failed']
    );
    await conn.release();
}
```

### 3. **Integração com Python/Flask**

```python
import mysql.connector
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="sua_senha",
    database="quiz_jaspion"
)

cursor = db.cursor()

# Criar usuário
def create_user(username, password_hash):
    sql = "INSERT INTO users (username, password_hash) VALUES (%s, %s)"
    cursor.execute(sql, (username, password_hash))
    db.commit()
    return cursor.lastrowid

# Salvar resultado
def save_quiz_result(user_id, correct_answers, percentage):
    sql = """INSERT INTO quiz_results 
             (user_id, total_questions, correct_answers, score_percentage) 
             VALUES (%s, 6, %s, %s)"""
    cursor.execute(sql, (user_id, correct_answers, percentage))
    db.commit()
    return cursor.lastrowid
```

---

## 🔒 Segurança em Produção

### Recomendações:

1. **Criptografia de Senhas**
   - Usar bcrypt, não texto plano!
   - Mínimo 10 rounds de salt

2. **Conexão SSL/TLS**
   - Criptografar transmissão de dados
   - Usar HTTPS em produção

3. **Princípio de Menor Privilégio**
   ```sql
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'senha_forte';
   GRANT SELECT, INSERT, UPDATE ON quiz_jaspion.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Backup Regular**
   ```bash
   mysqldump -u root -p quiz_jaspion > backup_$(date +%Y%m%d).sql
   ```

5. **Monitoramento**
   - Logs de acesso
   - Alertas de deletões
   - Verificação de anomalias

---

## 📈 Performance

### Índices Otimizados:
- `idx_users_active` - Busca de usuários ativos
- `idx_users_created` - Busca por data de criação
- `idx_quiz_results_user` - Quizzes por usuário
- `idx_user_login_date` - Logins por data
- Todas as chaves estrangeiras possuem índices

### Dicas:
- Usar `EXPLAIN` para analisar queries
- Implementar cache (Redis) para consultas frequentes
- Particionar tabelas grandes (audit_logs, login_history)

---

## 📊 Exemplos de Queries Úteis

### Listar melhores 10 jogadores:
```sql
SELECT u.username, us.average_score, us.best_score, us.total_quizzes
FROM users u
JOIN user_statistics us ON u.id = us.user_id
WHERE u.is_active = TRUE
ORDER BY us.average_score DESC
LIMIT 10;
```

### Questão mais difícil:
```sql
SELECT * FROM most_answered_questions
ORDER BY success_rate ASC
LIMIT 1;
```

### Últimas 5 contas deletadas:
```sql
SELECT * FROM deleted_accounts_report
LIMIT 5;
```

### Histórico de edições de um usuário:
```sql
SELECT * FROM profile_changes_log
WHERE username = 'seu_usuario'
ORDER BY edit_date DESC;
```

---

## 🛠️ Troubleshooting

**Problema:** Estatísticas não atualizam
- **Solução:** Verificar se trigger `after_quiz_result_insert` existe
- Executar: `CALL update_user_statistics(user_id);` manualmente

**Problema:** Chave estrangeira violada
- **Solução:** Verificar se IDs existem nas tabelas referenciadas
- Desabilitar FK temporariamente: `SET FOREIGN_KEY_CHECKS=0;`

**Problema:** Query lenta
- **Solução:** Executar `EXPLAIN` e adicionar índices conforme necessário

---

## 📝 Próximas Etapas

1. ⚙️ Implementar em MySQL/MariaDB
2. 🔐 Criptografar senhas com bcrypt
3. 🌐 Integrar com backend (Node.js, Python, PHP)
4. 📊 Criar dashboards com os dados
5. 🔔 Implementar notificações
6. 📱 Criar API REST

---

**Documentação Schema SQL - Quiz Jaspion v1.0**
Criado: 08 de abril de 2026
