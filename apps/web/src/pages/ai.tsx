import { AIAssistantChat } from '@/domains/AI/components/AIAssistantChat'
import React from 'react'

const AIPage: React.FC = () => {
  return (
    <main className="mx-auto w-full max-w-5xl p-4 md:p-6">
      <AIAssistantChat />
    </main>
  )
}

export default AIPage
