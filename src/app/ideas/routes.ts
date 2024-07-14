interface Route {
  name: string;
  path: string;
}

const routes = {
  'Date Range': `/date-range`,
  Corners: `/styling/corners`,
  'Toast (Soner)': `/sonner-toast`,
  'Draggable Button': `/input/buttons/draggable`,
  'Icon Scroll': `/icon-scroll`,
  Sidebar: `/sidebar`,
  // Inset: `/inset`,
};

export const getRoutes = (currentDir: string) => {
  return Object.entries(routes).map(([name, path]) => ({
    name,
    path: `${currentDir}${path}`,
  }));
};
