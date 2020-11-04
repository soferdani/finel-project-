// import React, { useState } from 'react';
// import {
//   PieChart, Pie, Sector, Cell,
// } from 'recharts';
// import { inject, observer } from 'mobx-react'



// const pieChart = inject('user')(observer((props) =>  {
    
//   const { user } = props
  
//     const COLORS = ['#0088FE', '#00C49F'];
    
  
//     const [allTodoStatus, setAllTodoStatus] = useState([
//         {
//             name: "completed",
//             value: user.todosCompleted
//         },
//         {
//             name: "unCompleted",
//             value: user.todosNotCompleted
//         }
//     ])
  
//   console.log(allTodoStatus);
//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({
//         cx, cy, midAngle, innerRadius, outerRadius, percent, index,
//     }) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
//         return (
//             <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//           {`${(percent * 100).toFixed(0)}%`}
//         </text>
//       );
//     };
    
//     return (
//         <PieChart width={400} height={400}>
//         <Pie
//           data={allTodoStatus}
//           cx={200}
//           cy={200}
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={80}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {
//             allTodoStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
//           }
//         </Pie>
//       </PieChart>
//     );
  
// }))




// export default pieChart