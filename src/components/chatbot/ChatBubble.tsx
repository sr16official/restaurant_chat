import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="text-center my-2">
        <p className="text-xs text-muted-foreground italic px-4 py-1 bg-secondary rounded-full inline-block">{message.text}</p>
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-start space-x-3 my-4", isUser ? "justify-end flex-row-reverse space-x-reverse" : "justify-start")}>
      {!isUser && (
        <div className="flex flex-col items-center space-y-1">
          <Avatar className="h-9 w-9 bg-primary text-primary-foreground ring-2 ring-primary/20">
            <AvatarFallback><Bot size={20} /></AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
        </div>
      )}
      <div className="flex flex-col max-w-[70%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed",
            isUser 
              ? "bg-primary text-primary-foreground rounded-br-md" 
              : "bg-card text-card-foreground rounded-bl-md border border-border/50"
          )}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className={cn(
          "text-xs mt-1 px-1", 
          isUser ? "text-muted-foreground text-right" : "text-muted-foreground text-left"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <div className="flex flex-col items-center space-y-1">
          <Avatar className="h-9 w-9 bg-accent text-accent-foreground ring-2 ring-accent/20">
            <AvatarFallback><User size={20} /></AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">You</span>
        </div>
      )}
    </div>
  );
}