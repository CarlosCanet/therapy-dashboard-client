import { useEffect, useState } from "react";
import SessionList from "../../components/SessionList"
import type { SessionWithPatient } from "../../types/types";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import { transformSessionWithPatient } from "../../utils/api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";

type CalendarDay = { value: string } | {value: string, date: Date, numSessions: number }

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function isSameDay(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

function NextSessionsPage() {
  const [sessions, setSessions] = useState<SessionWithPatient[]>([]);
  const [myDate, setMyDate] = useState(new Date());
  const sessionsApiResponse: APIResponse<SessionWithPatient> = useFetch<SessionWithPatient>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient`, transformSessionWithPatient);
  const sessionsFiltered = sessions.filter(session => session.date >= new Date())
  const year = myDate.getFullYear();
  const month = myDate.getMonth();
  const monthDays = new Date(year, month+1, 0).getDate();
  const startDay = (myDate.getDay() + 6) % 7;
  const calendar: Array<Array<CalendarDay>> = [...Array(Math.ceil((monthDays+startDay)/7))].map(() => new Array(7).fill({value: ""}));
  for (let i = 0; i < monthDays; i++){
    const row = Math.floor((i+startDay) / 7);
    const col = (i+startDay) % 7;
    if (i < startDay) {
      calendar[row][col] = {value: "" };
    }
    const thisDate = new Date(year, month, i + 1);
    calendar[row][col] = { value: (i + 1).toString(), date: thisDate, numSessions: sessions.reduce((acc, curr) => acc + (isSameDay(curr.date, thisDate) ? 1 : 0), 0) };
  }

  useEffect(() => {
      if (!sessionsApiResponse.loading && sessionsApiResponse.data && Array.isArray(sessionsApiResponse.data)) {
        setSessions(sessionsApiResponse.data);
      }
  }, [sessionsApiResponse]);
  
  return (
    <Container className="d-flex flex-column gap-3">
      <Row>
        <Col>
          <Card>
            <Card.Header as={"h2"} className="text-primary py-3 d-flex justify-content-between align-items-center">
              <CaretLeft onClick={() => setMyDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))} />
              <Container onClick={() => setMyDate(new Date())}>Calendar</Container>
              <CaretRight onClick={() => setMyDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))} />
            </Card.Header>
            <Card.Body>
              <Card.Title>{monthName[month]} {myDate.getFullYear()}</Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                      {week.map((day, dayIndex) => (
                        <td key={dayIndex}>
                          {"date" in day && day.date &&
                            <Card className={day.numSessions > 0 ? "border-info border-2" : ""}>
                              <Card.Header className="bg-info bg-opacity-75">{day.value}</Card.Header>
                              <Card.Body className="py-1 bg-info bg-opacity-25">
                                <Card.Text>{day.numSessions}</Card.Text>
                              </Card.Body>
                            </Card>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header as={"h2"} className="text-primary py-3">Next sessions</Card.Header>
            <Card.Body>
              {sessionsFiltered.length === 0 ? <Card.Title>No sessions</Card.Title> : <SessionList sessions={sessionsFiltered}/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default NextSessionsPage