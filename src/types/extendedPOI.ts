export interface extendedPOI {
  id: number
  name: string
  description: string
  city_id: number
  city_name: string
}
/* SQL querry:

SELECT 
  points.id, 
  points.name, 
  points.description, 
  points.city_id, 
  cities.name AS city_name
FROM 
  points
  LEFT JOIN cities ON points.city_id = cities.id;
  
*/
