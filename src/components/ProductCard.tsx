import { txtSlicer } from '../utils/function';
import Image from './Image'
import Button from './Ui/Button'
import CircleColor from './Ui/CircleColor';
import { IProduct } from './interfaces'

interface Iprops {
  product:IProduct,
  setProductToEdit:(product:IProduct)=>void;
  openEditeModal:()=>void;
  idx:number;
  setproductToEditIdx:(value:number)=>void;

}

const ProductCard = ({product,setProductToEdit,openEditeModal,idx,setproductToEditIdx}:Iprops) => {
  const {title,category,description,imageURL,price,colors}=product;

  const onEdit =()=>{
    setProductToEdit(product);
    openEditeModal();
    setproductToEditIdx(idx);
  }
  
const renderCircleColor =colors.map(color=> <CircleColor key={color} color={color}
/>

)
const onRemove = () => {
  setProductToEdit(product);

};

  return (
    
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex-col" >
    <Image imageURL={imageURL} alt={"ProductName"} className="rounded-md mb-2"/>
   <h3>{title} </h3>
   <p>{txtSlicer(description)}</p>
 
   <div className="flex  flex-wrap items-center my-4 space-x-1">{renderCircleColor}</div>
   
          
   {/* <div className="flex items-center my-4 space-x-2">
   <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
   <span className="w-5 h-5 bg-amber-600 rounded-full cursor-pointer" />
   <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
   </div> */}
   
   <div className="flex items-center justify-between">
    <span> {price}</span>
    <Image imageURL={category.imageURL} 
    alt={category.name} className="w-10 h-10 rounded-full object-cover" />
   </div>
   
   <div className="flex items-center justify-between space-x-3 my-5">
   <Button className="bg-indigo-700 hover:bg-gradient-to-r from-cyan-500 to-blue-500 duration-500" onClick={onEdit}>Edit 🖋</Button>
   <Button className="bg-red-700  " onClick={onRemove}>Remove  ❌</Button>
   </div>

    </div>
  )
}

export default ProductCard
