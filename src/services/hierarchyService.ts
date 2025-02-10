import { ICitizen } from "../models/citizenModel";
import Citizen from "../models/citizenModel";
import City from "../models/citiesModel";
import { ICities } from "../models/citiesModel";

export const buildHierarchy = async (): Promise<any[]> => {
  const citizens: ICitizen[] = await Citizen.find();
  const cities: ICities[] = await City.find();

  const cityDataMap = new Map<number, { name: string; data: any }>();
  cities.forEach((city) => {
    cityDataMap.set(city.id, { name: city.name, data: city.data });
  });

  const root: any[] = [];

 
  function createNode(name: string, type: string) {
    return {
      name,
      type,
      children: [] as any[], 
    };
  }


  citizens.forEach((citizen) => {
    let currentLevel: any[] = root; 

    Object.entries(citizen.groups).forEach(([type, group]) => {
      if (typeof group === "object" && "name" in group) {
        const groupName = group.name;
        const groupType = group.type; 

       
        let node = currentLevel.find((n) => n.name === groupName);

        if (!node) {
          node = createNode(groupName, groupType);
          currentLevel.push(node); 
        }

        currentLevel = node.children;
      }
    });

    const cityInfo = cityDataMap.get(citizen.id);
    const citizenData = {
        id: citizen._id,
      name: citizen.name,
      type: "citizen",
      city: cityInfo ? cityInfo.name : null,
      data: cityInfo ? cityInfo.data : null,
    };

    currentLevel.push(citizenData);
  });

  return root;
};
