'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Zap, Car } from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PostVehicle() {
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [batteryCapacity, setBatteryCapacity] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

   const postVehicle = async () => {

    const input = {
      model,
      year,
      batteryCapacity
    }
    const token = localStorage.getItem("token")
    if (!token) {
       console.log("Error token not found")
    }
    const res = await axios.post(`${BACKEND_URL}/vehicle`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
    router.push("/vehicles")
    console.log(res.data)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postVehicle()
  };

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
            <Link href="/vehicles">
              <Button variant="ghost" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10">
                View Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-black/40 border-green-500/10">
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-6 h-6 text-green-400" />
              <h1 className="text-2xl font-bold text-white">Post Your Vehicle</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="Year"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <Input
                    type="number"
                    placeholder="Battery Capacity"
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-white"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className=" bg-green-500 hover:bg-green-600 text-white transition-colors"
              >
                Post Vehicle
              </Button>
            </form>
          </Card>
          <div className='p-10 top-100'>
               {showAlert && (
                            <Alert className="w-80 h-15 bg-black/50 z-70 bottom-0 left-1/2 -translate-x-1/2 text-green-400 hover:text-green-300 transition-colors ">
                                <AlertTitle className='justify-center flex items-center'>Success</AlertTitle>
                                <AlertDescription className='justify-center flex items-center'>New vehicle added successfully.</AlertDescription>
                            </Alert>
                        )}
               </div>
        </div>
      </main>
    </div>
  );
}