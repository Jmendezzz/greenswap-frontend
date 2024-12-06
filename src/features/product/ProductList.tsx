import ProductItemCard from './ProductItemCard';
import { useProducts } from './useProducts';
import ProductFilter from './ProductFilter';
import List from '../ui/List';
import Heading from '../ui/Heading';
import MobileProductFilter from './MobileProductFilter';

function ProductList() {
  const { data, isLoading, setPageable, pageable } = useProducts();

  const setPage = (page: number) => {
    setPageable({ ...pageable, page });
  };

  return (
      <div className="flex gap-10">
      <div className="hidden h-fit md:block">
        <ProductFilter />
      </div>

      <List>
        <header className='relative'>
          <Heading>Productos</Heading>
          <div className="absolute block right-20 top-1/4 md:hidden">
            <MobileProductFilter />
          </div>
        </header>
        <List.Items
          isLoading={isLoading}
          data={data?.content}
          render={(product) => (
            <ProductItemCard key={product.id} product={product} />
          )}
        />
        <List.Pagination
          pageable={pageable}
          totalPages={data?.totalPages}
          setPage={setPage}
        />
      </List>
    </div>
  );
}
export default ProductList;
