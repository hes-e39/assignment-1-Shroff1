import styled from 'styled-components';

const StyledInput = styled.input<{ isRunning: boolean }>`
  padding: 5px;
  width: 60px;
  margin-right: 5px;
  background-color: ${({ isRunning }) => (isRunning ? '#d3d3d3' : 'White')};
`;

const StyledDescription = styled.label`
    
    font-size: 0.5rem;
`;

interface InputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    isRunning: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
}

const InputField: React.FC<InputProps> = ({ value, onChange, disabled, isRunning, placeholder, min, max }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledDescription htmlFor={placeholder}>{placeholder}</StyledDescription>
            <StyledInput type="number" value={value} onChange={onChange} disabled={disabled} isRunning={isRunning} placeholder={placeholder} min={min} max={max} />
        </div>
    );
};

export default InputField;
