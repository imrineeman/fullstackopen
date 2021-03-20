import React, { useState } from 'react'
import ListDisplay from './ListDisplay'

const Filter = ({ people, handleDelete }) => {

    const [filter, setFilter] = useState('')

    const handleFilterChange = e => {
        setFilter(e.target.value)
    }

    const filterPeeps =
        people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            search:
            <input
                value={filter}
                onChange={handleFilterChange}
            />
            <ListDisplay
                people={filterPeeps}
                handleDelete={handleDelete}
            />
        </div>
    )

}

export default Filter