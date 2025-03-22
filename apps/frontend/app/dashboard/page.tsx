'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, MessageSquare, Car, MapPin, Users} from "lucide-react";
import Link from 'next/link';

export default function Dashboard() {

    const quickActions = [
        {
            title: "Find Stations",
            icon: MapPin,
            description: "Locate nearby charging stations",
            href: "/stations",
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "My Vehicles",
            icon: Car,
            description: "Manage your EV fleet",
            href: "/vehicles",
            color: "from-purple-500 to-pink-400"
        },
        {
            title: "Support Chat",
            icon: MessageSquare,
            description: "Get instant assistance",
            href: "/chat",
            color: "from-orange-500 to-yellow-400"
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-green-500/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Zap className="w-6 h-6 text-green-500 animate-pulse group-hover:animate-none" />
                        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            EV Power
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/profile">
                            <Button variant="ghost" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10">
                                <Users className="w-4 h-4 mr-2" />
                                Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-24 pb-12">

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome back, User</h1>
                    <p className="text-gray-400">Your sustainable journey continues. Here's your EV charging overview.</p>
                </div>


                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Card className="group h-full p-6 bg-black/40 border-green-500/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to right, ${action.color})` }} />
                                <div className="relative z-10">
                                    <div className="mb-4 p-3 bg-black/40 rounded-lg w-fit">
                                        <action.icon className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                                    <p className="text-gray-400">{action.description}</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}