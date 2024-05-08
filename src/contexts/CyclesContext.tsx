import { createContext, useState, useReducer, useEffect } from "react";
import { cyclesReducer, Cycle } from "../reducers/cycles/reducer";
import { createNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState) => {
        const storedStatesAsJSON = localStorage.getItem("@ignite-timer: cycles-state-1.0.0");
        if (storedStatesAsJSON) {
            return JSON.parse(storedStatesAsJSON);
        } else {
            return initialState;
        }
    });

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

        if (activeCycle) {
            const secondsDifference = differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
            return secondsDifference;
        }
        
        return 0;
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem("@ignite-timer: cycles-state-1.0.0", stateJSON);
    }, [cyclesState]);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: new Date().getTime().toString(),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(createNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle }}>
                    {children}
        </CyclesContext.Provider>
    );
}