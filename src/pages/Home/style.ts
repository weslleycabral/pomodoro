import styled from "styled-components";

export const HomeContainer = styled.main`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${color => color.theme['green-500']};
    color: ${color => color.theme['gray-100']};

    &:not(:disabled)hover {
        background: ${color => color.theme['green-700']};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${color => color.theme['red-500']};
    color: ${color => color.theme['gray-100']};

    &:not(:disabled)hover {
        background: ${color => color.theme['red-700']};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;