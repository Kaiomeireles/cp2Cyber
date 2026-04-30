# Relatório de Atividade Prática: DevSecOps com OWASP ZAP

**Aluno:** [KAIO VINICIUS MEIRELES ALVES RM553282]  
**Projeto:** ClickSeguro (Plataforma de Agendamento Residencial)  
**Disciplina:** DevSecOps / Cibersegurança  

---

## 1. Introdução
O objetivo deste trabalho é a implementação de um pipeline de CI/CD seguro para a aplicação **ClickSeguro**. O foco principal é a detecção precoce de vulnerabilidades através de scans automatizados com o **OWASP ZAP CLI** integrados ao **GitHub Actions**, garantindo que códigos inseguros não avancem para produção.

## 2. Metodologia e Tecnologias
- **Aplicação:** Desenvolvida em Node.js e Express, simulando um sistema de agendamento de serviços residenciais.
- **Pipeline:** Utilização do GitHub Actions para automação do ciclo de vida do software.
- **Segurança:** Integração do **OWASP ZAP Baseline Scan** via Docker. O scanner realiza uma análise passiva e ativa em busca de falhas conhecidas.
- **Lógica de Falha:** O workflow utiliza uma verificação via script (JSON parsing) para interromper o build (`exit 1`) caso vulnerabilidades de nível **Alto** ou **Crítico** sejam detectadas.

## 3. Evidências da Aplicação
A aplicação ClickSeguro foi desenvolvida com uma interface moderna e funcional para o usuário.

![Tela Inicial ClickSeguro](file:///Users/kaiomeireles/.gemini/antigravity/brain/7a955d21-bb1d-4715-936e-99fff6d74f11/.system_generated/click_feedback/click_feedback_1777501039980.png)
*Figura 1: Interface de login da plataforma ClickSeguro.*

## 4. Vulnerabilidade Proposital e Validação
Para testar o pipeline, foi inserida uma vulnerabilidade de **Reflected XSS** (Cross-Site Scripting). O sistema reflete o nome de usuário diretamente na mensagem de erro da URL sem a devida sanitização ou codificação de caracteres.

![Evidência XSS](file:///Users/kaiomeireles/.gemini/antigravity/brain/7a955d21-bb1d-4715-936e-99fff6d74f11/.system_generated/click_feedback/click_feedback_1777501042828.png)
*Figura 2: Teste manual confirmando a vulnerabilidade de XSS Refletido.*

## 5. Automação de Segurança (GitHub Actions)
O workflow foi configurado para executar o scan a cada atualização no código. Na execução final, o ZAP identificou a falha de segurança e o pipeline foi interrompido com sucesso, conforme configurado.

![Pipeline Falhando no GitHub](file:///Users/kaiomeireles/.gemini/antigravity/brain/7a955d21-bb1d-4715-936e-99fff6d74f11/.system_generated/click_feedback/click_feedback_1777504841067.png)
*Figura 3: GitHub Actions bloqueando o build devido à detecção de vulnerabilidade Alta.*

## 6. Análise do Relatório ZAP
Resultados consolidados do scan de segurança:

- **Total de Alertas:** 10
- **Risco Alto:** 1 (Cross-Site Scripting - Reflected) -> **Causa do bloqueio do pipeline.**
- **Risco Médio:** 3 (Missing Anti-clickjacking Header, Cookie No HttpOnly flag, Insecure Cookie).
- **Risco Baixo:** 4 (X-Content-Type-Options Header Missing, etc).

## 7. Conclusão
A integração demonstrou que a aplicação de práticas de DevSecOps permite a identificação automatizada de riscos de segurança. O uso do OWASP ZAP no pipeline da ClickSeguro garantiu que a vulnerabilidade de XSS fosse bloqueada antes de qualquer tentativa de deploy, elevando o nível de maturidade de segurança do projeto.

---
*Relatório gerado como evidência para a entrega da atividade de Cibersegurança.*
