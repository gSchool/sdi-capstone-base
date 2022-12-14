import { Paper } from "@material-ui/core";
import { Chart, BarSeries, ArgumentAxis, ValueAxis, Tooltip } from "@devexpress/dx-react-chart-material-ui";
// import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";

function BarChart( {input} ) {
  return (
    <Paper>
      <Chart data={input}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="status" argumentField="name" />
        <EventTracker />
        <Tooltip />
        {/* <Animation /> */}
      </Chart>
    </Paper>
  );
}

export { BarChart };