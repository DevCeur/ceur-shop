import { SpecialText } from "../special-text";

export const ProductCard = () => {
  return (
    <div className="group aspect-square md:aspect-auto bg-neutral-100 hover:bg-neutral-200 p-6 md:p-10  transition-all duration-150">
      <div className="w-full h-full xl:opacity-0 xl:group-hover:opacity-100 flex flex-col justify-between transition-all duration-150">
        <h3 className="text-3xl font-medium uppercase">Product</h3>

        <div className="w-full flex justify-between items-center transition-all duration-150">
          <button>
            <SpecialText>buy</SpecialText>
          </button>
          <button>
            <SpecialText>Add to Cart</SpecialText>
          </button>
        </div>
      </div>
    </div>
  );
};
