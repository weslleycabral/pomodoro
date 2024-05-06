import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer } from "./styles";
import { MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const { activeCycle } =  useContext(CyclesContext);
    const { register } = useFormContext();

    return(
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
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
                disabled={!!activeCycle}
                {...register('minutesAmount', {valueAsNumber: true})}
            />              
            <span>minutos</span>
        </FormContainer>
    );
}