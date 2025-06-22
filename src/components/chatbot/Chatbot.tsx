'use client';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { RESTAURANT_CONTEXT, APP_NAME, type ChatMessage, type BookingState } from '@/constants';
import { useToast } from "@/hooks/use-toast";

interface BookingInfo {
  customerName?: string;
  phoneNumber?: string;
  date?: string;
  time?: string;
  partySize?: number;
}

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
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [botTyping, setBotTyping] = useState(false);

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
    setMessages((prev) => [...prev, { id:uuidv4(), sender, text, timestamp: new Date() }]);
  };

  const answerRestaurantQuestion = async (question: string): Promise<string> => {
    try {
      const response = await fetch('/api/restaurant-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          context: RESTAURANT_CONTEXT,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Error getting restaurant answer:', error);
      return "I'm sorry, I'm having trouble answering your question right now. Please contact us directly at (123) 456-7890 for assistance.";
    }
  };

  const processTableBooking = async (bookingData: Required<BookingInfo>) => {
    try {
      const response = await fetch('/api/table-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          context: RESTAURANT_CONTEXT,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process booking');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error processing booking:', error);
      return {
        confirmationMessage: "Sorry, there was an issue processing your booking. Please call us directly at (123) 456-7890 to make your reservation.",
        bookingDetails: null,
        bookingId: null,
      };
    }
  };

  const handleUserSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue.trim();
    addMessage('user', userInput);
    setInputValue('');
    setIsLoading(true);
    setChatState('idle'); 
    setBookingInfo({});
    
    try {
      if (userInput.toLowerCase() === 'cancel') {
        addMessage('system', 'Booking cancelled.');
        setChatState('idle');
        setBookingInfo({});
        setIsLoading(false);
        setBotTyping(false);
        return;
      }

      switch (chatState) {
        case 'idle':
          if (userInput.toLowerCase().includes('book table') || userInput.toLowerCase().includes('reservation')) {
            setChatState('collectingName');
            addMessage('bot', "Sure, I can help with that! What's the name for the booking?");
            setBotTyping(false); 
          } else {
            setBotTyping(true);
            const answer = await answerRestaurantQuestion(userInput);
            addMessage('bot', answer);
            setBotTyping(false); 
          }
          break;

        case 'collectingName':
          setBookingInfo(prev => ({ ...prev, customerName: userInput }));
          setChatState('collectingPhone');
          addMessage('bot', 'Got it. And a phone number?');
          setBotTyping(false); 
          break;

        case 'collectingPhone':
          setBookingInfo(prev => ({ ...prev, phoneNumber: userInput }));
          setChatState('collectingDate');
          addMessage('bot', 'Thanks! What date would you like to book for? (e.g., YYYY-MM-DD)');
          setBotTyping(false); 
          break;

        case 'collectingDate':
          setBookingInfo(prev => ({ ...prev, date: userInput }));
          setChatState('collectingTime');
          
          addMessage('bot', "Perfect. And what time? (e.g.,7:30 PM)");
          setBotTyping(false); 
          break;

        case 'collectingTime':
          setBookingInfo(prev => ({ ...prev, time: userInput }));
          setChatState('collectingPartySize');
          addMessage('bot', 'Great! How many people in your party?');
          setBotTyping(false); 
          break;

        case 'collectingPartySize':
          const partySize = parseInt(userInput, 10);
          if (isNaN(partySize) || partySize <= 0) {
            addMessage('bot', 'Please enter a valid number for the party size.');
            setBotTyping(false); 
          } else {
            const finalBookingInfo = { ...bookingInfo, partySize };
            
            if (finalBookingInfo.customerName && finalBookingInfo.phoneNumber && 
                finalBookingInfo.date && finalBookingInfo.time && finalBookingInfo.partySize) {
              
              addMessage('bot', 'Alright, I have all the details. Let me confirm that for you...');
              setBotTyping(true);
              const bookingResponse = await processTableBooking(finalBookingInfo as Required<BookingInfo>);
              addMessage('bot', bookingResponse.confirmationMessage);
              
              if (bookingResponse.bookingDetails) {
                addMessage('system', `Booking Details: ${bookingResponse.bookingDetails}`);
              }
              
              toast({
                title: "Booking Processed",
                description: bookingResponse.confirmationMessage,
              });
              setBotTyping(false); 
            } else {
              addMessage('bot', "Something went wrong gathering details. Let's start over. Type 'book table'.");
              setBotTyping(false); 
            }
            
            setChatState('idle');
            setBookingInfo({});
          }
          break;

        default:
          addMessage('bot', "I'm not sure how to handle that right now. You can ask questions or type 'book table'.");
          setBotTyping(false); 
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      addMessage('bot', 'Sorry, something went wrong. Please try again later.');
      toast({
        title: "Chatbot Error",
        description: "Could not process your request. Please try again.",
        variant: "destructive",
      });
      setBotTyping(false);
      if (chatState !== 'idle') {
        setChatState('idle');
        setBookingInfo({});
        setBotTyping(false); 
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
            {botTyping && (
              <div className="flex items-center mb-2">
                <div className="bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground animate-pulse">
                  is typing...
                </div>
              </div>
            )}
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