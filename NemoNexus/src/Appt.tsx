import { useState } from 'react';
import { TerminalWindow } from '@/components/TerminalWindow';
import { ResearchTab } from '@/components/ResearchTab';
import { TaskScheduler } from '@/components/TaskScheduler';
import { StatusBar, SystemMetrics, StatusDot } from '@/components/StatusIndicators';
import type { TabId } from '@/types';
import { Terminal, Globe, CalendarClock, Cpu } from 'lucide-react';

const TABS: { id: TabId; label: string; icon: typeof Terminal }[] = [
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'research', label: 'Research', icon: Globe },
    { id: 'tasks', label: 'Tasks', icon: CalendarClock },
];

export default function App() {
    const [activeTab, setActiveTab] = useState<TabId>('terminal');

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200">
            {/* Ambient glow background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-nvidia-green/5 blur-[120px]" />
                <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-nvidia-green/3 blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-nvidia-green/4 blur-[100px]" />
            </div>

            {/* Grid overlay */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(118, 255, 122, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(118, 255, 122, 1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-nvidia-green/30 bg-nvidia-green/10">
                                    <Cpu className="h-5 w-5 text-nvidia-green" />
                                </div>
                                <div className="absolute inset-0 rounded-lg border border-nvidia-green/20 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-nvidia-green">
                                    NemoNexus
                                </h1>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                                    Neural Operations Nexus
                                </p>
                            </div>
                        </div>
                        <StatusBar />
                    </div>
                </header>

                {/* Main grid layout */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* Left sidebar — metrics */}
                    <aside className="lg:col-span-3">
                        <div className="space-y-4">
                            <SystemMetrics />

                            <div className="rounded-xl border border-nvidia-green/15 bg-black/50 p-4 backdrop-blur-sm">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-nvidia-green shadow-[0_0_6px_rgba(118,255,122,0.6)]" />
                                    <span className="text-xs font-mono font-semibold uppercase tracking-widest text-nvidia-green/80">
                                        Active Modules
                                    </span>
                                </div>
                                <div className="space-y-2.5">
                                    <StatusDot label="Core Engine" active />
                                    <StatusDot label="Neural Network" active />
                                    <StatusDot label="Research Engine" active />
                                    <StatusDot label="Task Scheduler" active />
                                    <StatusDot label="Security Layer" active />
                                    <StatusDot label="Data Pipeline" active />
                                </div>
                            </div>

                            <div className="rounded-xl border border-nvidia-green/15 bg-black/50 p-4 backdrop-blur-sm">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-nvidia-green shadow-[0_0_6px_rgba(118,255,122,0.6)]" />
                                    <span className="text-xs font-mono font-semibold uppercase tracking-widest text-nvidia-green/80">
                                        Neural Nodes
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-1 rounded-lg border border-nvidia-green/15 bg-black/40 p-2"
                                        >
                                            <div
                                                className="h-2 w-2 rounded-full bg-nvidia-green"
                                                style={{
                                                    boxShadow: '0 0 6px rgba(118, 255, 122, 0.6)',
                                                    animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
                                                }}
                                            />
                                            <span className="text-[8px] font-mono text-nvidia-green/50">N{i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main content — tabs */}
                    <main className="lg:col-span-9">
                        <div className="mb-3 flex items-center gap-1 rounded-xl border border-nvidia-green/15 bg-black/50 p-1 backdrop-blur-sm">
                            {TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${isActive
                                                ? 'bg-nvidia-green/10 text-nvidia-green'
                                                : 'text-gray-600 hover:text-nvidia-green/60'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {tab.label}
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-lg border border-nvidia-green/30 shadow-[0_0_15px_rgba(118,255,122,0.1)]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="h-[calc(100vh-280px)] min-h-[500px]">
                            {activeTab === 'terminal' && <TerminalWindow />}
                            {activeTab === 'research' && <ResearchTab />}
                            {activeTab === 'tasks' && <TaskScheduler />}
                        </div>
                    </main>
                </div>

                <footer className="mt-4 flex items-center justify-between rounded-lg border border-nvidia-green/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
                    <span className="text-[10px] font-mono text-gray-700">
                        NemoNexus Systems © 2026 — All neural operations nominal
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-nvidia-green/40">QUANTUM-READY</span>
                        <div className="h-1 w-1 rounded-full bg-nvidia-green/60" />
                        <span className="text-[10px] font-mono text-nvidia-green/40">AES-256</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
