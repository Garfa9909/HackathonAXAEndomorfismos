const API_KEY = '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';
const MODEL = 'llama3-8b-8192';
chatbot = false;

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// añadir mensajes al chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  
  // saltos linea mantener el formato
  const formattedContent = content.replace(/\n/g, '<br>');
  messageDiv.innerHTML = formattedContent;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// mostrar "escribiendo..."
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'bot-message');
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <span class="typing-indicator">
      <span>Asistente está escribiendo</span>
      <span class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </span>
    </span>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) {
    typingDiv.remove();
  }
}

// consultar a la API de Groq con Llama 3
async function queryLlama3(prompt) {
  try {
    showTypingIndicator();
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "Eres 'AXA Asistente', el chatbot oficial de AXA Seguros. Tu rol es:\
					  1. Responder consultas sobre productos de seguros (auto, hogar, vida, salud)\
					  2. Explicar coberturas, exclusiones y procesos de siniestros\
					  3. Proporcionar información general sin dar asesoramiento personalizado\
					  4. Usar un tono empático pero profesional\
					  \
					  Normas estrictas:\
					  - Nunca inventes información sobre precios o coberturas específicas\
					  - Para casos complejos, deriva a atención al cliente: atencion.clientes@axa.es - 900 909 014\
					  - Usa ejemplos claros cuando expliques conceptos\
					  - Destaca los valores de AXA: el cliente es lo primero, integridad, valentia y unidad\
					  \
					  Formato preferido:\
					  [Respuesta estructurada usa puntos si es complejo]\
					  [Máximo 4 párrafos]\
					  [Recomendación de acción si aplica]"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    hideTypingIndicator();
    
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Respuesta inesperada de la API");
    }
  } catch (error) {
    hideTypingIndicator();
    console.error("Error al consultar el chatbot:", error);
    return "Lo siento, hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde o contacta con nuestro servicio de atención al cliente.";
  }
}

// envio mensajes
async function handleSendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  
  // mensaje usuario
  addMessage(message, true);
  userInput.value = '';
  
  //respuesta del bot
  const botResponse = await queryLlama3(message);
  addMessage(botResponse);
}

sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
});

function botonChatbot()
{
  if(!chatbot)
  {
    mostrarChatbot();
  }

  else
  {
    ocultarChatbot();
  }
}

function mostrarChatbot()
{
  document.getElementById("chat-container").style.display = "block";
  chatbot = true;
}

function ocultarChatbot()
{
  document.getElementById("chat-container").style.display = "none";
  chatbot = false;
}