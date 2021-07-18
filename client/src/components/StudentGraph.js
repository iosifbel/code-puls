import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const defaultData = [
  { date: "10/09", grade: 2.525 },
  { date: "11/09", grade: 3.018 },
  { date: "12/09", grade: 4.44 },
  { date: "13/09", grade: 5.31 },
  { date: "14/09", grade: 6.127 },
  { date: "15/09", grade: 3.682 },
  { date: "16/09", grade: 10 },
];

const StudentGraph = (props) => {
  return (
    <Chart data={props.data ? props.data : defaultData} className="w-100">
      <ArgumentAxis />
      <ValueAxis />

      <BarSeries
        name={`notele la materia ${props.subject}`}
        barWidth="0.5"
        valueField="grade"
        argumentField="date"
      />
      <Title
        text={
          props.subject
            ? `Graficul notelor materiei ${props.subject}`
            : "Alege o materie pentru a vizualiza notele"
        }
      />
      {/* <Legend position="bottom" /> */}
      <Animation />
    </Chart>
  );
};

export default StudentGraph;
