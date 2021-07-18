import * as React from "react";
import {
  Chart,
  ScatterSeries,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ArgumentScale,
  ValueScale,
} from "@devexpress/dx-react-chart";
import { scaleBand } from "d3-scale";

const Label = React.memo((props) => {
  return <ArgumentAxis.Label {...props} text={props.text.toFixed(0)} />;
});

const TeacherGraph = (props) => {
  return (
    <Chart data={props.data} className="w-100">
      {/* <ArgumentAxis /> */}

      <ArgumentScale />
      <ArgumentAxis />

      <ValueScale />
      <ValueAxis />

      <Title
        text={
          props.subject && props.group
            ? `Distribuția notelor pentru materia ${props.subject}`
            : "Grafic demo, alege o materie"
        }
      />

      <ScatterSeries name="Serie demo1" valueField="val" argumentField="arg" />
      {/* <ScatterSeries
        name="Serie demo2"
        valueField="val2"
        argumentField="arg2"
      /> */}
      {/* <Legend position="bottom" /> */}
      <Animation />
    </Chart>
  );
};

export default TeacherGraph;
