import { ICitizen } from "../models/citizenModel";
import Citizen from "../models/citizenModel";
import City from "../models/citiesModel";
import { ICities } from "../models/citiesModel";
import Hierarchy, { IHierarchy } from "../models/hierarchyTypeModel";

function getTypeOrder(type: string, orderArray: string[]): number {
    return orderArray.indexOf(type);
}

function addNode(node: any[], name: string, type: string): any {
    let currentNode = node.find(n => n.name === name && n.type === type);
    if (!currentNode) {
        currentNode = { name, type, children: [] };
        node.push(currentNode);
    }
    return currentNode;
}

function addChildren(parent: any, children: any[]) {
    children.forEach(child => {
        parent.children.push(child);
    });
}

export const buildTree = async (): Promise<any[]> => {
    const citizens: ICitizen[] = await Citizen.find();
    const cities: ICities[] = await City.find();
    const orderArr: IHierarchy[] = await Hierarchy.find();
    orderArr.sort((a, b) => a.order - b.order);
    const sortedOrder = orderArr.map((item) => item.type);

    const cityDataMap = new Map<number, { name: string; data: any }>();
    cities.forEach((city) => {
        cityDataMap.set(city.id, { name: city.name, data: city.data });
    });

    const root: any[] = [];

    citizens.forEach((citizen) => {
        let currentLevel = root;

        Object.entries(citizen.groups).forEach(([type, group]) => {
            if (typeof group === "object" && "name" in group) {
                const groupName = group.name;
                const groupType = group.type;
                currentLevel = addNode(currentLevel, groupName, groupType).children;
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

    // Сортировка корневого уровня дерева по порядку типов
    root.sort(
        (a, b) =>
            getTypeOrder(a.type, sortedOrder) -
            getTypeOrder(b.type, sortedOrder)
    );

    return root;
};