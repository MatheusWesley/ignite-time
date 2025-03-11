import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)

  // const history = [
  //   {
  //     id: 1,
  //     task: "Estudar ReactJS",
  //     duration: "25 minutos",
  //     start: "Há cerca de 1 mês",
  //     status: "Em andamento",
  //   },
  //   {
  //     id: 2,
  //     task: "Estudar JavaScript",
  //     duration: "25 minutos",
  //     start: "Há cerca de 1 mês",
  //     status: "Concluído",
  //   },
  //   {
  //     task: "Estudar TypeScript",
  //     duration: "25 minutos",
  //     start: "Há cerca de 1 mês",
  //     status: "Em andamento",
  //   },
  //   {
  //     id: 4,
  //     task: "Estudar NodeJS",
  //     duration: "25 minutos",
  //     start: "Há cerca de 1 mês",
  //     status: "Concluído",
  //   },
  //   {
  //     id: 5,
  //     task: "Estudar React Native",
  //     duration: "25 minutos",
  //     start: "Há cerca de 1 mês",
  //     status: "Interrompido",
  //   }
  // ]


  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.startDate, {
                  addSuffix: true,
                  locale: ptBR,
                })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {(!cycle.finishedDate && !cycle.interruptedDate) && (
                    <Status statusColor="yellow">Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}