import { ExchangeDTO } from '@/domain/exchange/ExchangeDTO';
import Table from '../ui/Table';
import styled from 'styled-components';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useAcceptExchange from './useAcceptExchange';
import Spinner from '../ui/Spinner';
import { ROUTES } from '@/constants/routes';
import useRejectExchange from './useRejectExchange';
import { Status } from '@/domain/exchange/Status';

interface Props {
  exchange: ExchangeDTO;
}
function ExchangeOffersRow({ exchange }: Readonly<Props>) {
  const { acceptExchange, isLoading: isLoasingAccept } = useAcceptExchange();
  const { rejectExchange, isLoading: isLoadingReject } = useRejectExchange();

  const handleAcceptExchange = () => {
    acceptExchange(exchange.id);
  };

  const handleRejectExchange = () => {
    rejectExchange(exchange.id);

  }

  return (
    <Table.Row>
      <Link to={`/products/${exchange.productRequested.id}`}>
        <StyledExchangeOffersContainer>
          <img
            src={exchange.productRequested.urlImage}
            alt={exchange.productRequested.name}
          />
          <p>{exchange.productRequested.name}</p>
        </StyledExchangeOffersContainer>
      </Link>

      <Link to={`/products/${exchange.productOffered.id}`}>
        <StyledExchangeOffersContainer>
          <img
            src={exchange.productOffered.urlImage}
            alt={exchange.productOffered.name}
          />
          <p>{exchange.productOffered.name}</p>
        </StyledExchangeOffersContainer>
      </Link>

      <div className="flex justify-center gap-10 text-center">
          {exchange.status === Status.ACCEPTED && (
            <div className='flex flex-col'>
              <p className='text-contrast'>Intercambio aceptado</p>
              <Link to={`${ROUTES.exchanges}/${exchange.id}`}>
                Ver detalles
              </Link>
            </div>
          )}
          {exchange.status === Status.DECLINED && (
            <div className='flex flex-col text-center'>
              <p className='text-red-400'>Intercambio rechazado</p>
            </div>
          )}
          {exchange.status === Status.AWAITING_RESPONSE && (
            <>
              {isLoasingAccept || isLoadingReject ? <Spinner /> : (
                <>
                  <HiCheckCircle
                    className="text-6xl cursor-pointer text-contrast"
                    onClick={() => handleAcceptExchange()}
                  />
                  <HiXCircle
                    className="text-6xl text-red-500 cursor-pointer"
                    onClick={() => handleRejectExchange()}
                  />
                </>
              )}
            </>
          )}
      
      </div>
    </Table.Row>
  );
}

const StyledExchangeOffersContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  & img {
    width: 130px;
    height: 120px;
    border-radius: 2rem;
    object-fit: cover;
  }
`;

export default ExchangeOffersRow;
