import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const { handleSubmit, watch, reset } = newCycleForm;

    const task = watch('task');
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <Countdown />
                    { activeCycle ? (
                        <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24}/>
                            Interromper
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24}/>
                            Começar
                        </StartCountdownButton>
                    )}
            </form> 
        </HomeContainer>
    );
}