// icon = nama ikon di Icon.jsx. Teks (nama, deskripsi, capabilities) ada di src/i18n/skills.*.js
export const skillGroups = [
  { id: 'web', icon: 'laptop', tech: ['PHP', 'CodeIgniter 4', 'React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'AdminLTE'] },
  { id: 'backend', icon: 'database', tech: ['PHP', 'CodeIgniter 4', 'MySQL', 'PostgreSQL', 'REST API', 'Qdrant'] },
  { id: 'ai', icon: 'brain', tech: ['Python', 'RAG', 'LLM', 'Embeddings', 'Semantic Search', 'Vector Database'] },
  { id: 'android', icon: 'phone', tech: ['Java', 'Android Studio', 'PHP Backend', 'MySQL', 'OSMDroid'] },
  { id: 'tools', icon: 'wrench', tech: ['VS Code', 'Git', 'Postman', 'Docker', 'Linux', 'macOS'] },
]

export const experiments = [
  { id: 'rag', tags: ['RAG', 'Rule-Based'] },
  { id: 'llm', tags: ['GPT-4o', 'Llama 3.2'] },
  { id: 'embed', tags: ['Voyage-3-Large', 'Qdrant'] },
  { id: 'bert', tags: ['BERTScore', 'Semantic Similarity'] },
]