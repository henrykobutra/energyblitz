'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Sample data for the demo chart
const demoData = [
  { time: '00:00', energy: 32000 },
  { time: '04:00', energy: 28000 },
  { time: '08:00', energy: 35000 },
  { time: '12:00', energy: 40000 },
  { time: '16:00', energy: 38000 },
  { time: '20:00', energy: 33000 }
]

export function DemoChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={demoData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="energy" 
          stroke="#EAB308" 
          strokeWidth={2} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

