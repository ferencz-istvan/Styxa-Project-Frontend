/* import CityService from '@/service/city-service' */
import type { City } from '@/types/city'
import { defineStore } from 'pinia'

export const useCityStore = defineStore({
  id: 'city',
  state: () => ({
    /* CityService: new CityService('cities'), */
    cities: [] as City[],
    singleCity: null as City | null
  }),
  actions: {
    async getCities() {
      try {
        const response = await fetch('http://localhost:3000/cities')
        const data = await response.json()
        if (data) {
          this.cities = data
        }
      } catch (error) {
        console.log('Error fetching cities: ', error)
      }
    },
    async getCity(id: string) {
      try {
        const response = await fetch(`http://localhost:3000/cities/${id}`)
        const data = await response.json()
        if (data) {
          this.singleCity = data
        }
      } catch (error) {
        console.log('Error fetching city: ', error)
      }
    },
    async addCity(City: Partial<City>) {
      try {
        const response = await fetch('http://localhost:3000/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(City)
        })
        const data = await response.json()
        // const response = await this.cityService.addCity(city)
        if (data) {
          this.cities.push(data)
          console.log(data)
        }
      } catch (error) {
        console.error('Error adding city', error)
      }
    },
    async changeCity(id: Number, City: Partial<City>) {
      try {
        const response = await fetch(`http://localhost:3000/cities/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(City)
        })
        const data = await response.json()
        if (data) {
          const foundedCity = this.cities.find((cityInArray) => cityInArray.id === id)
          if (foundedCity) {
            foundedCity.name = data.name
            foundedCity.population = data.population
            foundedCity.description = data.description
          }
        }
      } catch (error) {
        console.error('Error changing city', error)
      }
    },
    async deleteCity(id: Number) {
      try {
        const response = await fetch(`http://localhost:3000/cities/${id}`, {
          method: 'DELETE'
        })
        /* console.log(response) */
        if (response.status === 204) {
          const foundedCity = this.cities.find((cityInArray) => cityInArray.id === id)
          if (foundedCity) {
            const index = this.cities.indexOf(foundedCity)
            this.cities.splice(index, 1)
          }
        }
      } catch (error) {
        console.error('Error in delete city', error)
      }
    }
  }
})
