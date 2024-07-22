interface Route {
  name: string;
  path: string;
}

const routes = {
  Corners: `/styling/corners`,
  'Calculated Background Colors': '/styling/color/calc-color',
  'Toast (Soner)': `/sonner-toast`,
  'Draggable Button': `/input/buttons/draggable`,
  'Nav Bars': `/nav-bar`,
};

const unfinishedRoutes = {
  'Date Range': `/date-range`,
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
