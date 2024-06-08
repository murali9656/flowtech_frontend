import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Home() {
 
  const [pending,setPending]=useState();
  const [accepted,setAccepted]=useState();
  const [completed,setCompleted]=useState();
  const [rejected,setRejected]=useState();

  useEffect(()=>{
    axios.get('http://localhost:8000/piechartpending').then((res)=>{
      setPending(res.data.count)
      // console.log(res.data.count);
      // console.log(rows)
    }).catch((err)=>{
      console.log(err)
    })
  },[]);

  useEffect(()=>{
    axios.get('http://localhost:8000/piechartaccepted').then((res)=>{
      setAccepted(res.data.count)
    }).catch((err)=>{
      console.log(err)
    })
  },[]);

  useEffect(()=>{
    axios.get('http://localhost:8000/piechartcompleted').then((res)=>{
      setCompleted(res.data.count)
    }).catch((err)=>{
      console.log(err)
    })
  },[]);

  useEffect(()=>{
    axios.get('http://localhost:8000/piechartrejected').then((res)=>{
      setRejected(res.data.count)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const options2 = {
    title: {
      text: "Enquiry Tracker"
    },
    data: [
    {
      type: "column",
      dataPoints: [
        { label: "Fullfiled",  y: completed, color:"green",width:"20px"  },
        { label: "accepted", y: accepted, color:"purple"  },
        { label: "Pending", y: pending , color:"yellow"},
        { label: "Rejected",  y: rejected, color: "red" }
      ]
    }
    ]
  };

  const data = [
    ["Enquiry", "Total Enquires"],
    ["Pending", pending],
    ["Rejected", rejected],
    ["accepted", accepted],
    ["Fullfiled", completed],
  ];

  const options = {
    title: "Enquires Traker",
    is3D: true,
  };
  return (
    <section>
    <div style={{zIndex:"-111"}}>

    <CanvasJSChart options = {options2}
    width={"57%"}
    />
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"90%"}
      height={"400px"}
    />
    </div>
    </section>
  )
}
