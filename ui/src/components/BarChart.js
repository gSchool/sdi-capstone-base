import { Paper } from "@mui/material";
import { Chart, BarSeries, ArgumentAxis, ValueAxis, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { Typography } from "@mui/material";
// import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";

export default function BarChart({ input }) {
  return (
    <Paper>
      <Chart data={input}>
        <ArgumentAxis />
        <ValueAxis>
          <Typography color="textPrimary">
            title
          </Typography>
       </ValueAxis>
        <BarSeries valueField="status" argumentField="name" />
        <EventTracker />
        <Tooltip />
        {/* <Animation /> */}
      </Chart>
    </Paper>
  );
}