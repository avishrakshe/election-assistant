import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif'
});

const MermaidChart = ({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      const renderChart = async () => {
        try {
          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substring(2, 10)}`, chart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid parsing error:", error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div style="color: #ef4444; padding: 12px; border: 1px solid #fca5a5; border-radius: 6px; background-color: #fef2f2; font-size: 0.9em;">
              ⚠️ The AI generated a diagram that couldn't be parsed. Please try asking again.
            </div>`;
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  return <div className="mermaid-chart-container" style={{ margin: '16px 0', overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', padding: '16px' }} ref={containerRef}></div>;
};

export default MermaidChart;
