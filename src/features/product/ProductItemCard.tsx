import { getCategoryValue } from '@/domain/product/Category';
import { ListProductDTO } from '@/domain/product/ListProductDTO';
import { Devices } from '@/styles/Devices';
import { formatToCOP } from '@/utils/formatCurrency';
import { HiPhotograph } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductQualityTag from './ProductQualityTag';
import { ROUTES } from '@/constants/routes';

interface ProductItemCardProps {
  product: ListProductDTO;
  size?: 'xsm' | 'sm' | 'lg' | 'xl';
  onClick?: (product: ListProductDTO) => void;
}

function ProductItemCard({
  product,
  size = 'sm',
  onClick,
}: ProductItemCardProps) {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (onClick) {
      onClick(product);
    } else {
      navigate(`${ROUTES.products}/${product.id}`);
    }
  };

  return (
    <StyledProductItemCard
      size={size}
      className="relative shadow-lg"
      onClick={clickHandler}
    >
      <StyledProductImage size={size}>
        {product.urlImage != '' && product.urlImage != null ? (
          <img
            src={product.urlImage}
            alt={product.name}
            className="w-full h-full"
          />
        ) : (
          <HiPhotograph className="w-full h-full" />
        )}
      </StyledProductImage>
      <div className="text-center h-[100px]">
        <StyledName>{product.name}</StyledName>
        <StyledPrice>{formatToCOP(product.price)}</StyledPrice>
        <StyledCategory>{getCategoryValue(product.category)}</StyledCategory>
        <ProductQualityTag quality={product.quality} />
      </div>
    </StyledProductItemCard>
  );
}

interface StyledProps {
  size: 'xsm' | 'sm' | 'lg' | 'xl';
}

const StyledProductItemCard = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary-color-light);
  border-radius: 1rem;
  cursor: pointer;
  gap: 1rem;
  height: fit-content;
  padding-bottom: 2rem;
  width: ${({ size }) => {
    switch (size) {
      case 'xsm':
        return '100px';
      case 'sm':
        return '150px';
      case 'lg':
        return '300px';
      case 'xl':
        return '450px';
      default:
        return '150px';
    }
  }};
  @media (min-width: ${Devices.tablet}) {
    width: ${({ size }) => {
      switch (size) {
        case 'xsm':
          return '200px';
        case 'sm':
          return '300px';
        case 'lg':
          return '450px';
        case 'xl':
          return '600px';
        default:
          return '300px';
      }
    }};
  }
`;

const StyledProductImage = styled.div<StyledProps>`
  width: 100%;
  border-radius: 1rem;
  img {
    border-radius: 1rem 1rem 0 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  height: ${({ size }) => {
    switch (size) {
      case 'xsm':
        return '50px';
      case 'sm':
        return '100px';
      case 'lg':
        return '200px';
      case 'xl':
        return '300px';
      default:
        return '100px';
    }
  }};
  @media (min-width: ${Devices.tablet}) {
    height: ${({ size }) => {
      switch (size) {
        case 'xsm':
          return '100px';
        case 'sm':
          return '200px';
        case 'lg':
          return '300px';
        case 'xl':
          return '400px';
        default:
          return '200px';
      }
    }};
  }
`;
const StyledCategory = styled.p`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  border-radius: 1rem;
`;

const StyledPrice = styled.p`
  font-weight: 700;
  color: var(--contrast-color);
`

const StyledName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;
export default ProductItemCard;
