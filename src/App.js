import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css';

import Header from './components/Header';

/**
 * CONTEITOS FUNDAMENTAIS
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  // useState retorna um array com duas posições
  // 1. Variável com seu valor inicial
  // 2. Função para atualizar esse valor
  
  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Luiz Ferreira"
    })

    const project = response.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="Projects" />
      
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;