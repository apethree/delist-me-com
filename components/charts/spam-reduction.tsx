"use client"

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts"

export function SpamReductionChart() {
  const data = [
    {
      name: "Spam Blocked",
      value: 99.8,
      fill: "url(#blue-gradient)",
    },
  ]

  return (
    <div className="chart-wrapper mx-auto flex h-[300px] w-full max-w-[300px] flex-col items-center justify-center">
       <div className="relative h-[250px] w-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={16}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <defs>
                 <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                 </linearGradient>
              </defs>
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: '#e2e8f0', opacity: 0.2 }}
                dataKey="value"
                cornerRadius={30}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
               99.8%
             </span>
             <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
               Spam Blocked
             </span>
          </div>
       </div>
    </div>
  )
}
