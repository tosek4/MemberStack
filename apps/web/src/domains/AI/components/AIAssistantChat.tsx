import React, { FormEvent, useState } from 'react'

import { useAskAI } from '../hooks/useAskAI'
import { AIMessage } from '../types'
import { styles } from './AIAssistantChat.styled'

export const AIAssistantChat: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<AIMessage[]>([])
  const askAI = useAskAI()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || askAI.isPending) {
      return
    }

    const userMessage: AIMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmedQuestion,
    }

    setMessages((previous) => [...previous, userMessage])
    setQuestion('')

    try {
      const result = await askAI.mutateAsync(trimmedQuestion)

      const assistantMessage: AIMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: result.answer,
      }

      setMessages((previous) => [...previous, assistantMessage])
    } catch {
      // The error is displayed below the conversation.
    }
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MemberStack AI</h1>

        <p className={styles.subtitle}>
          Ask questions about your gym&apos;s memberships and attendance.
        </p>
      </header>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>How can I help you?</h2>

            <p className={styles.emptyDescription}>
              Ask a question to start a conversation.
            </p>

            <div className={styles.suggestions}>
              {[
                'How many memberships expire in the next 7 days?',
                'Give me today’s attendance summary.',
                'How many people checked in today?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuestion(suggestion)}
                  className={styles.suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageRow} ${
              message.role === 'user'
                ? styles.userMessage
                : styles.assistantMessage
            }`}
          >
            <div
              className={`${styles.message} ${
                message.role === 'user'
                  ? styles.userMessageContent
                  : styles.assistantMessageContent
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {askAI.isPending && (
          <div className={styles.loadingRow}>
            <div className={styles.loadingMessage}>
              MemberStack AI is thinking…
            </div>
          </div>
        )}

        {askAI.isError && (
          <div role="alert" className={styles.error}>
            Could not get a response. Please try again.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              event.currentTarget.form?.requestSubmit()
            }
          }}
          placeholder="Ask MemberStack AI..."
          rows={2}
          disabled={askAI.isPending}
          className={styles.textarea}
        />

        <button
          type="submit"
          disabled={!question.trim() || askAI.isPending}
          className={styles.sendButton}
        >
          {askAI.isPending ? 'Sending…' : 'Send'}
        </button>
      </form>
    </section>
  )
}
