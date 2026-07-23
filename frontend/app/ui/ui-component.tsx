import { useState } from "react";
import { Knob } from "~/components/knob/knob";
import './ui-component-style.css';

interface UiComponentProps {
    delayTime: number;
    onDelayTimeChange: (value: number) => void;
};

export const UiComponent = (props: UiComponentProps) => {
    const [feedback, setFeedback] = useState(0.5);
    // const [delayTime, setDelayTime] = useState(0.5);
    const [mix, setMix] = useState(0.5);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-800 via-stone-900 to-black p-8">
            <div className="plugin-shadow bg-gradient-to-b from-amber-50 to-amber-100 rounded-3xl p-12 relative overflow-hidden"
                style={{ 
                    width: '600px',
                    background: 'linear-gradient(135deg, #d8d8d8 0%, #dbd9d7 50%, #bbb8b5 100%)'
                }}>
                
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '200px 200px'
                    }} />

                {/* Header */}
                <div className="relative z-10 mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl font-bold tracking-tighter" 
                            style={{ 
                            fontFamily: "'JetBrains Mono', monospace",
                            color: '#282a2c',
                            textShadow: '2px 2px 0px rgba(255, 255, 255, 0.3)'
                            }}>
                        Delaysito
                        </h1>
                        <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full pulse-glow" />
                        <span className="text-xs tracking-widest opacity-60" style={{ color: '#2e2e2e' }}>
                            ACTIVE
                        </span>
                        </div>
                    </div>
                </div>

                {/* Knobs Container */}
                <div className="relative z-10 flex justify-between items-center gap-8 mb-8">
                <Knob 
                    label="DELAY TIME" 
                    value={props.delayTime} 
                    onChange={props.onDelayTimeChange}
                    unit="ms"
                    minValue={0}
                    maxValue={2000}
                    color="#526574"
                />
                <Knob 
                    label="FEEDBACK" 
                    value={feedback} 
                    onChange={setFeedback}
                    unit="%"
                    minValue={0}
                    maxValue={100}
                    color="#34dfd0"
                />
                <Knob 
                    label="MIX" 
                    value={mix} 
                    onChange={setMix}
                    unit="%"
                    minValue={0}
                    maxValue={100}
                    color="#34dfd0"
                />
                </div>

                {/* Bottom decorative line */}
                <div className="relative z-10">
                    <div className="mt-4 flex justify-center">
                        <div className="text-xs tracking-[0.3em] opacity-40" style={{ color: '#376c74' }}>
                            True Bypass
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
