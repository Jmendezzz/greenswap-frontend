import Section from '../features/ui/Section';
import styled from 'styled-components';
import useSendEmailValidation from '@/features/auth/send-email-validation/useSendEmailValidation';
import { useEffect } from 'react';
import SuccessEmailSentValidation from '@/features/auth/send-email-validation/SuccessEmailSentValidation';
import ErrorEmailSentValidation from '@/features/auth/send-email-validation/ErrorEmailSentValidation';
import FullScreenSpinner from '@/features/ui/FullScreenSpinner';

function SendEmailConfirmation() {

  const {sendEmailValidation,error,isLoading,isSuccess} = useSendEmailValidation();

  useEffect(()=>{
    sendEmailValidation();
  },[]);

  
    return (
      <StyledSection>
        <div className='flex justify-center'>
        {isLoading && <FullScreenSpinner/>}
        {isSuccess && <SuccessEmailSentValidation />}
        {error != null && <ErrorEmailSentValidation error={error} onRetry={()=> sendEmailValidation()}/>}
        </div>
    
      </StyledSection>
    );

}
const StyledSection = styled(Section)`
  height: 100vh;
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
`;

export default SendEmailConfirmation;