import { useState, useRef } from "react";

interface BaseItem {
  id: string;
  name: string;
  image: string | null; // image URL
}

interface UnrankedItem {
  ranked: false;
}

interface RankedItem {
  ranked: true;
  position: number;
  tierId: string;
}

type Item = 
  | (BaseItem & UnrankedItem)
  | (BaseItem & RankedItem);

interface ItemProps {
  item: Item;
  isDragging: boolean;
  onDragStart: (itemId:string) => void;
  onDragEnd: () => void;
}

interface Tier {
  id: string;
  label: string;
  color: string; //hex-code
}

interface TierProps {
  tier: Tier;
  items: Item[];
  onLabelEditRequest: (tierId: string) => void;
  onDragEnter: (tierId: string) => void;
  onDragLeave: () => void;
  onItemDrop:  (tierId: string) => void;
}




export default function Tierlist() { 
  const [currUser, setUser] = useState<string | null>(
    () => localStorage.getItem("tierlistUser")
  );
  //const [items, setItems] = useState<Item[]>([]);
  //const [tiers, setTiers] = useState<Map<string, Tier>>(new Map());
  
  const [tiers, setTiers] = useState<Map<string, Tier>>(new Map([
  ["s", { id: "s", label: "S", color: "#FF4757" }],
  ["a", { id: "a", label: "A", color: "#FF6B35" }],
  ["b", { id: "b", label: "B", color: "#FFD32A" }],
  ["c", { id: "c", label: "C", color: "#2ED573" }],
]));

const [items, setItems] = useState<Item[]>([
  { id: "1", name: "Kid A", image: null, ranked: true, tierId: "s", position: 0 },
  { id: "2", name: "Blonde", image: null, ranked: true, tierId: "a", position: 0 },
  { id: "3", name: "Vespertine", image: null, ranked: true, tierId: "b", position: 0 },
  { id: "4", name: "Madvillainy", image: null, ranked: false },
  { id: "5", name: "In Rainbows", image: null, ranked: false },
  { id: "6", name: "Titanic Rising", image: null, ranked: false },
]);

  const [hoveredTierId, setHoveredTierId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [tierEditingId, setTierEditingId] = useState<string | null>(null);

  const handleItemOnDragStart = (itemId:string) => {
      // When an item starts being dragged, it's edges should be highlighted, and the item
      // should follow the mouse cursor's position
      // draggedId should be set to itemId
      setDraggingId(itemId);
  };

  const handleItemOnDragEnd = () => {
    // If it is not dropped on a tier, it should go to it's last known position (another tier or unranked section)
    // hoveredTierId should be wiped
    // draggedId should be set to null
    setHoveredTierId(null);
    setDraggingId(null);
  };

  const handleTierOnLabelEditRequest = (tierId: string) => {
    setTierEditingId(tierId);
  };

  const handleTierOnLabelEditSubmit = (tierId: string, color: string, label: string) => {
    // change Tier object to update color, label
    if (tiers.has(tierId)){
      setTiers(prev => {
        let updated: Map<string, Tier> = new Map(prev);
        updated.set(tierId, {
          id: tierId,
          color: color,
          label: label
        });
        return updated;
      })
    }
    
    setTierEditingId(null);
  };

  const handleTierOnDragEnter = (tierId: string | null) => {
    setHoveredTierId(tierId);
  };

  const handleTierOnDragLeave = () => {
    setHoveredTierId(null);
  };

  const handleTierOnItemDrop = (tierId: string) => {
    // item in draggedId should be added to tier
    if (draggingId !== null) {
      if (tiers.has(tierId)) {
        setItems(prev => prev.map((itm: Item): Item => {
          if (draggingId === itm.id){
            return {
              ...itm,
              ranked: true,
              tierId: tierId,
              position: 0, // TODO
            };
            } else {
              return itm;
            }
          }))
      } else {
        console.log("Error!! Tier with tierId " + tierId + " not found!")
      }

      // draggedId should be cleared
      // Edges on entire tier should no longer be highlighted (same as onDragLeave)
      setDraggingId(null);
      setHoveredTierId(null);
    } 
  };

  const handleUnrankedOnItemDrop = () => {
    // item in draggedId should be added to unranked
    if (draggingId !== null) {
      setItems(prev => prev.map((itm: Item): Item => {
        if (draggingId === itm.id){
          return {
            id: itm.id,
            name: itm.name,
            image: itm.image,
            ranked: false,
          };
        } else {
          return itm;
        }
      }))
    }

    // draggedId should be cleared
    // Edges on entire tier should no longer be highlighted (same as onDragLeave)
    setDraggingId(null);
    setHoveredTierId(null);
  };
  


  return (
    <div className="relative w-full"> {/*container*/}
      <h1 className="italic text-cream leading-tight text-center"> {/*title*/}
        <span>{"Album Club"}</span>
      </h1>
      <div className="flex flex-col justify-start flex-wrap items-center"> {/* tiers section */}
        { Array.from(tiers.values()).map((tier) => (
          <div key={tier.id} className="flex flex-row justify-start"> {/* tier */}
            <div
              style={{backgroundColor: tier.color}}
            > {/* label */}
            <p>{tier.label}</p>
            </div>
            <div
              className="flex flex-wrap bg-gray-800 min-h-[48px] w-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => handleTierOnDragEnter(tier.id)}
              onDragLeave={() => handleTierOnDragLeave()}
              onDrop={() => handleTierOnItemDrop(tier.id)}
            > {/* placement section */}
              {items.map((item) => {
                if (item.ranked && item.tierId === tier.id) {
                  return <div 
                            key={item.id}
                            draggable="true"
                            onDragStart={() => handleItemOnDragStart(item.id)}
                            onDragEnd={() => handleItemOnDragEnd()}
                          >
                            {item.name}
                          </div>;
                }
                return null;
              })}
            </div>
          </div>))
        }
        <div
            className="flex flex-wrap bg-gray-800 min-h-[48px] w-[400px]"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleTierOnDragEnter(null)}
            onDragLeave={() => handleTierOnDragLeave()}
            onDrop={() => handleUnrankedOnItemDrop()}
        >
          {items.map((item) => {
            if (!item.ranked) {
              return <div 
                        key={item.id}
                        draggable="true"
                        onDragStart={() => handleItemOnDragStart(item.id)}
                        onDragEnd={() => handleItemOnDragEnd()}
                      >
                        {item.name}
                      </div>;
            }
            return null;
          })}
        </div>
      </div>
      
    </div>
  )
}