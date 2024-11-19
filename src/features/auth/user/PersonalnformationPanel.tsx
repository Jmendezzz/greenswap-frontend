import Heading from "@/features/ui/Heading"
import StyledLightContainer from "@/features/ui/StyledLightContainer"
import UpdateProfileForm from "./UpdateProfileForm"

function PersonalnformationPanel() {
  return (
    <StyledLightContainer className="flex flex-col items-center h-full">
        <Heading>Información Personal</Heading>
        <UpdateProfileForm />
    </StyledLightContainer>
  )
}

export default PersonalnformationPanel	