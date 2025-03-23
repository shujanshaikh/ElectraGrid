"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Zap, Search, MapPin, Battery, BatteryCharging } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Station {
  id : string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  status: string;
  powerOutput: string;
}

export default function Stations() {
  const [stations, setStations] = useState<Station[]>([]);

  const fetchStations = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/stations`);
      console.log("API Response:", res.data); 

      setStations(res.data.stations);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchStations();
  }, []); 

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
            <Link href="/admin/stations">
              <Button  variant="ghost" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10">
                Add Station
              </Button>
            </Link>
            <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50">
              Account
            </Button>
          </div>
        </div>
      </nav>

      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Charging Stations</h1>

         
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search stations by location..." className="pl-10 bg-black/40 border-green-500/20 focus:border-green-500/50 text-white" />
          </div>

          
        


         
          <div className="space-y-4">
            {stations.map((station) => (
              <Card key={station.id} className="p-6 bg-black/40 border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{station.name}</h3>
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {station.address}, {station.city} <br /> Zip Code: {JSON.stringify(station.zipCode)}
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center text-green-400">
                        <Battery className="w-4 h-4 mr-2" />
                        {String(station.status)} at {String(station.city)}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <BatteryCharging className="w-4 h-4 mr-2" />
                        {JSON.stringify(station.powerOutput)} kWh
                      </div>
                    </div>
                  </div>
                  <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50">
                    Navigate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
