import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    loadRepositories()
  },[])

  async function loadRepositories() {
    await api.get('/repositories').then((response) => {

      setRepositories(response.data)
    })
  } 


  async function handleAddRepository() {
    await api.post('/repositories', {
      title: 'Teste',
      url: 'www.teste.com',
      techs: ["React", "Node.js"]
    }).then((response) => {
      
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

      const repositoryIndex = repositories.findIndex(repo => repo.id === id)
      console.log(repositoryIndex)
      
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
        <li key={repositorie.id}>
          {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
