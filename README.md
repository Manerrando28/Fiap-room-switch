# CP2 - App de Gestão de Salas (Fiap Room Switch App)

## 👥 Integrantes do Grupo:
- Gabriel Guilherme Leste **RM558638**
- Gustavo Viega Martins Lopes **RM555885**
- Kaio Drago Lima Souza **RM556095**
- Vitor Rivas Cardoso **RM556404**

Turma: **3ESPH**



## 📌 Sobre o Projeto

O **Fiap Room Switch** é uma aplicação criada com o objetivo de simular e gerenciar o controle de ambientes (salas).
Este sistema tem como objetivo principal otimizar a **gestão da infraestrutura acadêmica da FIAP**, oferecendo uma solução inteligente para o controle de espaços físicos, apresentando:

- Automação de ambientes
- Controle de ocupação
- Simulação de dispositivos inteligentes (IoT)

O problema central que ele resolve é a dificuldade na organização e monitoramento das salas de aula e laboratórios. Através de uma interface intuitiva, a plataforma permite a **visualização em tempo real do status de cada ambiente**, classificando-os de forma clara entre "Livre", "Ocupada" ou "Em Manutenção".

Ao centralizar essas informações, a ferramenta não apenas simplifica a consulta rápida para alunos e colaboradores, mas também atua estrategicamente na eficiência operacional. Com um controle preciso da disponibilidade, torna-se possível otimizar a alocação dos espaços, reduzindo drasticamente os conflitos de agendamento e garantindo que os recursos da instituição sejam utilizados em sua capacidade máxima.

## 🚀 Tecnologias Utilizadas

- Java / Spring Boot *(ajusta aqui se estiver diferente)*
- REST API
- Maven
- Banco de dados (H2 / outro, se tiver)

## 🛠️ Funcionalidades Implementadas

- ✅ Cadastro de salas
- 🔄 Alternância de estado (ligado/desligado)
- 📊 Consulta de status das salas
- 🧩 Estrutura baseada em boas práticas (POO + APIs REST)

### Mais detalhadamente...
O sistema foi estruturado com foco em usabilidade e eficiência técnica, implementando recursos que garantem uma experiência de usuário intuitiva e um gerenciamento de dados robusto:

**Monitoramento Visual Dinâmico:** O núcleo da aplicação conta com uma listagem inteligente de salas, onde o status de disponibilidade é comunicado instantaneamente através de ícones visuais e indicadores de cor, facilitando a identificação imediata de ambientes prontos para uso ou em manutenção.

**Navegação Integrada e Fluida:** A arquitetura do sistema prioriza a agilidade, oferecendo uma navegação sem interrupções entre os módulos de Menu Principal, Visualização de Salas e o canal de Reportar Problemas, garantindo que o usuário encontre o que precisa com poucos cliques.

**Gerenciamento de Estado Centralizado:** No backend do front-end, a aplicação utiliza um contexto global (SalaContext). Essa tecnologia permite que as informações sobre o status das salas sejam sincronizadas em tempo real por toda a plataforma, assegurando a integridade dos dados e uma manutenção de código muito mais escalável.


## 💻 Como Rodar o Projeto?
### Pré-requisitos:
- Node.js (versão LTS);
- Expo CLI (ou usar npx expo);
- App Expo Go instalado no celular.


### Passo a passo:
**1.** `git clone https://github.com/Manerrando28/Fiap-room-switch.git`

**2.** `cd fiap-room-switch`

**3.** `npm install`

**4.** `npx expo start`

**5.** Escaneie o QR Code no Expo Go para rodar no celular.


## 📸 Printscreen's das Telas

### 1. Tela Inicial
<p align="center">
  <img src="https://github.com/user-attachments/assets/2dd2408b-5dcc-4c88-923a-a8a1608c88bc" width="300" />
</p>

### 2. Tela (Login)
<p align="center">
  <img src="https://github.com/user-attachments/assets/8bf3121d-4518-4631-907f-42c250c68800" width="300" />
</p>

### 3. Tela (Cadastro)
<p align="center">
  <img src="https://github.com/user-attachments/assets/c0bad0c9-a8bc-448f-8f28-2da2acf1f8da" width="300" />
</p>

### 4. Tela Menu
![menu_principal](https://github.com/user-attachments/assets/5b619c01-d2af-4f9c-bdbc-81be91b85f17)

### 5. Tela Salas
![tela_da_sala](https://github.com/user-attachments/assets/56c2ff36-c58e-4dc5-b106-92574369fb5b)

### 6. Tela Reportar
![tela_reportar](https://github.com/user-attachments/assets/cbbd2dfd-6127-418a-be1d-234db295282c)



## 🛠️Decisões Técnicas
### Expo Router
- Organiza a navegação com base em pastas (app/(tabs)), reconhecendo automaticamente as rotas.
- O `arquivo _layout.tsx` centraliza definição de rotas e títulos.

### **Context API (SalaContext)**
- Compartilha estado global das salas entre diferentes telas.
- Evita “prop drilling” e facilita manutenção.

### **Hooks utilizados**
- **`useContext:`** Para acessar dados do SalaContext.
- **`useState:`** Para estados locais.
- **`useEffect:`** Para inicialização e reações a mudanças.

### **Navegação organizada**
- Telas principais (index, menu, salas, reportar) dentro de (tabs).
- Navegação com `router.push() ou Link`.

### **Design e ícones**
- Uso de`@expo/vector-icons` (MaterialIcons/Ionicons).
- Cores para transmitir status: verde (Livre), amarelo (Ocupada), vermelho (Manutenção).
- Layout responsivo com Dimensions e estilos flexíveis.


## 📌 Conclusões Finais
O **Fiap Room Switch App** demonstra como a tecnologia pode transformar a gestão acadêmica. A escolha do Expo Router e da Context API garantiu um sistema fluido e escalável, entregando uma solução prática para o monitoramento de salas em tempo real e consolidando nosso aprendizado técnico em desenvolvimento mobile.

### ⚙️ Versões Anteriores

Video Rapido do Projeto
https://youtube.com/shorts/j4lzdEXkSJk?feature=share

### 1. Tela Inicial
![telaincial](https://github.com/user-attachments/assets/d20de10d-332e-47b2-b15b-b1ea38a1037c)

### 2. Tela Menu
![menu_principal](https://github.com/user-attachments/assets/3c3726d4-04e5-4cc2-9a00-c204e983b573)


### 3. Tela Salas
![tela_da_sala](https://github.com/user-attachments/assets/c2f0a00b-eb35-4a27-92f1-87d7946241ef)


### 4. Tela Reportar
![tela_reportar](https://github.com/user-attachments/assets/0bf64ada-4c63-4522-a204-ad66a15fb7cc)

*Link do vídeo do Youtube* (https://youtube.com/shorts/vMInhhiL7l8?si=QklPxMjBnzWfehp3).

### 🙏 Agradecimentos
Agradecemos à FIAP pela estrutura e aos professores pela orientação estratégica. Este projeto é o reflexo do conhecimento adquirido e do suporte oferecido pela instituição, fundamentais para nossa evolução como desenvolvedores.
