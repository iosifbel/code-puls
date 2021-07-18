import * as React from "react";
import {
  Chart,
  ScatterSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const TeacherGraph = (props) => {
  return (
    <Chart data={props.data} className="w-100">
      <ScatterSeries
        name="Serie predefinita1"
        valueField="val1"
        argumentField="arg1"
      />
      <ScatterSeries
        name="Serie predefinita2"
        valueField="val2"
        argumentField="arg2"
      />
      <Legend position="bottom" />
      <Animation />
    </Chart>
  );
};

export default TeacherGraph;
