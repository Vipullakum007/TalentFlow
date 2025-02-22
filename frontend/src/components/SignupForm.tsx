import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, Briefcase, Users } from "lucide-react";
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';


interface SignupFormProps {
  onSuccess: () => void; // Callback to close the modal after successful signup
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Save the token to localStorage
      login(data.token);
      toast.success('Signup successful');
      onSuccess(); // Close the modal
      navigate('/'); // Redirect to the home page
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      setError(error instanceof Error ? error.message : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Join Our Freelance Community
          </CardTitle>
          <CardDescription className="text-center">
            Choose your path and start your journey today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={role === 'freelancer' ? 'default' : 'outline'}
              className="w-full h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => setRole('freelancer')}
            >
              <Briefcase className="h-6 w-6" />
              <div>Freelancer</div>
              <div className="text-xs font-normal">Offer your services</div>
            </Button>
            <Button
              type="button"
              variant={role === 'client' ? 'default' : 'outline'}
              className="w-full h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => setRole('client')}
            >
              <Users className="h-6 w-6" />
              <div>Client</div>
              <div className="text-xs font-normal">Hire talent</div>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <span className="flex justify-between">
                  Password
                  <span className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </span>
                </span>
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Button variant="link" className="h-auto p-0">Terms of Service</Button>
            {' '}and{' '}
            <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
          </p>
          {/* <p className="text-sm">
            Already have an account?{' '}
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupForm;