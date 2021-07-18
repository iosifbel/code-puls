import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "1970", population: 3.682 },
  { year: "2010", population: 6.93 },
];

const StudentGraph = (props) => {
  return (
    <Chart data={data} className="w-100">
      <ArgumentAxis />
      <ValueAxis max={7} />

      <BarSeries
        name="notele la materia X"
        barWidth="0.4"
        valueField="population"
        argumentField="year"
      />
      <Title text="Student Graph" />
      <Legend position="bottom" />
      <Animation />
    </Chart>
  );
};

export default StudentGraph;
