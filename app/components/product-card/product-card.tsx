export const ProductCard = () => {
  return (
    <div className="group aspect-square md:aspect-auto bg-neutral-100 hover:bg-neutral-200 p-6 md:p-10 flex flex-col justify-between transition-all duration-150">
      <div className="md:opacity-0 md:group-hover:opacity-100 transition-all duration-150">
        <h3 className="text-3xl font-medium uppercase">Product</h3>
      </div>

      <div className="md:opacity-0 md:group-hover:opacity-100 w-full flex justify-between items-center transition-all duration-150">
        <button>Buy</button>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};
