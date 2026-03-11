import { useEffect, useRef, useState } from "react";

export interface KnobProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
    unit: string;
    minValue: number;
    maxValue: number;
    color: string;
}

export const Knob = ({ label, value, onChange, unit, minValue, maxValue, color }: KnobProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartValue = useRef(0);
  const knobRef = useRef(null);

  const rotation = (value * 270) - 135; // -135° to +135°
  const displayValue = Math.round(value * (maxValue - minValue) + minValue);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartValue.current = value;
    e.preventDefault();
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    
    const deltaY = dragStartY.current - e.clientY;
    const sensitivity = 0.005;
    let newValue = dragStartValue.current + (deltaY * sensitivity);
    newValue = Math.max(0, Math.min(1, newValue));
    
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Knob */}
      <div 
        ref={knobRef}
        className="relative cursor-ns-resize select-none knob-shadow"
        onMouseDown={handleMouseDown}
        style={{ 
          width: '120px', 
          height: '120px',
          cursor: isDragging ? 'grabbing' : 'ns-resize'
        }}
      >
        {/* Knob base */}
        <div 
          className="absolute inset-0 rounded-full transition-transform"
          // style={{
          //   background: `conic-gradient(from 0deg at 50% 50%, 
          //     ${color} 0deg,
          //     #1c647a 45deg,
          //     ${color} 90deg,
          //     #153c6e 135deg,
          //     ${color} 180deg,
          //     #148088 225deg,
          //     ${color} 270deg,
          //     #109992 315deg,
          //     ${color} 360deg)`,
          //   boxShadow: `
          //     inset 0 -4px 8px rgba(0, 0, 0, 0.4),
          //     inset 0 4px 8px rgba(255, 255, 255, 0.1),
          //     0 8px 16px rgba(0, 0, 0, 0.3)
          //   `,
          //   transform: `rotate(${rotation}deg)`,
          //   transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          // }}
        />

        {/* Center cap */}
        <div 
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle at 30% 30%, #b2b9b9, #8b9292)',
            boxShadow: `
              inset 0 4px 8px rgba(0, 0, 0, 0.3),
              inset 0 -2px 4px rgba(255, 255, 255, 0.2),
              0 2px 6px rgba(0, 0, 0, 0.2)
            `
          }}
        />

        {/* Indicator line */}
        <div 
          className="absolute transition-transform"
          style={{
            top: '15px',
            left: '50%',
            width: '3px',
            height: '25px',
            marginLeft: '-1.5px',
            background: 'linear-gradient(to bottom, #1a1410, transparent)',
            borderRadius: '2px',
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `1.5px ${60 - 15}px`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        />

        {/* Glow ring when active */}
        {isDragging && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 20px ${color}80`,
              animation: 'pulse 0.5s ease-in-out infinite'
            }}
          />
        )}
      </div>

      {/* Value display */}
      <div 
        className="text-center px-4 py-2 rounded-lg min-w-[100px]"
        style={{
          background: 'rgba(26, 20, 16, 0.3)',
          border: '1px solid rgba(26, 20, 16, 0.2)'
        }}
      >
        <div className="text-xl font-bold tracking-tight" 
             style={{ 
               fontFamily: "'JetBrains Mono', monospace",
               color: '#1a1410'
             }}>
          {displayValue}{unit}
        </div>
      </div>

      {/* Label */}
      <div 
        className="text-xs tracking-widest font-bold opacity-70"
        style={{ 
          color: '#4a3428',
          letterSpacing: '0.2em'
        }}
      >
        {label}
      </div>
    </div>
  );
};