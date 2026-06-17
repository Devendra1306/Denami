"use client";

import { db } from "@/lib/firebase/client";
import { collection, addDoc } from "firebase/firestore";

export default function TestPage() {

  const addData = async () => {
    try {
      await addDoc(collection(db, "users"), {
        name: "Devendra",
        email: "devendra@gmail.com"
      });
      alert("Data Added Successfully to Firestore!");
    } catch (e: any) {
      console.error(e);
      alert("Failed to add data: " + e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card border border-border p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-2">Firestore Test Portal</h1>
        <p className="text-muted-foreground mb-8">Click the button below to insert a test document into Firestore.</p>
        
        <button 
          onClick={addData}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          Add Test Data to Firestore
        </button>
      </div>
    </div>
  );
}
