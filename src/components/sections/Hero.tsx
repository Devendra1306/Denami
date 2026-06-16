"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Code2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-background overflow-hidden -z-10">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[120px] opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-secondary/10 blur-[100px] opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-secondary-foreground font-medium text-sm mb-6 border border-secondary"
            >
              <Sparkles size={16} className="text-primary" />
              <span>Enterprise Software Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6"
            >
              Transforming Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400 text-glow">Intelligent</span> Digital Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl"
            >
              We design, develop, and deliver custom software, AI systems, SaaS platforms, mobile applications, and business automation solutions tailored to your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="#contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 h-14 px-8 w-full sm:w-auto text-base rounded-full shadow-xl shadow-primary/20 font-medium transition-colors">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#consultant" className="inline-flex items-center justify-center border border-border bg-background hover:bg-muted hover:text-foreground h-14 px-8 w-full sm:w-auto text-base rounded-full font-medium transition-colors">
                  <Bot className="mr-2 h-5 w-5 text-primary" />
                  Talk With Devi
              </Link>
            </motion.div>
          </div>

          {/* Hero Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
            {/* Dashboard Mockup */}
            <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 h-full flex flex-col gap-6 bg-grid-white/[0.02]">
                <div className="flex gap-4">
                  <div className="w-full h-32 rounded-xl bg-secondary/50 border border-border animate-pulse"></div>
                  <div className="w-full h-32 rounded-xl bg-secondary/50 border border-border animate-pulse delay-75"></div>
                </div>
                <div className="w-full flex-1 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10"></div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 glass p-4 rounded-xl flex items-center gap-4"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Code2 size={24} />
              </div>
              <div>
                <p className="font-semibold text-sm">Clean Architecture</p>
                <p className="text-xs text-muted-foreground">Scalable Systems</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-1/4 glass p-4 rounded-xl flex items-center gap-4"
            >
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Zap size={24} />
              </div>
              <div>
                <p className="font-semibold text-sm">AI Integrated</p>
                <p className="text-xs text-muted-foreground">Smart Solutions</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
