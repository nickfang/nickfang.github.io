interface Route {
  name: string;
  path: string;
}

const routes = {
  'Canvas Creations': `/canvas`,
  Corners: `/styling/corners`,
  'Calculated Background Colors': '/styling/color/calc-color',
  'Toast (Soner)': `/sonner-toast`,
  'Draggable Button': `/input/buttons/draggable`,
  'Nav Bars': `/menu/nav-bar`,
  'Date Range': `/date-range`,
};

const unfinishedRoutes = {
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

export const getUnfinishedroutes = (currentDir: string) => {
  return Object.entries(unfinishedRoutes).map(([name, path]) => ({
    name,
    path: `${currentDir}${path}`,
  }));
};
