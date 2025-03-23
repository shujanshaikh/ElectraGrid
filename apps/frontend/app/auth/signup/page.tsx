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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SignUp() {

    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const [showAlert, setShowAlert] = useState(false)



    const fetchData = async () => {
        const inputData = {
            email,
            password,
            role
        }

       const response = await axios.post(`${BACKEND_URL}/signup`, inputData)
       .then((res) => {
            if(!res.data){
                console.log("Error")
                return
            }
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
            router.push("/auth/signin")
            console.log(res.data)
        }).catch(error => {
            console.log(error)
            return
        })
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
                                placeholder="ADMIN/USER"
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
                <div className='p-10 top-100'>
               {showAlert && (
                            <Alert className="w-80 h-15 bg-black/50 z-70 bottom-0 left-1/2 -translate-x-1/2 text-green-400 hover:text-green-300 transition-colors ">
                                <AlertTitle className='justify-center flex items-center'>Success</AlertTitle>
                                <AlertDescription className='justify-center flex items-center'>You have successfully signed up.</AlertDescription>
                            </Alert>
                        )}
               </div>
            </div>
        </div>
    );
}