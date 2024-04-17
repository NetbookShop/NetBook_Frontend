import { NavProps } from "../../Utils/Types";
import "./Catalog.css"
import { ApiConfig, asFileUrl } from "../../Gateway/Config";
import { Link } from "react-router-dom";
import { Product, ProductApi } from 'restclient'
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


const CatalogPage: React.FC<NavProps> = (props: NavProps) => { 
  const [Products, SetProducts] = useState<Product[]>();
  const [product, SetProduct] = useState<Product>();
  const [cookies] = useCookies(["cart"]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [ram, setRam] = useState<number[]>([]);
  const [selectedRAM, setSelectedRAM] = useState<number[]>([]);
  const [cpu, setCPU] = useState<string[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<string[]>([]);
  const [gpu, setGPU] = useState<string[]>([]);
  const [selectedGPU, setSelectedGPU] = useState<string[]>([]);
  const [resolution, setResolution] = useState<string[]>([]);
  const [selectedResolution, setSelectedResolution] = useState<string[]>([]);
  const [dtype, setDType] = useState<string[]>([]);
  const [selectedDType, setSelectedDType] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<number[]>([]);
  const [selectedRefresh, setSelectedRefresh] = useState<number[]>([]);
  const [diagonal, setDiagonal] = useState<number[]>([]);
  const [selectedDiagonal, setSelectedDiagonal] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minSSD, setMinSSD] = useState<number>(0);
  const [maxSSD, setMaxSSD] = useState<number>(Infinity);


  useEffect(() => {        
    const Product = new ProductApi(ApiConfig)
    const getData = async () => { 
        try { 
            let response = await Product.getproducts();
            SetProducts(response.data);
            let uniqueBrands = Array.from(new Set(response.data.map(product => String(product.brand))));
            let uniqueRAMCapacities = Array.from(new Set(response.data.map(product => Number(product.ramCapacity))));
            let uniqueCPU = Array.from(new Set(response.data.map(product => String(product.processor))));
            let uniqueGPU = Array.from(new Set(response.data.map(product => String(product.gpu))));
            let uniqueResolution = Array.from(new Set(response.data.map(product => String(product.displayResolution))));
            let uniqueDType = Array.from(new Set(response.data.map(product => String(product.displayType))));
            let uniqueRefresh = Array.from(new Set(response.data.map(product => Number(product.refreshRate))));
            let uniqueDiagonal = Array.from(new Set(response.data.map(product => Number(product.displayDiagonal))));
            setBrands(uniqueBrands);
            setRam(uniqueRAMCapacities);
            setCPU(uniqueCPU);
            setGPU(uniqueGPU);
            setResolution(uniqueResolution);
            setDType(uniqueDType);
            setRefresh(uniqueRefresh);
            setDiagonal(uniqueDiagonal);
        } catch (e) { 
            console.error(e)
        }
    }

    getData()
  }, [props.user])

  const addToCart = () => {
    if (product) {
      document.cookie = `cart=${JSON.stringify([...(cookies.cart || []), product])}`;
    }
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setMinPrice(isNaN(value) ? 0 : value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      setMaxPrice(isNaN(value) ? Infinity : value);
  };

    // Функция фильтрации товаров по цене
  const filterProductsByPrice = (Products: Product[] | undefined) => {
    if (!Products) return [];
    return Products.filter(Product => Product.price !== undefined && Product.price >= minPrice && Product.price <= maxPrice);
  };

  // Применение фильтрации при изменении цены
  useEffect(() => {
    setFilteredProducts(filterProductsByPrice(Products));
  }, [minPrice, maxPrice, Products]);

  const handleMinSSDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setMinSSD(isNaN(value) ? 0 : value);
  };

  const handleMaxSSDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      setMaxSSD(isNaN(value) ? Infinity : value);
  };

    // Функция фильтрации товаров по SSD
  const filterProductsBySSD = (Products: Product[] | undefined) => {
    if (!Products) return [];
    return Products.filter(Product => Product.ssdCapacity !== undefined && Product.ssdCapacity >= minSSD && Product.ssdCapacity <= maxSSD);
  };

  // Применение фильтрации при изменении SSD
  useEffect(() => {
    setFilteredProducts(filterProductsBySSD(Products));
  }, [minSSD, maxSSD, Products]);



  const filterProductsByBrand = () => {
    if (selectedBrands.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedBrands.includes(Product.brand || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleBrandChange = (brand: string) => {
    const updatedSelectedBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter(selectedBrand => selectedBrand !== brand) // Удаление бренда из списка выбранных, если он уже выбран
        : [...selectedBrands, brand]; // Добавление бренда в список выбранных, если он не выбран
    setSelectedBrands(updatedSelectedBrands);
  };

  useEffect(() => {
    filterProductsByBrand();
  }, [selectedBrands, Products]);

  const filterProductsByClass = () => {
    if (selectedClasses.length === 0) {
        // Если не выбраны классы ноутбуков, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным классам ноутбуков
        const filtered = (Products || []).filter(Product => selectedClasses.includes(Product.description || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleClassChange = (selectedClass: string) => {
      const updatedSelectedClasses = selectedClasses.includes(selectedClass)
          ? selectedClasses.filter(cls => cls !== selectedClass)
          : [...selectedClasses, selectedClass];
      setSelectedClasses(updatedSelectedClasses);
  };

  useEffect(() => {
    filterProductsByClass();
  }, [selectedClasses, Products]);

  const filterProductsByRam = () => {
    if (selectedRAM.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedRAM.includes(Number(Product.ramCapacity)));
        setFilteredProducts(filtered);
    }
  };

  // Обработчик изменения выбранных объемов оперативной памяти
  const handleRAMChange = (capacity: number) => {
      const newSelectedRAM = selectedRAM.includes(capacity)
          ? selectedRAM.filter(selectedRAM => selectedRAM !== capacity)
          : [...selectedRAM, capacity];
      setSelectedRAM(newSelectedRAM);
  };

  useEffect(() => {
    filterProductsByRam();
  }, [selectedRAM, Products]);

  const filterProductsByCPU = () => {
    if (selectedCPU.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedCPU.includes(Product.processor || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleCPUChange = (cpu: string) => {
    const updatedSelectedCPU = selectedCPU.includes(cpu)
        ? selectedCPU.filter(selectedCPU => selectedCPU !== cpu) // Удаление бренда из списка выбранных, если он уже выбран
        : [...selectedCPU, cpu]; // Добавление бренда в список выбранных, если он не выбран
    setSelectedCPU(updatedSelectedCPU);
  };

  useEffect(() => {
    filterProductsByCPU();
  }, [selectedCPU, Products]);

  const filterProductsByGPU = () => {
    if (selectedGPU.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedGPU.includes(Product.gpu || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleGPUChange = (gpu: string) => {
    const updatedSelectedGPU = selectedGPU.includes(gpu)
        ? selectedGPU.filter(selectedGPU => selectedGPU !== gpu) // Удаление бренда из списка выбранных, если он уже выбран
        : [...selectedGPU, gpu]; // Добавление бренда в список выбранных, если он не выбран
    setSelectedGPU(updatedSelectedGPU);
  };

  useEffect(() => {
    filterProductsByGPU();
  }, [selectedGPU, Products]);

  const filterProductsByResolution = () => {
    if (selectedResolution.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedResolution.includes(Product.displayResolution || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleResolutionChange = (resolution: string) => {
    const updatedSelectedResolution = selectedResolution.includes(resolution)
        ? selectedResolution.filter(selectedResolution => selectedResolution !== resolution) // Удаление бренда из списка выбранных, если он уже выбран
        : [...selectedResolution, resolution]; // Добавление бренда в список выбранных, если он не выбран
    setSelectedResolution(updatedSelectedResolution);
  };

  useEffect(() => {
    filterProductsByResolution();
  }, [selectedResolution, Products]);

  const filterProductsByDType = () => {
    if (selectedDType.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedDType.includes(Product.displayType || ''));
        setFilteredProducts(filtered);
    }
  };

  const handleDTypeChange = (dtype: string) => {
    const updatedSelectedDType = selectedDType.includes(dtype)
        ? selectedDType.filter(selectedDType => selectedDType !== dtype) // Удаление бренда из списка выбранных, если он уже выбран
        : [...selectedDType, dtype]; // Добавление бренда в список выбранных, если он не выбран
    setSelectedDType(updatedSelectedDType);
  };

  useEffect(() => {
    filterProductsByDType();
  }, [selectedDType, Products]);

  const filterProductsByRefresh = () => {
    if (selectedRefresh.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedRefresh.includes(Number(Product.refreshRate)));
        setFilteredProducts(filtered);
    }
  };

  // Обработчик изменения выбранных объемов оперативной памяти
  const handleRefreshChange = (refresh: number) => {
      const newSelectedRefresh = selectedRefresh.includes(refresh)
          ? selectedRefresh.filter(selectedRefresh => selectedRefresh !== refresh)
          : [...selectedRefresh, refresh];
      setSelectedRefresh(newSelectedRefresh);
  };

  useEffect(() => {
    filterProductsByRefresh();
  }, [selectedRefresh, Products]);

  const filterProductsByDiagonal = () => {
    if (selectedDiagonal.length === 0) {
        // Если не выбраны бренды, отображаем все товары
        setFilteredProducts(Products || []);
    } else {
        // Иначе, отфильтровываем товары по выбранным брендам
        const filtered = (Products || []).filter(Product => selectedDiagonal.includes(Number(Product.displayDiagonal)));
        setFilteredProducts(filtered);
    }
  };

  // Обработчик изменения выбранных объемов оперативной памяти
  const handleDiagonalChange = (diagonal: number) => {
      const newSelectedDiagonal = selectedDiagonal.includes(diagonal)
          ? selectedDiagonal.filter(selectedDiagonal => selectedDiagonal !== diagonal)
          : [...selectedDiagonal, diagonal];
      setSelectedDiagonal(newSelectedDiagonal);
  };

  useEffect(() => {
    filterProductsByDiagonal();
  }, [selectedDiagonal, Products]);

    return (
    <div className='catalog'>
        <div className='container'>
          <h1>Каталог ноутбуков</h1>
            <aside className='sidebar'>
              <section className='filter'>
                <h2>Фильтры</h2>
                <div className='filter_item_num'>
                  <h3>Цена</h3>
                  <input
                      type="number"
                      className='input_num'
                      placeholder='От'
                      value={minPrice}
                      onChange={handleMinPriceChange}
                  />
                  <input
                      type="number"
                      className='input_num'
                      placeholder='До'
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                  />
                </div>
                <div className='filter_item'>
                  <h3>Бренды</h3>
                  {brands.map(brand => (
                    <label key={brand}>
                        <input
                            type='checkbox'
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                        /> {brand}
                    </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Класс ноутбука</h3>
                  <label>
                    <input
                        type="checkbox"
                        className='checkbox'
                        onChange={() => handleClassChange('Игровой')}
                    /> Игровой
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          className='checkbox'
                          onChange={() => handleClassChange('Офисный')}
                      /> Офисный
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          className='checkbox'
                          onChange={() => handleClassChange('MacBook')}
                      /> MacBook
                  </label>
                </div>
                <div className='filter_item'>
                  <h3>Оперативнаая память, ГБ</h3>
                  {ram.map(capacity => (
                      <label key={capacity}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedRAM.includes(capacity)}
                              onChange={() => handleRAMChange(capacity)}
                          /> {capacity} ГБ
                      </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Процессор</h3>
                  {cpu.map(cpu => (
                      <label key={cpu}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedCPU.includes(cpu)}
                              onChange={() => handleCPUChange(cpu)}
                          /> {cpu}
                      </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Видеокарта</h3>
                  {gpu.map(gpu => (
                      <label key={gpu}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedGPU.includes(gpu)}
                              onChange={() => handleGPUChange(gpu)}
                          /> {gpu}
                      </label>
                  ))}
                </div>
                <div className='filter_item_num'>
                  <h3>Объем SSD</h3>
                  <input
                      type="number"
                      className='input_num'
                      placeholder='От'
                      value={minSSD}
                      onChange={handleMinSSDChange}
                  />
                  <input
                      type="number"
                      className='input_num'
                      placeholder='До'
                      value={maxSSD}
                      onChange={handleMaxSSDChange}
                  />
                </div>
                <div className='filter_item'>
                  <h3>Разрешение дисплея</h3>
                  {resolution.map(resolution => (
                      <label key={resolution}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedResolution.includes(resolution)}
                              onChange={() => handleResolutionChange(resolution)}
                          /> {resolution}
                      </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Тип дисплея</h3>
                  {dtype.map(dtype => (
                      <label key={dtype}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedDType.includes(dtype)}
                              onChange={() => handleDTypeChange(dtype)}
                          /> {dtype}
                      </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Частота обновления</h3>
                  {refresh.map(refresh => (
                      <label key={refresh}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedRefresh.includes(refresh)}
                              onChange={() => handleRefreshChange(refresh)}
                          /> {refresh} ГЦ
                      </label>
                  ))}
                </div>
                <div className='filter_item'>
                  <h3>Диагональ дислея</h3>
                  {diagonal.map(diagonal => (
                      <label key={diagonal}>
                          <input
                              type="checkbox"
                              className='checkbox'
                              checked={selectedDiagonal.includes(diagonal)}
                              onChange={() => handleDiagonalChange(diagonal)}
                          /> {diagonal}"
                      </label>
                  ))}
                </div>
              </section>
            </aside>
            <article className='mainpart'>
              <div className='product_cards'>
                {filteredProducts.map(product => (
                  <div className='product_card_' key={product.id}>
                      <Link to={`/product/${product.id}`}>
                          <div className='product_card_img'>
                              <img src={asFileUrl(product.photo?.id) || ''} alt='' />
                          </div>
                      </Link>
                      <Link to={`/product/${product.id}`}>
                          <h2>{product.name}</h2>
                      </Link>
                      <div className='product_card_items'>
                          <div className='price'>
                              <p>{product.price} ₸</p>
                              <Link to={`/product/${product.id}`}>
                                  <button>Подробнее</button>
                              </Link>
                          </div>
                      </div>
                  </div>
                  ))}
              </div>
          </article>
        </div>
    </div>
    )
}

export default CatalogPage; 