import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Resources check',
    start: new Date('2024-01-01').getTime(),
    end: new Date('2024-02-15').getTime(),
    color: '#df914c'
  },
  {
    name: 'Participants',
    start: new Date('2024-02-01').getTime(),
    end: new Date('2024-03-15').getTime(),
    color: '#44a68b'
  },
  {
    name: 'SWOT analysis',
    start: new Date('2024-03-01').getTime(),
    end: new Date('2024-04-30').getTime(),
    color: '#96a0a5'
  },
  {
    name: 'Design research',
    start: new Date('2024-04-15').getTime(),
    end: new Date('2024-06-30').getTime(),
    color: '#ce9e9f'
  }
];

const months = ['January', 'February', 'March', 'April', 'May', 'June'];

export default function ProgramProgressTimeline() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Program Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            barSize={20}
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
          >
            <XAxis
              type="number"
              domain={[new Date('2024-01-01').getTime(), new Date('2024-06-30').getTime()]}
              tickFormatter={(tick) => months[new Date(tick).getMonth()]}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value, name) => [new Date(value).toLocaleDateString(), name]}
            />
            {data.map((entry, index) => (
              <Bar
                key={index}
                dataKey="end"
                fill={entry.color}
                background={{ fill: '#f5f5f5' }}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
