'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Zap, Search, Battery, Car, Plus } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from "react";


interface Vehicle {
  id: string;
  model: string;
  year: string;
  batteryCapacity: string;
}

export default function Vehicles() {

  const [vehicle , setVehicle ] = useState<Vehicle[]>([])
  
    const fetchVehicle = async() => {
    const token = localStorage.getItem("token")
    await axios.get(`${BACKEND_URL}/vehicle`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((res) => {
        
        if(!token) {
          console.log("No token found")
          return
        }
        setVehicle(res.data.vehicles)
    }).catch((err) => {
        console.log(err.data)
    })
  }
  
  useEffect(() => {
    fetchVehicle()
}, [])

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-green-500/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-green-500 animate-pulse group-hover:animate-none" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              Eletra Grid
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/vehicles/new">
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50">
                <Plus className="w-4 h-4 mr-2" />
                Post Vehicle
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Car className="w-8 h-8 text-green-400" />
              Available Vehicles
            </h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search vehicles..."
                className="pl-10 bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
              />
            </div>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicle.map((vehicle) => (
              <Card key={vehicle.id} className="p-6 bg-black/40 border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {vehicle.model}
                  </h3>
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400">{vehicle.year}</div>
                      <div className="flex items-center text-green-400">
                        Battery
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-green-500/10">
                    <div className="text-2xl font-bold text-white">
                    <Battery className="w-4 h-4 mr-1" />
                     {String(vehicle.batteryCapacity)}
                    </div>
                    <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}