import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { HistoryContainer, HistoryHeader, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)

  function cleanHistoryCycles() {
    localStorage.removeItem('@ignite-timer:cycles-state-1.0.0')
    window.location.reload()
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Meu histórico</h1>
        <button onClick={cleanHistoryCycles} disabled={cycles.length === 0}>Limpar Histórico</button>
      </HistoryHeader>
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
                <td>{formatDistanceToNow(new Date(cycle.startDate), {
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