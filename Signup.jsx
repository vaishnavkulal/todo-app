import React, { useState } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:6969/user/signup", {
                name,
                email,
                password,
            });
            console.log("Response:", response.data);
            alert("Signup Successful!");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Error signing up.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-fit max-w-sm mx-auto mt-50">
            <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                    Enter your name, email, and password to create an account.
                </CardDescription>
                {/* If you want a login action link, you can put it here */}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignup}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <CardFooter className="flex-col gap-2 mt-6 px-0">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}

export default Signup;
