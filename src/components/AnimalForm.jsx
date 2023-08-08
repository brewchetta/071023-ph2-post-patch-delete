import { useState } from 'react'

function AnimalForm({ addAnimal }) {


    // STATE //

    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [endangered, setEndangered] = useState(false)


    // EVENTS //

    const handleChangeName = (event) => setName(event.target.value)

    const handleChangeSpecies = (event) => setSpecies(event.target.value)

    const toggleEndangered = () => setEndangered(!endangered)

    function handleSubmitAnimal(e) {
        e.preventDefault()

        const OPTIONS = { 
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, species, endangered })
         }

        fetch('http://localhost:3000/animals', OPTIONS)
        .then(res => res.json())
        .then( newAnimal => addAnimal( newAnimal ) )

        resetForm()
    }


    // HELPER FUNCTIONS //

    function resetForm() {
        setName('')
        setSpecies('')
        setEndangered(false)
    }


    // RENDER //

    return (
        <form className="animal-form" onSubmit={ handleSubmitAnimal }>

            <h2>Add New Animal</h2>

            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={ handleChangeName } value={name} />

            <label htmlFor="species">Species:</label>
            <input type="text" name="species" onChange={ handleChangeSpecies } value={species} />

            <label htmlFor="endangered">Endangered?</label>
            <input type="checkbox" onChange={ toggleEndangered } checked={endangered} />

            <input type="submit" value="Register New Animal" />

        </form>
    )

}

export default AnimalForm
