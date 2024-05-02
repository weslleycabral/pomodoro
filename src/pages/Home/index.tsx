import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style";

export function Home() {
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
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
                <StartCountdownButton disabled type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form> 
        </HomeContainer>
    );
}