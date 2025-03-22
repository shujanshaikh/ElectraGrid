"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

export default function AdminStations() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [price, setPrice] = useState("");
    const [powerOutput, setPowerOutput] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter()

    const postStations = async () => {
        const inputStations = {
            name,
            address,
            city,
            state,
            zipCode,
            price,
            powerOutput,
            status,
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.post(`${BACKEND_URL}/stations`, inputStations, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
        } catch (error) {
           console.log(error)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postStations();
    };

    const handleCLick = (e: React.FormEvent) => {
        e.preventDefault()
        router.push("/stations")
    }
    return (
        <div className="min-h-screen bg-black">

            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-green-500/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Zap className="w-6 h-6 text-green-500 animate-pulse group-hover:animate-none" />
                        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            EV Power
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/chat">
                            <Button variant="ghost" className="text-gray-400 hover:text-green-400 hover:bg-green-500/10">
                                Support Chat
                            </Button>
                        </Link>
                        <Button onClick={handleCLick} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-500/50">
                            View Stations
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] flex justify-center items-center">
                    EV STATION
                </h1>
                <div className="max-w-4xl mx-auto flex justify-center items-center p-5">
                    <Card className="w-[500px] backdrop-blur-md border-b border-green-500/20 ">
                        <CardHeader>
                            <CardTitle className="flex justify-center items-center">Create Stations</CardTitle>
                            <CardDescription className="flex justify-center items-center">
                                Add your EV Charging Station
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="zipCode">Zip Code</Label>
                                        <Input id="zipCode" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="price">Price</Label>
                                        <Input id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="powerOutput">Power Output</Label>
                                        <Input id="powerOutput" placeholder="Power Output" value={powerOutput} onChange={(e) => setPowerOutput(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 justify-center items-center">
                                        <Label htmlFor="status">STATUS</Label>
                                        <Select onValueChange={setStatus}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="AVAILABLE / UNAVAILABLE" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                                                <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <CardFooter className="flex justify-between mt-4">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!name || !address || !city || !state || !zipCode || !powerOutput || !price || !status}
                                    >
                                        Submit
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
