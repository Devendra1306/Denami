"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Mic, MicOff, Phone, PhoneOff, Loader2 } from "lucide-react";
import Script from "next/script";
import { useAuth } from '@/context/AuthContext';

// Replace with your actual ElevenLabs Agent ID
const ELEVENLABS_AGENT_ID = "YOUR_AGENT_ID_HERE";

export function DeviConsultant() {
  const { user } = useAuth();
  const [widgetReady, setWidgetReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="consultant" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/30 dark:bg-secondary/10 -z-10"></div>

      {/* Load ElevenLabs script once, globally */}
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="lazyOnload"
        onLoad={() => setWidgetReady(true)}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
          >
            <Bot size={16} />
            <span>AI Project Consultant</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Discuss Your Project With Devi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Speak directly with Devi, our AI Project Consultant, to discuss your
            project requirements, explore solutions, and receive immediate guidance.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto relative group"
        >
          {/* Glowing background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-card border border-border rounded-[2rem] p-8 flex flex-col items-center shadow-2xl">
            {/* Avatar */}
            <div className="relative mb-8">
              <div
                className={`absolute -inset-4 rounded-full blur-xl transition-all duration-700 ${
                  isOpen ? "bg-green-500/30 scale-110" : "bg-primary/10 animate-pulse"
                }`}
              ></div>
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden relative shadow-inner bg-secondary flex items-center justify-center">
                <Bot
                  size={64}
                  className={`transition-colors duration-500 ${
                    isOpen ? "text-green-400" : "text-primary"
                  }`}
                />
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-background rounded-full border border-border shadow-sm">
                <Sparkles size={20} className="text-blue-500" />
              </div>
            </div>

            {/* Status */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen ? "bg-green-400 animate-pulse" : "bg-green-500"
                  }`}
                ></span>
                <h3 className="text-xl font-bold text-foreground">
                  {isOpen ? "Devi is Listening..." : "Devi is Online"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isOpen
                  ? "Speak clearly — Devi is listening to you"
                  : "Click the button below to start a voice conversation"}
              </p>
            </div>

            {/* ElevenLabs Embedded Widget - hidden but functional */}
            <div className="w-full flex justify-center" id="elevenlabs-widget-container">
              {/* @ts-ignore */}
              <elevenlabs-convai
                agent-id={ELEVENLABS_AGENT_ID}
                dynamic-variables={JSON.stringify({
                  userId: user?.uid || "anonymous",
                })}
              >
                {/* @ts-ignore */}
              </elevenlabs-convai>
            </div>

            {/* Talk to Devi button */}
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsOpen(true)}
                  className="mt-4 w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mic size={20} />
                  Talk with Devi
                </motion.button>
              ) : (
                <motion.button
                  key="stop"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold py-4 px-8 rounded-2xl transition-all duration-300"
                >
                  <PhoneOff size={20} />
                  End Conversation
                </motion.button>
              )}
            </AnimatePresence>

            {/* Loading hint */}
            {!widgetReady && (
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                Loading voice agent...
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
