import { createContext, ReactNode, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleFinishedAction } from "../reducers/cycles/actions"


interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountCountPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const { cycles, activeCycleId } = cyclesState;

  const [amountCountPassed, setAmountCountPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountCountPassed(seconds)
  }

  function markCurrentCycleAsFinished() {

    dispatch(markCurrentCycleFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountCountPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }


  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountCountPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}>
      {children}
    </CyclesContext.Provider>
  )
}