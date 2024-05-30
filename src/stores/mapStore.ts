import type { cityMap } from '@/types/cityMap'
import { defineStore } from 'pinia'

export const useCityMapStore = defineStore({
  id: 'cityMap',
  state: () => ({
    cityMaps: [] as cityMap[],
    singleCityMap: null as cityMap | null
  }),
  actions: {
    async getCityMaps() {
      try {
        const response = await fetch('http://localhost:3000/citymaps')
        const data = await response.json()
        if (data) {
          this.cityMaps = data
        }
      } catch (error) {
        console.log('Error fetching maps: ', error)
      }
    },
    async getCityMap(id: number) {
      try {
        const response = await fetch(`http://localhost:3000/citymaps/${id}`)
        const data = await response.json()
        if (data) {
          this.singleCityMap = data
        }
      } catch (error) {
        console.log('Error fetching map: ', error)
      }
    },
    async addCityMap(ourMap: Partial<cityMap>) {
      console.log(ourMap)
      try {
        const response = await fetch('http://localhost:3000/citymaps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ourMap)
        })
        /* const data =  */ await response.json()
        /*  if (data) {
          this.getCityMaps()
        } */
      } catch (error) {
        console.error('Error adding map', error)
      }
    },
    async changeCityMap(id: Number, POI: Partial<cityMap>) {
      try {
        const response = await fetch(`http://localhost:3000/citymap/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(POI)
        })
        const data = await response.json()
        if (data) {
          /* const foundedPoint = this.POIs.find((pointInArray) => pointInArray.id === id)
          if (foundedPoint) {
            foundedPoint.name = data.name
            foundedPoint.description = data.description
            foundedPoint.city_id = data.city_id
          } */
          this.getCityMaps()
        }
      } catch (error) {
        console.error('Error changing map', error)
      }
    },
    async deleteCityMap(id: Number) {
      try {
        const response = await fetch(`http://localhost:3000/citymaps/${id}`, {
          method: 'DELETE'
        })
        if (response.status === 204) {
          const foundedPoint = this.cityMaps.find((pointInArray) => pointInArray.id === id)
          if (foundedPoint) {
            const index = this.cityMaps.indexOf(foundedPoint)
            this.cityMaps.splice(index, 1)
          }
        }
      } catch (error) {
        console.error('Error in delete map', error)
      }
    }
  }
})
