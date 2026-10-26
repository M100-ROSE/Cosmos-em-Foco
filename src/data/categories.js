// Categorias editoriais do blog.
// A lista "todas" é sintética; as demais são derivadas dos posts, com contagem real.
import { posts } from './posts.js';

export const CATEGORY_LABELS = {
  galaxias: 'Galáxias',
  'sistema-solar': 'Sistema Solar',
  observacao: 'Observação',
  cosmologia: 'Cosmologia',
  tecnologia: 'Tecnologia',
};

const countByCategory = (id) => posts.filter((post) => post.category === id).length;

export const categories = [
  { id: 'todas', label: 'Todas', count: posts.length },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
    id,
    label,
    count: countByCategory(id),
  })),
];

export default categories;
