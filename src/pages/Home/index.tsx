import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod.number().min(5).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
}

export function Home() {
    const [cycles, setCycles] = useState<Array<Cycle>>([])
    const [activeCycleId, setActiveCycleId] =  useState<string | null>(null)

    const { register, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCyle(data: newCycleFormData) {
        const newCycle: Cycle = {
            id: new Date().getTime().toString(),
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles(state => [...state, newCycle]);
        setActiveCycleId(newCycle.id);

        reset();
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    console.log(activeCycle);

    const task = watch('task');
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCyle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                    />
                    <label htmlFor="minutesAmount">durante</label>
                    <datalist id="task-suggestions">
                        <option value="Projeto 01"/>
                        <option value="Projeto 02"/>
                        <option value="Projeto 03"/>
                    </datalist>
                    <MinutesAmountInput
                        id="minutesAmount"
                        type="number"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />              
                    <span>minutos</span>
                </FormContainer>
                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form> 
        </HomeContainer>
    );
}