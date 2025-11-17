import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Volume2, HelpCircle, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { AI_MODES } from '@/src/lib/constants';
import type { AiMode, View, Persona, CallState } from '@/src/lib/types';

interface TaskbarProps {
    persona: Persona;
}

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="text-right">
            <div className="text-sm">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
            <div className="text-xs text-gray-400">{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
        </div>
    );
};

const Taskbar: React.FC<TaskbarProps> = ({ persona }) => {
    return (
        <footer className="taskbar">
            {/* System Tray */}
            <div className="system-tray">
                <Wifi size={18} />
                <Volume2 size={18} />
                <Clock />
            </div>
        </footer>
    );
};

export default Taskbar;