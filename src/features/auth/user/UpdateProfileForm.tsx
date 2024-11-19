import { UpdateUserProfileDTO } from '@/domain/user/UpdateUserProfileDTO';
import Button from '@/features/ui/Button';
import FormRow from '@/features/ui/FormRow';
import Input from '@/features/ui/Input';
import UploadImageInput from '@/features/ui/UploadImageInput';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useUpdateProfile from './useUpdateProfile';
import useUser from './useUser';
import Spinner from '@/features/ui/Spinner';

function UpdateProfileForm() {
  const { user } = useUser();
  const { updateProfile, isLoading } = useUpdateProfile();
  const [image, setImage] = useState<File | undefined | string>(
    user?.urlProfilePicture
  );

  useEffect(()=>{
    setImage(user?.urlProfilePicture)
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileDTO>({
    mode: 'onTouched',
  });

  const onSubmit = (data: UpdateUserProfileDTO) => {
    updateProfile({
      ...data,
      urlProfilePicture: image,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="white" />
      </div>
    );
  }

  return (
    <form className="w-full space-y-10 " onSubmit={handleSubmit(onSubmit)}>
      <UploadImageInput image={image} setImage={setImage} />
      <div className="flex justify-between w-full gap-20">
        <FormRow error={errors?.firstName?.message}>
          <label htmlFor="name">Nombre</label>
          <Input
            defaultValue={user?.firstName}
            id="name"
            variant="non-outlined"
            {...register('firstName', { required: 'Este campo es requerido' })}
          />
        </FormRow>
        <FormRow error={errors?.lastName?.message}>
          <label htmlFor="lastName">Apellidos</label>
          <Input
            id="lastName"
            defaultValue={user?.lastName}
            variant="non-outlined"
            {...register('lastName', { required: 'Este campo es requerido' })}
          />
        </FormRow>
      </div>

      <div className="flex justify-between w-full gap-20">
        <FormRow error={undefined}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            variant="non-outlined"
            disabled={true}
            value={user?.email}
          />
        </FormRow>
        <FormRow error={errors?.lastName?.message}>
          <label htmlFor="phoneNumber">Número de celular</label>
          <Input
            defaultValue={user?.phoneNumber}
            id="phoneNumber"
            variant="non-outlined"
            {...register('phoneNumber', {
              required: 'Este campo es requerido',
            })}
          />
        </FormRow>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">
          {isLoading ? 'Actualizando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
