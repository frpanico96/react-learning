import { useState } from "react";

const PRODUCTS = 
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

const groupBy = (arr, prop) => 
{
  return arr.reduce((memo, x) => {
    if(!memo[x[prop]])
    {
      memo[x[prop]] = [];
    }
    memo[x[prop]].push(x);
    return memo;
  },{})
}


function ProductRow({product})
{
  const rowStyle = product.stocked ? 'product-row' : 'product-row out-of-stock';
  return(
    <div className={rowStyle}>
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  )
}

function ProductCategoryRow({products})
{
  const categoryRow = products.map((product) => 
    <ProductRow key={product.name} product={product}/>)
  return(
    <div className='product product-category'>
      <p className='product-category-name'>{products[0].category}</p>
      {categoryRow}
    </div>
  )
}

function ProductTable({products, filterText, inStockOnly})
{
  let prodToMap = products
  console.log(typeof inStockOnly);
  if(filterText)
  {
    prodToMap = prodToMap.filter(el => el.name.toLowerCase().includes(filterText.toLowerCase()));
  }
  if(inStockOnly)
  {
    prodToMap = prodToMap.filter(el => el.stocked === inStockOnly);
  }
  const prodByCategory = groupBy(prodToMap, 'category');
  console.log(prodByCategory['Fruits']);
  const result = [];
  for(const category in prodByCategory)
  {
    result.push(<ProductCategoryRow key={category} products={prodByCategory[category]}/>)
  }

  return(
    <div className='product product-table'>
      <div className='product product-table-names'>
        <p>Name</p>
        <p>Price</p>
      </div>
      {result}
    </div>
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockChange})
{
  return(
    <div className='product product-search-bar'>
      <input className='product product-search-input' 
        placeholder='Search...' 
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}></input>
      <div className='product product-search-checkbox'>
        <input type='Checkbox' 
          value={inStockOnly}
          onChange={e => onInStockChange(e.target.checked)}></input>
        <p>Only show products in stock</p>
      </div>
    </div>
  )
}

function FilterableProductTable({products})
{
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return(
    <div className='product product-container'>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockChange={setInStockOnly}></SearchBar>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}></ProductTable>
    </div>
  )
}

export default function ProductApp()
{
  return(
    <FilterableProductTable products={PRODUCTS}/>
  )
}