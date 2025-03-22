'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/config';

export default function SignUp() {

    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')



    const fetchData = async () => {
        const inputData = {
            email,
            password,
            role
        }

        await axios.post(`${BACKEND_URL}/signup`, inputData).then((res) => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
        router.push("/auth/signin")
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData()
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <Zap className="w-8 h-8 text-green-500 animate-pulse group-hover:animate-none" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            Eletra Grid
                        </span>
                    </Link>
                </div>

                <Card className="p-6 bg-black/40 border-green-500/10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Create your account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="role"
                                placeholder="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/auth/signin" className="text-green-400 hover:text-green-300 transition-colors">
                            Sign In
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}