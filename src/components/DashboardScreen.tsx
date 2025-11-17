import React, { useState, useEffect } from 'react';
import { Sun, Calendar as CalendarIcon, Calculator, BookOpen } from 'lucide-react';
import { AI_MODES } from '../lib/constants';
import type { AiMode, View, Persona } from '../lib/types';
import AgentPresence from './AgentPresence';

// Clock Widget Component
const ClockWidget: React.FC<{ isDesktop?: boolean }> = ({ isDesktop }) => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="dashboard-clock-widget">
            <p className="time">{formattedTime}</p>
            <p className="date">{formattedDate}</p>
        </div>
    );
};

// Weather Widget Component
const WeatherWidget: React.FC = () => {
    // Mock data
    return (
        <div className="dashboard-panel" style={{animationDelay: '100ms'}}>
            <h2 className="dashboard-panel-header">
                <Sun size={16} />
                <span>Weather</span>
            </h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold">28°C</p>
                    <p className="text-sm text-gray-300">Lagos, NG</p>
                </div>
                <Sun size={48} className="text-yellow-300 opacity-80 lucide-sun" />
            </div>
        </div>
    );
};

// Calendar Widget Component
const CalendarWidget: React.FC = () => {
    // Mock data
    const events = [
        { time: '11:00 AM', title: 'Project Phoenix Sync' },
        { time: '01:30 PM', title: 'Lunch with the Team' },
    ];

    return (
        <div className="dashboard-panel" style={{animationDelay: '200ms'}}>
            <h2 className="dashboard-panel-header">
                <CalendarIcon size={16} />
                <span>Today's Agenda</span>
            </h2>
            <div className="space-y-2">
                {events.map((event, index) => (
                     <div key={index} className="flex items-start gap-2 text-xs">
                        <span className="font-semibold text-cyan-300 w-20">{event.time}</span>
                        <p className="text-gray-200 flex-1">{event.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Dashboard Screen Component
const DashboardScreen: React.FC<{
    isDesktop: boolean;
    setView: (view: View) => void;
    setAiMode: (mode: AiMode) => void;
    persona: Persona;
    setPersona: (persona: Persona) => void;
}> = ({ isDesktop, setView, setAiMode, persona, setPersona }) => {
    
    if (isDesktop) {
        return (
            <div className="desktop-main-content">
                <div className="max-w-4xl w-full">
                    <ClockWidget isDesktop={isDesktop} />
                     <div className="dashboard-panels-container">
                        <WeatherWidget />
                        <CalendarWidget />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            <div className="mobile-dashboard-avatars">
                <AgentPresence 
                    view="dashboard" 
                    aiMode="default"
                    persona={persona} 
                    setPersona={setPersona}
                    hideControls 
                />
            </div>
            <ClockWidget />
            <div className="dashboard-panels-container mobile-side-by-side">
                <WeatherWidget />
                <CalendarWidget />
            </div>
        </div>
    );
};

export default DashboardScreen;