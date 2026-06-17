# Quiz de Impacto de Jogos no Desempenho Acadêmico

## Visão Geral

Este projeto é um aplicativo web interativo desenvolvido como avaliação A3 da Universidade UNIFACS (2026/1) para a disciplina de Análise de Dados e Big Data. O quiz foi desenvolvido para avaliar como os hábitos de jogo afetam o desempenho acadêmico dos estudantes, baseado em análise de dados de mais de 10.000 estudantes.

## Objetivo

O objetivo principal é fornecer aos estudantes uma ferramenta de autoavaliação que:

- Coleta informações sobre hábitos de jogo, estudo, sono e bem-estar
- Calcula um índice de risco baseado em correlações estatísticas reais
- Apresenta um perfil personalizado com recomendações práticas
- Educação baseada em dados sobre como otimizar o equilíbrio entre jogos e estudos

## Funcionalidades Principais

### Quiz Interativo (7 perguntas)

1. **Horas de jogo por dia** - Slider de 0 a 14 horas
2. **Horas de estudo por dia** - Slider de 0 a 12 horas
3. **Horas de sono por noite** - Slider de 3 a 12 horas
4. **Desempenho acadêmico atual** - Múltipla escolha (4 opções)
5. **Percepção de impacto dos jogos** - Múltipla escolha (4 opções)
6. **Vida social presencial** - Múltipla escolha (4 opções)
7. **Nível de estresse diário** - Slider de 1 a 10

### Sistema de Avaliação

O aplicativo calcula um score de risco (0-100%) baseado em uma fórmula ponderada que considera:

- Tempo excessivo de jogo (acima de 3h/dia)
- Sono inadequado (fora da faixa 7-9 horas)
- Horas de estudo desequilibradas
- Desempenho acadêmico relatado
- Percepção de impacto dos jogos nos estudos
- Nível de isolamento social
- Nível de estresse

### Classificação de Perfil

O resultado final é classificado em três categorias:

- **Perfil Equilibrado (score < 35%)** - Hábitos saudáveis e equilibrados
- **Atenção Necessária (35% ≤ score < 60%)** - Alguns ajustes recomendados
- **Risco Alto (score ≥ 60%)** - Mudanças importantes necessárias

## Estrutura Técnica

### Arquivos

```
/site/
├── Index.html       - Estrutura HTML do aplicativo
├── Style.css        - Estilos e layout responsivo
├── Script.js        - Lógica interativa e algoritmo de cálculo
├── logomarca.jpeg   - Ícone da UNIFACS
└── README.md        - Este arquivo
```

### Tecnologias

- **HTML5** - Estrutura semântica e acessibilidade
- **CSS3** - Layout moderno com grid, flexbox e media queries
- **JavaScript Vanilla** - Sem dependências externas

### Design Responsivo

O aplicativo é totalmente responsivo e funciona em:

- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (até 480px)

## Como o Algoritmo Funciona

### Cálculo do Score de Risco

O score é calculado com base em pontos ponderados por fator:

**Horas de jogo:**

- Acima de 5h/dia: +30 pontos
- Entre 3h e 5h/dia: +15 pontos
- Entre 1h e 3h/dia: +5 pontos
- Até 1h/dia: 0 pontos

**Horas de estudo:**

- Menos de 4.5h ou mais de 8h: +25 pontos
- Entre 4.5h e 6h: +10 pontos
- Entre 6h e 8h: 0 pontos

**Horas de sono:**

- Menos de 6h ou mais de 9h: +20 pontos
- Entre 6h e 7h: +10 pontos
- Entre 7h e 9h: 0 pontos

**Desempenho acadêmico:**

- Ruim: +15 pontos
- Regular: +7 pontos
- Bom ou Excelente: 0 pontos

**Impacto dos jogos (percepção):**

- Sempre atrapalha: +15 pontos
- Frequentemente atrapalha: +8 pontos
- Outras opções: 0 pontos

**Isolamento social:**

- Muito isolado: +10 pontos
- Pouco isolado: +5 pontos
- Moderado ou alto: 0 pontos

**Nível de estresse:**

- 8 ou mais: +10 pontos
- 6 ou 7: +5 pontos
- Até 5: 0 pontos

O score final é limitado a um máximo de 100%.

### Recomendações Dinâmicas

As recomendações são geradas dinamicamente baseadas nos valores específicos do usuário:

- Recomendações críticas aparecem para valores muito acima ou abaixo do ideal
- Recomendações de atenção aparecem para valores moderadamente fora do ideal
- Apenas recomendações relevantes são mostradas

## Fluxo do Aplicativo

1. **Página Inicial** - Header com contexto do projeto
2. **Seção Quiz** - Progressão através das 7 perguntas com barra de progresso
3. **Navegação** - Botões "Voltar" e "Próxima" para navegar entre perguntas
4. **Resultado Final** - Apresentação do perfil, score visual, métricas e recomendações

## Recursos Principais

### Feedback em Tempo Real

- Exibição de valores atualizados enquanto o usuário ajusta sliders
- Aviso informativo sobre horas de jogo menores que 1h por dia
- Validação clara de qual fator está influenciando o resultado

### Visualização de Dados

- Barra de progresso visual (14% a 100%)
- Barra de score com código de cores (verde, amarelo, vermelho)
- Cards de métricas mostrando status de cada fator
- Ícones visuais para recomendações (ok, aviso, crítico)

### Experiência do Usuário

- Transições suaves entre perguntas
- Scroll automático para o topo do resultado
- Função "Refazer o quiz" para nova avaliação
- Interface acessível com labels e valores claros

## Dados e Contexto

As análises e correlações mencionadas no aplicativo são baseadas em pesquisa realizada com dados de 10.000+ estudantes, incluindo:

- Correlação de -0.55 entre horas de jogo excessivas e desempenho
- Correlação de +0.73 entre horas de estudo e desempenho
- Padrões de sono em estudantes de alto risco
- Efeitos de isolamento social no desempenho acadêmico

## Uso Local

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para funcionalidade completa)

### Como Executar

1. Salve os arquivos do projeto
2. Abra `Index.html` diretamente no navegador, ou
3. Serve os arquivos através de um servidor local:

```bash
python -m http.server 8000
# Acesse http://localhost:8000
```

## Estrutura de Dados

O aplicativo não utiliza banco de dados externo. Todos os dados são processados localmente no navegador do usuário:

- Valores dos sliders são armazenados em variáveis JavaScript
- Seleções de radio buttons são capturadas em um objeto `opts`
- Cálculos são realizados apenas quando o usuário clica em "Ver resultado"

## Customização

### Modificar Limites

Os limites e pesos do algoritmo podem ser ajustados na função `calcularScore()` em `Script.js`.

### Adicionar Mais Perguntas

1. Adicione um novo `<div class="step">` em HTML com ID sequencial
2. Aumente `totalSteps` em JavaScript
3. Adicione lógica de cálculo no algoritmo

### Alterar Temas de Cores

Os códigos de cor estão definidos em `Style.css` e podem ser modificados nos seletores CSS correspondentes (`.badge-green`, `.badge-amber`, `.badge-red`).

## Acessibilidade

O projeto implementa boas práticas de acessibilidade:

- Uso de labels associados a inputs
- Contraste adequado entre textos e fundos
- Responsividade em diferentes tamanhos de tela
- Semântica HTML apropriada

## Autores

Projeto desenvolvido por:

- Pedro H. Carvalho
- Pedro H. Santos
- Felipe Borges
- Victor Leôncio
- Jorge Eduardo
- Mateus Rebouças

## Instituição

Universidade UNIFACS - 2026/1
Disciplina: Análise de Dados e Big Data
Avaliação A3

## Suporte e Melhorias

Para sugestões ou melhorias, considere:

- Integrar com banco de dados para análise agregada
- Adicionar gráficos de histórico pessoal
- Implementar comparação com outros perfis
- Adicionar exportação de relatórios em PDF
- Internacionalização para outros idiomas

---

Última atualização: 2026-06-16
