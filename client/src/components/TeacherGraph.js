import * as React from "react";
import {
  Chart,
  ScatterSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";

import { dataGenerator } from "./TeacherGraphGenerator";

const TeacherGraph = (props) => {
  return (
    <Chart data={dataGenerator(100)} className="w-100">
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
    </Chart>
  );
};

export default TeacherGraph;
