import { ICitizen } from "../models/citizenModel";
import Citizen from "../models/citizenModel";
import City from "../models/citiesModel";
import { ICities } from "../models/citiesModel";
import Hierarchy, { IHierarchy } from "../models/hierarchyTypeModel";

export const buildTree = async (): Promise<any[]> => {
    const citizens: ICitizen[] = await Citizen.find();
    const cities: ICities[] = await City.find();
    const orderArr: IHierarchy[] = await Hierarchy.find();
    orderArr.sort((a, b) => a.order - b.order);
    const sortedOrder = orderArr.map((item) => item.type);

    // Создаем Map для быстрого доступа к информации о городах
    const cityDataMap = new Map();
    cities.forEach((city) => {
        cityDataMap.set(city.id, { name: city.name, data: city.data });
    });

    const root: any[] = [];

    // Функция создания нового узла
    function createNode(name: string, type: string) {
        return {
            name,
            type,
            children: [],
        };
    }

    // Обработка каждого жителя
    citizens.forEach((citizen) => {
        let currentLevel = root;

        // Преобразуем groups из массива в объект, если необходимо
        const normalizedGroups = Array.isArray(citizen.groups)
            ? citizen.groups.reduce<
                  Record<string, { name: string; type: string }>
              >((acc, group) => {
                  if (
                      group &&
                      typeof group === "object" &&
                      "type" in group &&
                      "name" in group
                  ) {
                      acc[group.type] = group as { name: string; type: string };
                  }
                  return acc;
              }, {})
            : citizen.groups || {};

        // Сортируем группы в соответствии с sortedOrder
        const sortedGroups = Object.entries(normalizedGroups)
            .filter(([type]) => sortedOrder.includes(type)) // Оставляем только типы из sortedOrder
            .sort((a, b) => {
                const indexA = sortedOrder.indexOf(a[0]);
                const indexB = sortedOrder.indexOf(b[0]);
                return indexA - indexB; // Сортируем по индексу в sortedOrder
            });

        // Проходимся по отсортированным группам
        for (const [type, group] of sortedGroups) {
            if (typeof group === "object" && "name" in group) {
                const groupName = group.name;
                const groupType = group.type;

                // Проверяем, существует ли уже узел с таким именем и типом
                let node = currentLevel.find(
                    (n) => n.name === groupName && n.type === groupType
                );
                if (!node) {
                    node = createNode(groupName, groupType);
                    currentLevel.push(node); // Добавляем новый узел
                }
                currentLevel = node.children; // Переходим на следующий уровень
            }
        }

        // Добавляем информацию о жителе
        const cityInfo = cityDataMap.get(citizen.id);
        const citizenData = {
            id: citizen._id,
            name: citizen.name,
            type: "citizen",
            city: cityInfo ? cityInfo.name : null,
            data: cityInfo ? cityInfo.data : null,
        };

        // Если текущий уровень существует, добавляем жителя
        if (currentLevel) {
            currentLevel.push(citizenData);
        } else {
            console.warn(
                `Warning: No valid hierarchy found for citizen "${citizen.name}". Adding to root.`
            );
            root.push(citizenData); // Если нет уровня, добавляем в корень
        }
    });

    return root;
};
