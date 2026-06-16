"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "AI Voice Agent Platform",
    category: "AI Solutions",
    challenge: "A national call center struggled with high wait times and staffing shortages during peak hours.",
    solution: "Developed an autonomous AI voice agent capable of handling 10,000+ concurrent calls with natural human-like latency.",
    tech: ["Python", "WebRTC", "ElevenLabs", "FastAPI"],
    outcome: "Reduced average wait time by 85% and saved $1.2M annually in operational costs.",
  },
  {
    title: "Healthcare Management System",
    category: "Custom Software",
    challenge: "A clinic network relied on fragmented legacy systems causing data silos and scheduling conflicts.",
    solution: "Built a unified HIPAA-compliant management platform integrating patient records, billing, and telehealth.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    outcome: "Increased patient throughput by 30% and eliminated duplicate data entry.",
  },
  {
    title: "SaaS Analytics Dashboard",
    category: "Web Application",
    challenge: "Marketing agency needed a white-labeled reporting tool to aggregate cross-platform ad performance.",
    solution: "Created a high-performance dashboard with real-time data ingestion and custom chart visualizations.",
    tech: ["React", "TypeScript", "ClickHouse", "GraphQL"],
    outcome: "Onboarded 50+ enterprise clients within 3 months, generating new recurring revenue.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-card border-y border-border relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Explore how we've helped enterprises transform their operations and scale their businesses through custom technology.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group flex flex-col bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-secondary/50 relative overflow-hidden flex items-center justify-center border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary/20 transition-colors duration-500 px-6 text-center">
                  {project.title.toUpperCase()}
                </h3>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {project.category}
                  </Badge>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-foreground">{project.title}</h3>
                
                <div className="space-y-4 mb-8 flex-1">
                  <div>
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Challenge:</span>
                    <p className="text-sm text-muted-foreground mt-1">{project.challenge}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Solution:</span>
                    <p className="text-sm text-muted-foreground mt-1">{project.solution}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Outcome:</span>
                    <p className="text-sm font-medium text-primary mt-1">{project.outcome}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
