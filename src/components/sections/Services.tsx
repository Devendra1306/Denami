"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  BrainCircuit, 
  Mic, 
  Cloud, 
  Globe, 
  Smartphone, 
  Workflow, 
  Server
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored enterprise software solutions designed to solve your specific business challenges and scale with your growth.",
    icon: Code,
  },
  {
    title: "AI Solutions",
    description: "Integration of cutting-edge artificial intelligence to automate processes, generate insights, and enhance capabilities.",
    icon: BrainCircuit,
  },
  {
    title: "AI Voice Agents",
    description: "Intelligent conversational agents that handle customer service, sales, and support with natural voice interactions.",
    icon: Mic,
  },
  {
    title: "SaaS Platforms",
    description: "End-to-end development of robust, multi-tenant Software as a Service products from architecture to deployment.",
    icon: Cloud,
  },
  {
    title: "Web Applications",
    description: "High-performance, responsive web applications built with modern frameworks for exceptional user experiences.",
    icon: Globe,
  },
  {
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps that deliver seamless performance across iOS and Android devices.",
    icon: Smartphone,
  },
  {
    title: "Business Automation",
    description: "Streamline workflows and eliminate manual tasks with custom automation scripts and integration systems.",
    icon: Workflow,
  },
  {
    title: "Cloud Infrastructure",
    description: "Secure, scalable, and optimized cloud architectures on AWS, Azure, or GCP tailored for your applications.",
    icon: Server,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            What We Build
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Comprehensive technology solutions designed to accelerate your business and dominate your market.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
