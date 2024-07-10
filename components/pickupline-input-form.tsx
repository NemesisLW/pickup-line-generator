"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/sign-out-button";

function PickupLineInputForm() {
  const [crush, setCrush] = useState("");
  const [style, setStyle] = useState("funny");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log({ crush, style });
    // For now, we'll just simulate a redirect
    redirect("/result");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white p-4">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600 font-pacifico">
            Pickup Line Generator
          </h1>
          <SignOutButton />
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="crush"
              className="block text-lg font-medium text-pink-700 mb-2"
            >
              Tell us about your crush
            </label>
            <textarea
              id="crush"
              value={crush}
              onChange={(e) => setCrush(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows={4}
              placeholder="What makes them special?"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="style"
              className="block text-lg font-medium text-pink-700 mb-2"
            >
              Style
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="funny">Funny</option>
              <option value="romantic">Romantic</option>
              <option value="cheesy">Cheesy</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors"
          >
            ♥ Generate for me ♥
          </button>
        </form>
      </div>
    </div>
  );
}

export default PickupLineInputForm;
