import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css';

interface Car {
  make: string;
  model: string;
  year: string;
  fuel_type: string;
  horsepower: string;
  color: string;
  symbol: string;
  id: number;
}

function App() {
  const [carData, setCarData] = useState<Car[]>([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    fuel_type: '',
    horsepower: '',
    color: '',
  });
  console.log(formData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Car[]> = await axios.get(
          'http://localhost:3000/cars'
        );
        setCarData(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<Car> = await axios.post(
        'http://localhost:3000/cars',
        formData
      );

      setCarData([...carData, response.data]);
      setFormData({
        make: '',
        model: '',
        year: '',
        fuel_type: '',
        horsepower: '',
        color: '',
      });
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const carToDelete = carData[index];
      console.log(carToDelete);
      await axios.delete(`http://localhost:3000/cars/${carToDelete.id}`);

      setCarData((carData) => {
        const newCarData = [...carData];
        newCarData.splice(index, 1);
        return newCarData;
      });
    } catch (error) {
      console.error('delete error', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="newCarForm">
        <input
          className="input"
          type="text"
          name="make"
          value={formData.make}
          onChange={handleInputChange}
          placeholder="make"
        />
        <input
          className="input"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          placeholder="model"
        />
        <input
          className="input"
          type="text"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          placeholder="year"
        />
        <input
          className="input"
          type="text"
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleInputChange}
          placeholder="fuel_type"
        />
        <input
          className="input"
          type="text"
          name="horsepower"
          value={formData.horsepower}
          onChange={handleInputChange}
          placeholder="horsepower"
        />
        <input
          className="input"
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          placeholder="color"
        />
        <button type="submit">Add</button>
      </form>
      <div className="carWrapper">
        {carData.map((car, index) => (
          <div key={car.id} className="car-card">
            <img
              src={`https://www.carlogos.org/car-logos/${car.make}-logo.png`}
              alt=""
            />
            <div className="splitText">
              <h2>{car.make}</h2> <h2>{car.model}</h2>
            </div>
            <div className="splitText">
              <span>Year :</span>
              <span>{car.year}</span>
            </div>
            <div className="splitText">
              <span>Fuel Type :</span> <span>{car.fuel_type}</span>
            </div>
            <div className="splitText">
              <span>Horsepower :</span> <span>{car.horsepower}</span>
            </div>
            <div className="splitText">
              <span>Color :</span> <span>{car.color}</span>{' '}
            </div>
            <hr className='hr' />
            <div className="splitText">
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
