import { ProductDTO } from '@/domain/product/ProductDTO';
import { Devices } from '@/styles/Devices';
import { HiPhotograph } from 'react-icons/hi';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import { getQualityValue } from '@/domain/product/Condition';
import { formatDate } from 'date-fns';
import UserProfilePicture from '../ui/UserProfilePicture';
import { formatToCOP } from '@/utils/formatCurrency';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useUserContext } from '@/context/UserContext';

interface Props {
  product: Partial<ProductDTO>;
}

function ProductDetailCard({ product }: Props) {
  const { user } = useUserContext();
  return (
    <StyledProductDetail>
      <StyledImageContainer>
        {product.urlImage === '' || product.urlImage == null ? (
          <HiPhotograph className="w-full h-full" />
        ) : (
          <img src={product.urlImage} alt={product.name} />
        )}
      </StyledImageContainer>

      <StyledProductDetailContent>
        <Heading align="left">{product.name ??  'Titulo'}</Heading>
        <p>
          <span className="font-bold">Estado:</span>{' '}
          {product.quality ? getQualityValue(product.quality) : 'No especificado'}
        </p>
        <p>{product.description ?? 'Descripición.'}</p>
        <p>{product.price !== undefined ? formatToCOP(product.price) : 'No especificado.'}</p>
        <hr />
        <div>
          <header>
            <Heading type="h3" align="left">
              Información del vendedor
            </Heading>
          </header>
          <div className="flex items-center gap-4">
            {product.owner && (
              <>
                <UserProfilePicture user={product.owner} />
                <p>
                  <Link to={`/${ROUTES.userProfile}/${product.owner.id}`}>
                    {product.owner.firstName} {product.owner.lastName}
                  </Link>
                </p>
              </>
            )}
          </div>
          <p>
            {product.createdAt ? formatDate(new Date(product.createdAt.toString()), 'MM/dd/yyyy') : 'Fecha no especificada'}
          </p>
        </div>

        <footer className="flex justify-end gap-10">
          <Button variant="secondary" disabled={product.owner?.id === user?.id}>
            Comprar
          </Button>
          <Link to={`${ROUTES.createExchange}/${product.id}`}>
            <Button variant="primary" disabled={product.owner?.id === user?.id}>
              Intercambiar
            </Button>
          </Link>
        </footer>
      </StyledProductDetailContent>
    </StyledProductDetail>
  );
}
const StyledImageContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items: center; // Add this line

  width: 100%;
  height: 100%;
  @media (min-width: ${Devices.laptop}) {
    width: 50%;
  }
  img {
    max-width: 500px;
    max-height: 500px;
    width: 100%;
    height: 100%; // Change this line
    object-fit: cover;
    border-radius: 3rem;
  }
`;
const StyledProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 800px;
  padding: 4rem;
  width: 100%;
  @media (min-width: ${Devices.laptop}) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const StyledProductDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  gap: 2rem;
  width: 100%;

  @media (min-width: ${Devices.laptop}) {
    width: 500px;
    height: 600px;
  }
`;

export default ProductDetailCard;
