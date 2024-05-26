import type { POI } from '@/types/POI'
import { defineStore } from 'pinia'

export const usePOIStore = defineStore({
  id: 'POI',
  state: () => ({
    POIs: [] as POI[],
    singlePOI: null as POI | null
  }),
  actions: {
    async getPOIs() {
      try {
        const response = await fetch('http://localhost:3000/points')
        const data = await response.json()
        if (data) {
          this.POIs = data
        }
      } catch (error) {
        console.log('Error fetching points: ', error)
      }
    },
    async getPOI(id: number) {
      try {
        const response = await fetch(`http://localhost:3000/points/${id}`)
        const data = await response.json()
        if (data) {
          this.singlePOI = data
        }
      } catch (error) {
        console.log('Error fetching point: ', error)
      }
    },
    async addPOI(POI: Partial<POI>) {
      try {
        const response = await fetch('http://localhost:3000/points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(POI)
        })
        const data = await response.json()
        if (data) {
          this.POIs.push(data)
          /* console.log(data) */
        }
      } catch (error) {
        console.error('Error adding point', error)
      }
    },
    async changePoint(id: Number, POI: Partial<POI>) {
      try {
        const response = await fetch(`http://localhost:3000/points/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(POI)
        })
        const data = await response.json()
        if (data) {
          const foundedPoint = this.POIs.find((pointInArray) => pointInArray.id === id)
          if (foundedPoint) {
            foundedPoint.name = data.name
            foundedPoint.description = data.description
            foundedPoint.city_id = data.city_id
          }
        }
      } catch (error) {
        console.error('Error changing point', error)
      }
    },
    async deletePoint(id: Number) {
      try {
        const response = await fetch(`http://localhost:3000/points/${id}`, {
          method: 'DELETE'
        })
        /* console.log(response) */
        if (response.status === 204) {
          const foundedPoint = this.POIs.find((pointInArray) => pointInArray.id === id)
          if (foundedPoint) {
            const index = this.POIs.indexOf(foundedPoint)
            this.POIs.splice(index, 1)
          }
        }
      } catch (error) {
        console.error('Error in delete point', error)
      }
    }
  }
})
