import { LineChart,Line,XAxis,YAxis,Tooltip } from "recharts";

export default function AnalyticsChart({data}){

return(

<LineChart width={600} height={300} data={data}>

<XAxis dataKey="createdAt"/>

<YAxis/>

<Tooltip/>

<Line type="monotone" dataKey="score"/>

</LineChart>

);

}