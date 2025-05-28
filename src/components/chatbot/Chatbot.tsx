'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { RESTAURANT_CONTEXT, APP_NAME, type ChatMessage, type BookingState, type BookingField } from '@/constants';
import { chatbotTableBooking, type ChatbotTableBookingInput, type ChatbotTableBookingOutput } from '@/ai/flows/chatbot-table-booking';
import { answerRestaurantQuestion, type AnswerRestaurantQuestionInput, type AnswerRestaurantQuestionOutput } from '@/ai/flows/chatbot-contextual-answers';
import { useToast } from "@/hooks/use-toast";

const initialSystemMessage: ChatMessage = {
  id: 'system-initial',
  sender: 'system',
  text: `Hi! I'm ${APP_NAME}'s assistant. Ask me about the restaurant or type "book table" to make a reservation.`,
  timestamp: new Date(),
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialSystemMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<BookingState>('idle');
  const [bookingInfo, setBookingInfo] = useState<Partial<ChatbotTableBookingInput>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (sender: 'user' | 'bot' | 'system', text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender, text, timestamp: new Date() }]);
  };

  const handleUserSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue.trim();
    addMessage('user', userInput);
    setInputValue('');
    setIsLoading(true);

    try {
      if (userInput.toLowerCase() === 'cancel') {
        addMessage('system', 'Booking cancelled.');
        setChatState('idle');
        setBookingInfo({});
        setIsLoading(false);
        return;
      }

      switch (chatState) {
        case 'idle':
          if (userInput.toLowerCase().includes('book table') || userInput.toLowerCase().includes('reservation')) {
            setChatState('collectingName');
            addMessage('bot', "Sure, I can help with that! What's the name for the booking?");
          } else {
            const response: AnswerRestaurantQuestionOutput = await answerRestaurantQuestion({ question: userInput, context: RESTAURANT_CONTEXT });
            addMessage('bot', response.answer);
          }
          break;
        case 'collectingName':
          setBookingInfo(prev => ({ ...prev, customerName: userInput }));
          setChatState('collectingPhone');
          addMessage('bot', 'Got it. And a phone number?');
          break;
        case 'collectingPhone':
          setBookingInfo(prev => ({ ...prev, phoneNumber: userInput }));
          setChatState('collectingDate');
          addMessage('bot', 'Thanks! What date would you like to book for? (e.g., YYYY-MM-DD)');
          break;
        case 'collectingDate':
          // Basic date validation could be added here
          setBookingInfo(prev => ({ ...prev, date: userInput }));
          setChatState('collectingTime');
          addMessage('bot', "Perfect. And what time? (e.g., HH:MM in 24-hour format, like 19:30 for 7:30 PM)");
          break;
        case 'collectingTime':
          // Basic time validation could be added here
          setBookingInfo(prev => ({ ...prev, time: userInput }));
          setChatState('collectingPartySize');
          addMessage('bot', 'Great! How many people in your party?');
          break;
        case 'collectingPartySize':
          const partySize = parseInt(userInput, 10);
          if (isNaN(partySize) || partySize <= 0) {
            addMessage('bot', 'Please enter a valid number for the party size.');
          } else {
            setBookingInfo(prev => ({ ...prev, partySize }));
            setChatState('confirmingBooking');
            addMessage('bot', 'Alright, I have all the details. Let me confirm that for you...');
            
            const finalBookingInput = { ...bookingInfo, partySize, context: RESTAURANT_CONTEXT } as ChatbotTableBookingInput;
            // Ensure all fields are present
            if (finalBookingInput.customerName && finalBookingInput.phoneNumber && finalBookingInput.date && finalBookingInput.time && finalBookingInput.partySize) {
                const bookingResponse: ChatbotTableBookingOutput = await chatbotTableBooking(finalBookingInput);
                addMessage('bot', bookingResponse.confirmationMessage);
                if (bookingResponse.bookingDetails) {
                    addMessage('system', `Booking Details: ${bookingResponse.bookingDetails}`);
                }
                toast({
                    title: "Booking Processed",
                    description: bookingResponse.confirmationMessage,
                });
            } else {
                addMessage('bot', "Something went wrong gathering details. Let's start over. Type 'book table'.");
                setChatState('idle');
                setBookingInfo({});
            }
            setChatState('idle');
            setBookingInfo({});
          }
          break;
        default:
          addMessage('bot', "I'm not sure how to handle that right now. You can ask questions or type 'book table'.");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      addMessage('bot', 'Sorry, something went wrong. Please try again later.');
      toast({
        title: "Chatbot Error",
        description: "Could not process your request. Please try again.",
        variant: "destructive",
      });
      // Reset to idle state on error during booking collection to avoid getting stuck
      if (chatState !== 'idle') {
        setChatState('idle');
        setBookingInfo({});
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-xl z-50"
        aria-label="Open chatbot"
      >
        <MessageCircle size={32} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 flex flex-col h-[70vh] max-h-[600px] bg-background shadow-2xl rounded-lg">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-primary flex justify-between items-center">
              <span>{APP_NAME} Chat</span>
              <Button variant="ghost" size="icon" onClick={toggleChatbot} aria-label="Close chatbot">
                <X className="h-5 w-5" />
              </Button>
            </DialogTitle>
            <DialogDescription className="text-sm">
              Ask questions or book a table. Type 'cancel' anytime to stop booking.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-4 overflow-y-auto" ref={scrollAreaRef}>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </ScrollArea>
          
          <ChatInput 
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleUserSubmit}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
