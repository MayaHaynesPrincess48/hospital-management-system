'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"

const ChatSection = () => {
  const { id: userId } = useParams()
  const [message, setMessage] = useState("")
  const router = useRouter()

  if (!userId) {
    return <div className="flex items-center justify-center h-full">User not found</div>
  }

  const handleSendMessage = () => {
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/chats')} className="sm:hidden">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to chat list</span>
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/assets/icons/circle-user.svg" alt={`User ${userId}`} />
            <AvatarFallback>{userId}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">Chat with User {userId}</h2>
        </div>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="rounded-lg bg-accent p-3 max-w-[70%]">
              <p className="text-sm">Hello, how are you?</p>
            </div>
          </div>
          <div className="flex items-end gap-2 justify-end">
            <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[70%]">
              <p className="text-sm">I&apos;m fine, thanks for asking!</p>
            </div>
          </div>
        </div>
      </ScrollArea>
      <footer className="border-t border-border p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Input 
            className="flex-1" 
            placeholder={`Message user ${userId}`} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default ChatSection