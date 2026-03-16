import { useState } from "react";
import Image from "next/image";

interface BaseItem {
  id: string;
  name: string;
  image: string; // image URL
}

interface UnrankedItem {
  ranked: false;
}

interface RankedItem {
  ranked: true;
  tierId: string;
}

type Item = 
  | (BaseItem & UnrankedItem)
  | (BaseItem & RankedItem);

type LabelData = {
  label: string,
  color: string
}

interface ItemProps {
  item: Item;
  isDragging: boolean;
  onDragStart: (itemId: string) => void;
  onDragEnd: () => void;
  onDrop: () => void;
}

function ItemCard({ item, isDragging, onDragStart, onDragEnd,  onDrop}: ItemProps) {
  return (
    <div
      className={isDragging? "opacity-50": ""}
      draggable="true"
      onDragOver={(e) => e.preventDefault()}
      onDragStart={() => onDragStart(item.id)}
      onDragEnd={onDragEnd}
      onDrop={(e) => { e.stopPropagation(); onDrop(); }}
    >
        {item.image !== "" ? 
        (
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="object-cover"
            unoptimized={/\.(gif)$/i.test(item.image)}
            priority
          />
        ) : (
          <div className="flex flex-wrap">{item.name}</div>
        )}
    </div>
  );
}

interface Tier {
  id: string;
  label: string;
  color: string; //hex-code
}

interface TierProps {
  tier: Tier;
  items: Item[];
  draggingId: string | null;
  itemOnDragStart: (itemId: string) => void; 
  itemOnDragEnd: () => void;
  onLabelEditRequest: (tierId: string) => void;
  onDragEnter: (tierId: string) => void;
  onDragLeave: () => void;
  onItemDrop:  (tierId: string, itemId: string) => void;
}

function TierSection({
  tier, 
  items,
  draggingId, 
  itemOnDragStart, 
  itemOnDragEnd, 
  onLabelEditRequest, 
  onDragEnter, 
  onDragLeave, 
  onItemDrop}: TierProps){
    return (
      <div 
            key={tier.id} 
            className="flex flex-row justify-start w-full"> {/* tier */}
            <div
              style={{backgroundColor: tier.color}}
              onClick={() => onLabelEditRequest(tier.id)}
              className="w-16"
            > {/* label */}
              <p>{tier.label}</p>
            </div>
            <div
              className="flex-1 flex-wrap bg-gray-800 min-h-[48px]"
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => onDragEnter(tier.id)}
              onDragLeave={() => onDragLeave()}
              onDrop={() => onItemDrop(tier.id, "")}
            > {/* placement section */}
              {items.map((item) => {
                if (item.ranked && item.tierId === tier.id) {
                  return <ItemCard
                            key={item.id}
                            item={item}
                            isDragging={draggingId === item.id}
                            onDragStart={itemOnDragStart}
                            onDragEnd={itemOnDragEnd}
                            onDrop={() => onItemDrop(tier.id, item.id)}
                         />              
                }
                return null;
              })}
            </div>
          </div>
    )
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
  { id: "1", name: "Kid A", image: "/images/covers/kida.png", ranked: true, tierId: "s"},
  { id: "2", name: "Blonde", image: "/images/covers/blonde.jpeg", ranked: true, tierId: "a"},
  { id: "3", name: "Vespertine", image: "/images/covers/vespertine.png", ranked: true, tierId: "b"},
  { id: "4", name: "Madvillainy", image: "/images/covers/madvillainy.png", ranked: false },
  { id: "5", name: "In Rainbows", image: "/images/covers/inrainbows.png", ranked: false },
  { id: "6", name: "Titanic Rising", image: "", ranked: false },
]);

  const [hoveredTierId, setHoveredTierId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [tierEditingId, setTierEditingId] = useState<string | null>(null);
  const [draftLabelData, setDraftLabelData] = useState<LabelData>({label: "", color: ""});

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
    console.log("Wow!")
    let tier: Tier | undefined = tiers.get(tierId);
    if (tier) {
      setDraftLabelData({label: tier.label, color: tier.color});
    } else {
      console.log("Error! Invalid tier trying to be edited!");
    }

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

  const handleTierOnItemDrop = (tierId: string, targetItemId: string) => {
    // item in draggedId should be added to tier
    if (draggingId !== null) {
      if (tiers.has(tierId)) {

        let items_copy: Item[] = items.filter((itm: Item) => {return itm.id !== draggingId})
        let to_move: Item[] = items.filter((itm: Item) => {return itm.id === draggingId})
        let to_insert:Item = {
          ...to_move[0],
          ranked: true,
          tierId: tierId
        }
        

        let targetIdx: number = items.findIndex((itm: Item) => {return targetItemId === itm.id});
        const currIdx: number = items.findIndex((itm: Item) => {return draggingId === itm.id});
        
        let offset: number =  currIdx < targetIdx ? 1: 0;
        targetIdx = items_copy.findIndex((itm: Item) => {return targetItemId === itm.id});
        if (targetIdx === -1) {
          items_copy.push(to_insert);
        } else {
          items_copy.splice(targetIdx + offset, 0, to_insert);
        }
        
        setItems(items_copy);
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
      <div className="relative mx-auto flex flex-col justify-start flex-wrap items-center w-full max-w-xl"> {/* tiers section */}
        {tierEditingId && 
        <div className="flex-col items-center justify-center absolute inset-0 z-50 bg-black/50">
          <input type="text" id="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
          <input
  type="color"
  id="color-select"
  className="mt-1 h-10 w-16 p-0 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 hover:cursor-pointer"
/>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Red Button
          </button>

        </div>}
        { Array.from(tiers.values()).map((tier) => (
          <TierSection
            key={tier.id}
            tier={tier}
            items={items}
            draggingId={draggingId}
            itemOnDragStart={handleItemOnDragStart}
            itemOnDragEnd={handleItemOnDragEnd}
            onLabelEditRequest={handleTierOnLabelEditRequest}
            onDragEnter={handleTierOnDragEnter}
            onDragLeave={handleTierOnDragLeave}
            onItemDrop={handleTierOnItemDrop}
          />))
        }
        <div
            className="flex flex-wrap bg-gray-800 min-h-[48px] w-full"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleTierOnDragEnter(null)}
            onDragLeave={() => handleTierOnDragLeave()}
            onDrop={() => handleUnrankedOnItemDrop()}
        >
          {items.map((item) => {
            if (!item.ranked) {
              return <ItemCard
                            key={item.id}
                            item={item}
                            isDragging={draggingId === item.id}
                            onDragStart={handleItemOnDragStart}
                            onDragEnd={handleItemOnDragEnd}
                            onDrop={() => handleUnrankedOnItemDrop()}
                         />  
            }
            return null;
          })}
        </div>
      </div>
    </div>
  )
}