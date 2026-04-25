export const electionProcessSteps = [
  {
    id: 1,
    title: "Voter Registration",
    description: "Citizens must register to vote. This involves verifying eligibility such as age and citizenship.",
    timeline: "Months prior to Election Day",
    icon: "📝"
  },
  {
    id: 2,
    title: "Campaigning",
    description: "Candidates hold rallies, debates, and public appearances to present their platforms and win voter support.",
    timeline: "Weeks or months leading up",
    icon: "📣"
  },
  {
    id: 3,
    title: "Election Day (Voting)",
    description: "Registered voters cast their ballots at designated polling stations or via mail-in voting.",
    timeline: "Official Election Date",
    icon: "🗳️"
  },
  {
    id: 4,
    title: "Ballot Counting",
    description: "Votes are counted manually or electronically under the supervision of election officials.",
    timeline: "Starts immediately after polls close",
    icon: "📊"
  },
  {
    id: 5,
    title: "Declaration of Results",
    description: "The official winner is announced based on the highest number of valid votes and electoral rules.",
    timeline: "Within days or weeks",
    icon: "🏆"
  }
];

export const quickQuestions = [
  "How do I register to vote?",
  "What are the key dates?",
  "Draw a timeline of the election process",
  "When are results declared?"
];

// Simple chatbot simulation
export const generateBotResponse = (query, language = 'en-US') => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("register") || lowerQuery.includes("registration")) {
    return "Voter Registration is the first crucial step. Citizens must verify their eligibility (e.g., age 18+, citizenship) and register through official government portals. Ensure you do this well before the deadline!";
  }
  if (lowerQuery.includes("date") || lowerQuery.includes("timeline") || lowerQuery.includes("when")) {
    return "The exact dates vary by region, but generally: Registration ends a few weeks prior, campaigning happens leading up to the day, Election Day is the central event, and result declarations follow within days of voting.";
  }
  if (lowerQuery.includes("campaign")) {
    return "During campaigning, candidates hold rallies, participate in debates, and publish manifestos. It's the period intended for voters to learn about the platforms of different candidates.";
  }
  if (lowerQuery.includes("result") || lowerQuery.includes("win")) {
    return "Ballot counting begins immediately after polls close. Results are declared by the official electoral commission once a candidate mathematically secures the required majority or plurality.";
  }
  if (lowerQuery.includes("vote") || lowerQuery.includes("voting")) {
    return "On Election Day, registered voters head to polling stations to cast their ballots. Many regions also offer early voting or mail-in voting options to ensure maximum participation.";
  }
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
    return "Hello! I am your AI Assistant. You can ask me about anything! How can I help you today?";
  }
  if (lowerQuery.includes("diagram") || lowerQuery.includes("timeline") || lowerQuery.includes("flowchart")) {
    return `Here is a visual timeline of the election process:
\`\`\`mermaid
graph TD
    A["Voter Registration"] --> B["Campaigning Phase"]
    B --> C["Election Day Voting"]
    C --> D["Ballot Counting"]
    D --> E["Declaration of Results"]
\`\`\``;
  }
  
  const fallbackTranslations = {
    'en-US': 'I am currently running in fallback mode without a valid API key, so I can only answer predefined questions. Please add a valid Gemini API key to your `.env` file so I can answer your specific question!',
    'es-ES': 'Estoy funcionando en modo de reserva sin una clave API válida, por lo que solo puedo responder preguntas predefinidas. ¡Agregue una clave API de Gemini válida!',
    'fr-FR': 'Je fonctionne actuellement en mode de secours sans clé API valide. Veuillez ajouter une clé API Gemini valide!',
    'de-DE': 'Ich laufe im Fallback-Modus ohne gültigen API-Schlüssel. Bitte fügen Sie einen gültigen Gemini-API-Schlüssel hinzu!',
    'hi-IN': 'मैं वर्तमान में वैध API कुंजी के बिना फ़ॉलबैक मोड में चल रहा हूँ। कृपया एक वैध जेमिनी एपीआई कुंजी जोड़ें!',
    'zh-CN': '我目前在没有有效 API 密钥的后备模式下运行。请添加有效的 Gemini API 密钥！',
    'ja-JP': '現在、有効なAPIキーなしのフォールバックモードで実行されています。有効なGemini APIキーを追加してください！'
  };

  return fallbackTranslations[language] || fallbackTranslations['en-US'];
};
