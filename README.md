# ClickSeguro - DevSecOps Project

Este projeto demonstra a implementação de testes de segurança automatizados utilizando **OWASP ZAP CLI** integrado ao **GitHub Actions**.

## Cenário
A ClickSeguro é uma plataforma web de agendamento de serviços residenciais. Para garantir que vulnerabilidades não cheguem em produção, configuramos um pipeline de CI/CD que realiza scans de segurança automáticos.

## Estrutura do Projeto
- `src/index.js`: Aplicação web simples (Node.js/Express) com vulnerabilidades propositais.
- `.github/workflows/security-zap.yml`: Configuração do GitHub Actions para rodar o scan do OWASP ZAP.
- `package.json`: Gerenciamento de dependências e scripts.

## Vulnerabilidades Propositais
Para testar a eficácia do pipeline, foram inseridas as seguintes falhas:
1. **Reflected XSS**: O parâmetro `error` na URL é refletido diretamente na página sem sanitização.
2. **Cookies Inseguros**: Um cookie de sessão é criado sem as flags `HttpOnly` e `Secure`.
3. **Ausência de Cabeçalhos de Segurança**: A aplicação não envia cabeçalhos como `Content-Security-Policy`, `X-Frame-Options`, etc.

## Como o Pipeline Funciona
1. O GitHub Actions faz o checkout do código.
2. A aplicação Node.js é iniciada em segundo plano.
3. O **OWASP ZAP Baseline Scan** é executado contra `http://localhost:8080`.
4. O pipeline gera relatórios em HTML e JSON.
5. **Falha Automática**: O pipeline foi configurado para falhar se encontrar qualquer vulnerabilidade de severidade **Alta** ou **Crítica**.
6. O relatório é salvo como um artefato da execução (`zap-security-report`).

## Como Rodar Localmente
1. Instale as dependências:
   ```bash
   cd clickseguro
   npm install
   ```
2. Inicie a aplicação:
   ```bash
   npm start
   ```
3. Acesse em: `http://localhost:8080`

## Análise de Segurança (Exemplo de Relatório)
Após a execução do scan, os seguintes resultados são esperados:
- **Total de Alertas**: ~10
- **Alertas por Severidade**:
  - **Crítica**: 0
  - **Alta**: 1 (Cross-Site Scripting - Reflected)
  - **Média**: 3 (Missing Anti-clickjacking Header, Cookie No HttpOnly, etc)
  - **Baixa**: 4 (X-Content-Type-Options Header Missing, etc)
  - **Informativa**: 2
- **Vulnerabilidades mais comuns**:
  - Ausência de cabeçalhos de segurança.
  - Cookies sem flags de segurança.
  - Possível XSS no formulário de login.

---
Projeto entregue como parte da atividade prática de DevSecOps / Cibersegurança.
