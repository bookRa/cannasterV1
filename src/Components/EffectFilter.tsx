import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Dropdown, Header, DropdownProps } from 'semantic-ui-react'
import { getProductCategories, getProductProperties } from "../API/ProdSearch";
import { IProperty, ICategory } from "../Interfaces/CommonInterfaces";

interface IOption {
    type: string,
    key: string,
    text: string,
    value: IProperty | ICategory
}

const myRenderLabel = (item:any) => {
    
    if(item.type === 'property'){
        const color = 'blue'
        const content = `${item.text}`
        return {
            color,
            content,
        }
    } else {
        const color = 'green'
        const content = `${item.text}`
        return {
            color,
            content,
        }
    }
    
}

interface EffectFilterProps{
    updateCats: Dispatch<SetStateAction<ICategory[]>>
    updateProps: Dispatch<SetStateAction<IProperty[]>>
}

const EffectFilter:React.FC<EffectFilterProps> = ({updateCats, updateProps}) => {
    const [options, setOptions] = useState<IOption[]>([])

    useEffect(()=>{
        const properties:IOption[] = getProductProperties().map((prop, idx) => (
            {
                type: 'property',
                key: `property${idx}`,
                text: `🔆${prop}`,
                value: prop
            }
            ))
        const categories:IOption[] = getProductCategories().map((cat, idx) => (
            {
                type: 'category',
                key: `category${idx}`,
                text: `🥦${cat}`,
                value: cat
            }
            ))
        setOptions([...properties, ...categories])

    },[])

    const handleLabelChanges = (event:any, data:DropdownProps) =>{
        const newCats = [] as ICategory[]
        const newProps = [] as IProperty[]
        const vals = data.value as (ICategory | IProperty)[]
        vals.forEach(v => {
            if(v in ICategory){newCats.push(v as ICategory)}
            if(v in IProperty){newProps.push(v as IProperty)}
        })
        updateCats(newCats)
        updateProps(newProps)
    }
    return (<>
    <Header as='h3'> Choose Product Categories <span aria-label='broccoli' role='img'>🥦</span> and Effects <span aria-label='bright' role='img'>🔆</span></Header>
    <Dropdown
        multiple
        search
        selection
        fluid
        options={options}
        placeholder='Choose an option'
        renderLabel={myRenderLabel}
        onChange={(e, d) => handleLabelChanges(e, d)}
    />
    </>)
}

export default EffectFilter