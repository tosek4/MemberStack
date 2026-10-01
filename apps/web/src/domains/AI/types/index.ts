export interface AIAskRequest {
  question: string
}

export interface AIAskResponse {
  answer: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}
