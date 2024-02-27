import { useState } from 'react';
import { styled } from 'styled-components';

import { Button, TextButton } from './Buttons';
import Input from './Input';

const AuthInputsDiv = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #474232 0%, #28271c 100%);
  color: white;
`

const ControlDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <AuthInputsDiv>
      <ControlDiv>
        <Input
          type="email"
          labelValue = "Email"
          invalid = {emailNotValid}
          onChange={(event) => 
            handleInputChange('email', event.target.value)
          }
        />
        <Input
          type="password"
          labelValue = "Password"
          invalid = {passwordNotValid}
          onChange={(event) => 
            handleInputChange('password', event.target.value)
          }
        />
      </ControlDiv>
      <div className="actions">
        <TextButton>
          Create a new account
        </TextButton>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </AuthInputsDiv>
  );
}
