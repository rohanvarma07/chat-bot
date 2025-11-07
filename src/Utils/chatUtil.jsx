export const getRandomResponse = () => {
    const botResponses = [
        "I understand. Could you please provide more details?",
        "That's interesting! Tell me more.",
        "I'm here to help. What else would you like to discuss?",
        "Can you elaborate on that?",
        "How does that make you feel?",
        "What are your thoughts on this?",
        "Let's explore that further.",
        "Could you clarify what you mean?",
        "That's a great point!",
        "I'm glad you brought that up."
    ];
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

export const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}