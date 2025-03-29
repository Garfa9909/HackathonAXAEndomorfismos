const API_KEY = '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';
const MODEL = 'llama3-8b-8192';

// Elementos del DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Función para añadir mensajes al chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  
  // Convertir saltos de línea en <br> para mantener el formato
  const formattedContent = content.replace(/\n/g, '<br>');
  messageDiv.innerHTML = formattedContent;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para mostrar "escribiendo..."
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

// Función para ocultar "escribiendo..."
function hideTypingIndicator() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) {
    typingDiv.remove();
  }
}

// Función para consultar a la API de Groq con Llama 3
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
            content: "Eres un asistente virtual especializado en seguros para AXA. Responde preguntas sobre pólizas, coberturas, siniestros, renovaciones y otros temas relacionados con seguros de manera clara, profesional y concisa. Si no estás seguro de alguna información, recomienda contactar con un agente de seguros. Usa un tono amable y profesional."
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

// Manejar el envío de mensajes
async function handleSendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  
  // Añadir mensaje del usuario
  addMessage(message, true);
  userInput.value = '';
  
  // Obtener y mostrar respuesta del bot
  const botResponse = await queryLlama3(message);
  addMessage(botResponse);
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
});