import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/Ui/Model";
import { categories, colors, formInputsList, productList } from "./components/data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/Ui/ErrorMessage";
import CircleColor from "./components/Ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/Ui/Select";
import { productName } from "./type";
import toast from "react-hot-toast";
import HeroSection from './components/Ui/HeroSection';
import FoterComponent from "./components/Ui/Footer";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({title: "",description: "", imageURL: "",  price: ""});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdite, setOpenEdite] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([])
  const [selectedCategory,setSelectedCategory]=useState(categories[0]) 
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  
  const [productToEdit ,setProductToEdit]=useState<IProduct>(defaultProductObj);
  

  
  //**renders all products */


  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditeModal = () => setOpenEdite(false);
  const openEditeModal = () => setOpenEdite(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]:"",
    })
  };
 
  const changeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]:"",
    })
  };
  //cancle function

  const oncancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  //submit handler function

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts(prev=>[{...product,id:uuid(),colors:tempColor},...prev])
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
  };

  //edite submit hundler 
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
  const updatedProducts=[...products]
  updatedProducts[productToEditIdx]={...productToEdit,colors:tempColor.concat(productToEdit.colors)};
  setProducts(updatedProducts);
  
    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditeModal();
  };
  
  const renderProductList = products.map((product,idx) => (
   
        <ProductCard key={product.id}
         product={product}
         setProductToEdit={setProductToEdit}
          openEditeModal={openEditeModal} 
          idx={idx}
          setproductToEditIdx={setProductToEditIdx}
          
          />

       
  ));
  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const renderFormList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="text-sm font-medium text-gray-700 mb-1"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={changeHandler}
      />
  <ErrorMessage msg={errors[input.name]}/>
    </div>
  ));
const renderCircleColor =colors.map(color=> <CircleColor key={color} color={color} onClick={()=>{
  if(tempColor.includes(color)){
    setTempColor(prev=>prev.filter(item=>item !== color));
    return;
  }
  if(productToEdit.colors.includes(color)){
    setTempColor(prev=>prev.filter(item=>item !== color));
    return;
  }
  setTempColor((prev)=>[...prev, color]);

}}/>)

const renderProductEditWithErrorMsg=(id:string,lable:string,name:productName)=>{
  return(
    <div className="flex flex-col">
    <label
      htmlFor={id}
      className="text-sm font-medium text-gray-700 mb-1"
    >
     {lable}
    </label>
    <Input
      type="text"
      id={id}
      name={name}
      value={productToEdit[name]}
      onChange={changeEditHandler}
    />
<ErrorMessage msg={errors[name]}/>
  </div>
  )
}


  return (
    
    <main className="container">
      <div className="Hero z-10">
        <HeroSection/>
      </div>
      <br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Add Products
      </Button>

      <div className=" m-5 grid grid-cols-1 gap-2 md:gap-3 p-2 rounded-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {renderProductList}
      </div>
      {/** Model open  */}
      <Model isOpen={isOpen} closeModal={closeModal} title="Add New Product ">
        <form className="space-y-2" onSubmit={submitHandler}>
          {renderFormList}
          <Select setSelected ={setSelectedCategory} selected={selectedCategory}/>
          <div className="flex  flex-wrap items-center my-4 space-x-1">
          {renderCircleColor}
          </div>
         
          <div className="flex flex-wrap items-center my-4  space-x-1">
          {tempColor.map(color=>(
            <span key={color} style={{backgroundColor:color}} className="p-1 mr-1 text-xs rounded-md mb-1 text-white">
              {color}
              </span>
          ))}     
          </div>
             
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-blue-500 ">Submit</Button>
            <Button
              className="bg-gray-400 hover:bg-red-500 "
              onClick={oncancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>

       {/** Edite Model open  */}
       <Model isOpen={isOpenEdite} closeModal={closeEditeModal} title="Edit This Product ">
        <form className="space-y-2" onSubmit={submitEditHandler}>
        
             {renderProductEditWithErrorMsg('title','product Title','title')}
             {renderProductEditWithErrorMsg('description','product desciption','description')}
             {renderProductEditWithErrorMsg('imageURL','product ImageURL','imageURL')}
             {renderProductEditWithErrorMsg('price','product price','price')}


         
          
          <Select selected={productToEdit.category} setSelected ={(value)=>setProductToEdit({...productToEdit,category:value})}  />
          <div className="flex  flex-wrap items-center my-4 space-x-1">
          {renderCircleColor}
          </div>
         
          <div className="flex flex-wrap items-center my-4  space-x-1">
          {tempColor.concat(productToEdit.colors).map(color=>(
            <span key={color} style={{backgroundColor:color}} className="p-1 mr-1 text-xs rounded-md mb-1 text-white">
              {color}
              </span>
          ))}     
          </div>
             
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-blue-500 ">Submit</Button>
            <Button
              className="bg-gray-400 hover:bg-red-500 "
              onClick={oncancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
       {/* DELETE PRODUCT CONFIRM MODAL */}
       <Model
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Model>
      <div className="Footer pt-2 mt-4 justify-around">
        <FoterComponent/>
      </div>
    </main>
  );
};

export default App;
