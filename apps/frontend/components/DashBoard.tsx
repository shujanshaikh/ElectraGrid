"use client";

import { Button } from "./ui/button";
import Link from 'next/link'; 
import { BatteryCharging, MapPin, Shield, Zap, ChevronRight, Globe, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";

export default function DashBoard() {
   const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-foreground">
       <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-green-500/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-green-500 animate-pulse group-hover:animate-none" />
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300">Eletra Grid</span>
          </div>
          <div className="flex items-center gap-6">
            <Button onClick={() => router.push('/about')} variant="ghost" className="text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors" >About</Button>
            <Button onClick={() => router.push('/vehicles')} variant="ghost" className="text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors">Vehicle</Button>
            <Button onClick={() => router.push('/stations')} variant="ghost" className="text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors">Stations</Button>
            <Link href="/auth/signin">
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-green-950/20 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://cdn.coverr.co/videos/coverr-charging-an-electric-car-2766/1080p.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">Revolutionizing EV Charging</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              The Future of
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                Sustainable Mobility
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
              Experience seamless charging with our nationwide network of smart EV stations. 
              Fast, reliable, and 100% powered by renewable energy.
            </p>
            <div className="flex gap-4 items-center">
              <Link href="/stations">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-base px-8">
                  Find Stations
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-green-500/20 text-green-400 hover:bg-green-500/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-green-950/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Globe className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">Global Network</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Eletra Grid
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Join thousands of satisfied drivers who trust our charging network for their daily commute and long-distance travel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BatteryCharging className="w-10 h-10" />,
                title: "Ultra-Fast Charging",
                description: "Get back on the road in minutes with our advanced charging technology"
              },
              {
                icon: <MapPin className="w-10 h-10" />,
                title: "Extensive Coverage",
                description: "Access charging stations across major cities and highways"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Smart & Secure",
                description: "Enhanced security features protect your vehicle and data"
              }
            ].map((feature, index) => (
              <Card key={index} className="group p-8 bg-black/40 border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 rounded-full bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Power Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                Electric Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join our network today and experience the future of sustainable transportation.
              Download our app for real-time station availability and exclusive benefits.
            </p>
            <Link href="/auth/signin">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-12">
                Get Started Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-500" />
              <span className="text-xl font-semibold text-white">Eletra Grid</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-gray-400">© 2025 Eletra Grid. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
