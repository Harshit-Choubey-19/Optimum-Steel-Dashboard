import Dashboard from "../scenes/Dashboard"
import Details from "../scenes/Details"
import Products from "../scenes/Products"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import { ShoppingCartOutlined } from "@mui/icons-material"

const appRoutes = [
  
  {
    path: "/dashboard",
    element: < Dashboard/>,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
  },
  {
    path: "/products",
    element: <Products/>,
    state: "products",
    sidebarProps: {
      displayText: "Products",
      icon: <ShoppingCartOutlined/>
    },
  },
  {
    state: "Flat Products",
    sidebarProps: {
      displayText: "Flat Products",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
      
  },
  {
    state: "Long Products",
    sidebarProps: {
      displayText: "Long Products",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
      
  },
  
  {
    state: "Index",
    sidebarProps: {
      displayText: "Index",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ] 
  },
  {
    state: "Semi-Finished",
    sidebarProps: {
      displayText: "Semi-Finished",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
  },
  {
    state: "Pipe",
    sidebarProps: {
      displayText: "Pipe",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
  },
  {
    state: "Structure",
    sidebarProps: {
      displayText: "Structure",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
  },
  {
    state: "Structure",
    sidebarProps: {
      displayText: "Flat Products",
    },
    child: [
      {
        path: "/CRC",
        element: <Details displayText="CRC"/>,
        state: "component.crc",
        sidebarProps: {
          displayText: "CRC"
        }
      },
      {
        path: "/GI Coil",
        element: <Details displayText="GI Coil"/>,
        state: "component.gicoil",
        sidebarProps: {
          displayText: "GI Coil"
        }
      },
      {
        path: "/GP Coil",
        element: <Details displayText="GP Coil" />,
        state: "component.gpcoil",
        sidebarProps: {
          displayText: "GP Coil"
        }
      },
      {
        path: "/HR Plate",
        element: <Details displayText="HR Plate" />,
        state: "component.hrcoil",
        sidebarProps: {
          displayText: "HR Plate"
        }
      },
      {
        path: "/HRC",
        element: <Details displayText="HRC" />,
        state: "component.hrc",
        sidebarProps: {
          displayText: "HRC"
        }
      },
    ]
      
  },
]

export default appRoutes
