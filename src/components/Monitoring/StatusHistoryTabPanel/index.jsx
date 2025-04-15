import { useGetSensorLogs } from "@apis/sensor/useGetSensorLogs";
import Loading from "@components/Loading";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "dayjs/locale/ko";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { showToast } from "@utils/toast";
import { palette } from "@styles/palette";

const StatusHistoryTabPanel = () => {
  const sensorId = useSelector((state) => state.selectedSensor?.sensorId);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      year: null,
      month: null,
      day: null,
    },
  });

  const slotProps = {
    textField: { size: "small" },
    calendarHeader: { sx: { display: "none" } },
  };

  const onSubmit = (formData) => {
    const { year, month, day } = formData;
    if (!year) {
      if (month || day) {
        showToast.error("년도를 선택해주세요");
        return;
      }
    }

    if (!month) {
      if (day) {
        showToast.error("월을 선택해주세요");
        return;
      }
    }
    setYear(dayjs(year).get("year"));
    setMonth(dayjs(month).get("month") + 1);
    setDay(dayjs(day).get("date"));
  };

  const { data: logs, isLoading } = useGetSensorLogs(
    sensorId,
    year,
    month,
    day
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Stack sx={{ height: "100%" }}>
        <Stack
          sx={{
            flexDirection: "row",
            paddingY: "10px",
            justifyContent: "space-between",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack sx={{ flexDirection: "row", gap: "10px" }}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <DatePicker views={["year"]} slotProps={slotProps} {...field} />
              )}
            />
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <DatePicker
                  views={["month"]}
                  slotProps={slotProps}
                  {...field}
                />
              )}
            />
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <DatePicker
                  views={["day"]}
                  slotProps={{
                    ...slotProps,
                    calendarHeader: { sx: { display: "visible" } },
                  }}
                  minDate={dayjs(
                    `${dayjs(watch("year")).format("YYYY")}-${dayjs(
                      watch("month")
                    ).format("MM")}-01`
                  )}
                  maxDate={dayjs(
                    `${dayjs(watch("year")).format("YYYY")}-${dayjs(
                      watch("month")
                    ).format("MM")}-01`
                  ).endOf("month")}
                  {...field}
                />
              )}
            />
          </Stack>
          <Button variant="contained" type="submit">
            검색
          </Button>
        </Stack>
        <TableContainer sx={{ overflow: "auto" }}>
          {isLoading ? (
            <Loading />
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow
                  sx={{
                    "& > .MuiTableCell-root": {
                      backgroundColor: palette.grey[50],
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <TableCell>발생 시각</TableCell>
                  <TableCell>버튼 횟수</TableCell>
                  <TableCell>위치안내 횟수</TableCell>
                  <TableCell>신호안내 횟수</TableCell>
                  <TableCell>리모컨 수신</TableCell>
                  <TableCell>버튼 작동</TableCell>
                  <TableCell>전원 상태</TableCell>
                  <TableCell>235 채널 신호</TableCell>
                  <TableCell>358 채널 신호</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs?.map((log) => {
                  return (
                    <TableRow key={log.sensorLogId}>
                      <TableCell>
                        {dayjs(log.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        {log.faultInformation["User Button Fault"]
                          ? "오류"
                          : "정상"}
                      </TableCell>
                      <TableCell>
                        {log.faultInformation["Signal Light Residual Fault"]
                          ? "오류"
                          : "정상"}
                      </TableCell>
                      <TableCell>
                        {log.faultInformation["235.3MHz Receiver Fault"]
                          ? "오류"
                          : "정상"}
                      </TableCell>
                      <TableCell>
                        {log.faultInformation["358.5MHz Receiver Fault"]
                          ? "오류"
                          : "정상"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Stack>
    </LocalizationProvider>
  );
};

export default StatusHistoryTabPanel;
