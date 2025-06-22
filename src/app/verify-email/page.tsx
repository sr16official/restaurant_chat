'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/constants";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Mail, RefreshCw, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const { user, refreshUser, resendVerificationEmail, signOut } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user?.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      await resendVerificationEmail();
      setEmailSent(true);
      setCountdown(60); // 60 second cooldown
    } catch (error: any) {
      setError('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    setError('');
    
    try {
      await refreshUser();
      if (user?.emailVerified) {
        router.push('/dashboard');
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
    } catch (error: any) {
      setError('Failed to refresh status. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification email to <strong>{user.email}</strong>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {emailSent && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Verification email sent! Please check your inbox and spam folder.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please check your email and click the verification link to activate your account.
              After verifying, click the refresh button below.
            </p>
            
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              <p className="font-medium mb-2">Didn&apos;t receive the email?</p>
              <ul className="space-y-1 text-left">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure {user.email} is correct</li>
                <li>• Wait a few minutes for the email to arrive</li>
                <li>• Click &quot;Resend Email&quot; if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={handleRefreshStatus}
            className="w-full"
            disabled={isRefreshing}
          >
            {isRefreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Checking...' : 'I\'ve Verified My Email'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleResendEmail}
            className="w-full"
            disabled={isResending || countdown > 0}
          >
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {countdown > 0 
              ? `Resend in ${countdown}s` 
              : isResending 
                ? 'Sending...' 
                : 'Resend Verification Email'
            }
          </Button>
          
          <div className="w-full pt-4 border-t">
            <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="w-full text-sm"
            >
              Sign out and use a different account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}