import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";


import beep from "../../../../assets/bip-irritable.mp3"
import { toast } from "react-toastify";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountCountPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext);


  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [])

  function notification() {
    const audio = new Audio(beep)
    toast.success('Finalizado!!', {
      onOpen: () => audio.play(),
    })

    if (Notification.permission === 'granted') {
      new Notification('Ciclo Finalizado!', {
        body: 'O ciclo foi concluído com sucesso.',
      });
    }
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds)
          clearInterval(interval);
          notification()
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountCountPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');


  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}