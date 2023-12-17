export const URLS = {
  login: "/manager/signin",
  profile: {
    get: "manager/profile"
  },
  dashboard: {
    cards: "/manager/dashboard/checkscount",
    todayAndLastWeek: "/manager/dashboard/tablebusyrate",
    category:
      "manager/report/category?startdate=1691654160988&enddate=1698693743322",
    expense: "/manager/expenses/64e2832772136f0ab1f3d69b",
  },
  products: {
    getAll: "/manager/product",
    setting: (id: string, status: boolean) =>
      `/manager/product/qractivate/${id}/${status}`,
    add: "/manager/product",
    get: (id: string) => `/manager/product/${id}`,
  },
  categories: {
    getAll: "/manager/category",
    add: "/manager/category",
    get: (id: string) => `/manager/category/${id}`,
  },
  allergen: {
    getAll: "/manager/allergen",
  },
  options: {
    getAll: "/manager/options",
    setting: (id: string, status: boolean) =>
      `/manager/options/qractivate/${id}/${status}`,
    add: "/manager/options",
    get: (id: string) => `/manager/options/${id}`,
  },
  section: {
    getAll: "/manager/section",
    add: "/manager/section",
    get: (id: string) => `/manager/section/${id}`,
  },
  users: {
    getAll: "/manager/members",
    add: "/manager/members",
    get: (id: string) => `/manager/members/${id}`,
  },
  cases: {
    getAllByBranchId: (id: string, page = 0, perPage = 10) =>
      `/manager/report/case/${id}?page=${page}&perPage=${perPage}`,
    get: (id: string) => `/manager/case/${id}`,
  },
  integration: {
    add: "/manager/hugin/integration",
  },
};

// export const OPTION_URLS = {
//     getAllOptions: '/manager/options',
//     addOption: '/manager/options',
//     get: (id:string) => `/manager/options/${id}`,
//     deleteOption: (id) => `/manager/options/${id}`,
//   };
