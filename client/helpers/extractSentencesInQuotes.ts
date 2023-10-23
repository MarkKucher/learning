export const extractSentencesInQuotes = (inputString: string) => {
    const sentenceRegex = /"([^"]+)"/g;
    const sentences = [];
    let match;
    while ((match = sentenceRegex.exec(inputString))) {
        sentences.push(match[1]);
    }
    return sentences;
};