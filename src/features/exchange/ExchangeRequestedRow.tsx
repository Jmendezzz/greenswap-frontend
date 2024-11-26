import { ExchangeDTO } from '@/domain/exchange/ExchangeDTO';
import Table from '../ui/Table';
import styled from 'styled-components';
import { Status } from '@/domain/exchange/Status';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface Props {
  readonly exchange: ExchangeDTO;
}
function ExchangeRequestedRow({ exchange }: Props) {

  const getStatusMessage = (status:Status) => {
    switch (status) {
      case Status.AWAITING_RESPONSE:
        return 'Esperando respuesta del otro usuario';
      case Status.DECLINED:
        return 'Rechazado';
    }
  }
  return (
    <Table.Row>
      <StyledExchangeRequestedRowImage>
        <img
          src={exchange.productOffered.urlImage}
          alt={exchange.productOffered.name}
        />
        <p>{exchange.productOffered.name}</p>
      </StyledExchangeRequestedRowImage>
      <StyledExchangeRequestedRowImage>
        <img
          src={exchange.productRequested.urlImage}
          alt={exchange.productRequested.name}
        />
        <p>{exchange.productRequested.name}</p>
      </StyledExchangeRequestedRowImage>
      <div className='flex flex-col text-center'>
        {getStatusMessage(exchange.status)}
        {exchange.status === Status.ACCEPTED && <Link to={`${ROUTES.exchanges}/${exchange.id}`} className='text-contrast'>Ver detalles</Link>}
        </div>
    </Table.Row>
  );
}

const StyledExchangeRequestedRowImage = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  & img {
    width: 130px;
    height: 120px;
    border-radius: 2rem;
  }
`;

export default ExchangeRequestedRow;
