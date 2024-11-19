import SignUpRequestDTO from "@/domain/auth/SignUpRequestDTO";
import { getBasicInfoCurrentUser, signUpService } from "@/services/authService";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../login/useLogin";
import { ROUTES } from "@/constants/routes";
import { useUserContext } from "@/context/UserContext";

function useSignUp(){
    const navigate = useNavigate();
    const {setUser} = useUserContext  ();
    const {mutate, isLoading} = useMutation({
        mutationFn: (data: SignUpRequestDTO) => signUpService(data),
        onSuccess: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUser(await getBasicInfoCurrentUser());
            toast.success('Te has registrado exitosamente, por favor revisa tu correo para confirmar tu cuenta');    
            navigate(ROUTES.sendEmailConfirmation);        
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            if(error.response?.data){
              toast.error(error.response.data.message);
            }
            else{
              toast.error('Error inesperado, por favor intenta de nuevo');
            }
          },
        });

    return {
        signUp: mutate,
        isLoading
    }

}

export default useSignUp;