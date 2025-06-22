import React, { type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({ inputValue, onInputChange, onSubmit, isLoading }: ChatInputProps) {
  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={onSubmit} className="flex items-end gap-2 p-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Message AI Assistant..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[44px] resize-none rounded-2xl border-2 focus-visible:ring-primary/20 focus-visible:border-primary pr-12"
            disabled={isLoading}
            aria-label="Chat message input"
            autoComplete="off"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !inputValue.trim()} 
          aria-label="Send message"
          className="h-[44px] w-[44px] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Send size={18} />
        </Button>
      </form>
      {isLoading && (
        <div className="px-4 pb-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>AI Assistant is typing...</span>
          </div>
        </div>
      )}
    </div>
  );
}