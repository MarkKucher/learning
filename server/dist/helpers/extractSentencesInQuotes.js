"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSentencesInQuotes = void 0;
const extractSentencesInQuotes = (inputString) => {
    const sentenceRegex = /"([^"]+)"/g;
    const sentences = [];
    let match;
    while ((match = sentenceRegex.exec(inputString))) {
        sentences.push(match[1]);
    }
    return sentences;
};
exports.extractSentencesInQuotes = extractSentencesInQuotes;
