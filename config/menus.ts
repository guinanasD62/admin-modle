import { DashBoard, Settings } from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Settings",
      icon: Settings,
      child: [
        {
          title: "Global Setting",
          href: "/setting/global-setting",
          icon: Settings,
        },
        {
          title: "Manage Shipping",
          href: "/setting/manage-shipping",
          icon: Settings,
        },
        {
          title: "Email Templates",
          href: "/setting/email-template",
        },
        {
          title: "Payment Mode",
          href: "/setting/payment-mode",
          icon: Settings,
        },
      ],
    },
    {
      title: "Masters",
      icon: Settings,
      child: [
        {
          title: "Industry",
          href: "/industry",
          icon: Settings,
        },
        {
          title: "Category",
          href: "/category",
          icon: Settings,
        },
        {
          title: "Brand",
          href: "/brand",
          icon: Settings,
        },
        {
          title: "Attribute",
          href: "/attribute",
          icon: Settings,
        },
        {
          title: "Attribute Value",
          href: "/attribute-value",
          icon: Settings,
        },
        {
          title: "Country",
          href: "/country",
          icon: Settings,
        },
        {
          title: "State",
          href: "/state",
          icon: Settings,
        },
        {
          title: "City",
          href: "/city",
          icon: Settings,
        },
        {
          title: "UOM",
          href: "/uom",
          icon: Settings,
        },
        {
          title: "Tax",
          href: "/tax",
          icon: Settings,
        },
      ],
    },
    {
      title: "Cms",
      icon: Settings,
      child: [
        {
          title: "Cms",
          href: "/cms",
          icon: Settings,
        },
        {
          title: "Social Media",
          href: "/cms/social-media",
          icon: Settings,
        },
        {
          title: "Testimonial",
          href: "/cms/testimonial",
          icon: Settings,
        },
        {
          title: "FAQ",
          href: "/cms/faq",
          icon: Settings,
        },
      ],
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      icon: Settings,
    },
    {
      title: "Users",
      icon: Settings,
      child: [
        {
          title: "Admin",
          href: "/users/admin",
          icon: Settings,
        },
        {
          title: "Seller",
          href: "/users/seller",
          icon: Settings,
        },
        {
          title: "Consumer",
          href: "/users/consumer",
          icon: Settings,
        },
        {
          title: "Financier",
          href: "/users/financier",
          icon: Settings,
        },
      ],
    },
    {
      title: "Orders",
      href: "/order",
      icon: Settings,
    },
    {
      title: "Revenue",
      href: "/revenue",
      icon: Settings,
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        child: [
          {
            title: "Global Setting",
            href: "/setting/global-setting",
            icon: Settings,
          },
          {
            title: "Manage Shipping",
            href: "/setting/manage-shipping",
            icon: Settings,
          },
          {
            title: "Email Templates",
            href: "/setting/email-template",
          },
          {
            title: "Payment Mode",
            href: "/setting/payment-mode",
            icon: Settings,
          },
        ],
      },
      {
        title: "Masters",
        icon: Settings,
        child: [
          {
            title: "Industry",
            href: "/industry",
            icon: Settings,
          },
          {
            title: "Category",
            href: "/category",
            icon: Settings,
          },
          {
            title: "Brand",
            href: "/brand",
            icon: Settings,
          },
          {
            title: "Attribute",
            href: "/attribute",
            icon: Settings,
          },
          {
            title: "Attribute Value",
            href: "/attribute-value",
            icon: Settings,
          },
          {
            title: "Country",
            href: "/country",
            icon: Settings,
          },
          {
            title: "State",
            href: "/state",
            icon: Settings,
          },
          {
            title: "City",
            href: "/city",
            icon: Settings,
          },
          {
            title: "UOM",
            href: "/uom",
            icon: Settings,
          },
          {
            title: "Tax",
            href: "/tax",
            icon: Settings,
          },
        ],
      },
      {
        title: "Cms",
        icon: Settings,
        child: [
          {
            title: "Cms",
            href: "/cms",
            icon: Settings,
          },
          {
            title: "Social Media",
            href: "/cms/social-media",
            icon: Settings,
          },
          {
            title: "Testimonial",
            href: "/cms/testimonial",
            icon: Settings,
          },
          {
            title: "FAQ",
            href: "/cms/faq",
            icon: Settings,
          },
        ],
      },
      {
        title: "Contact Us",
        href: "/contact-us",
        icon: Settings,
      },
      {
        title: "Users",
        icon: Settings,
        child: [
          {
            title: "Admin",
            href: "/users/admin",
            icon: Settings,
          },
          {
            title: "Seller",
            href: "/users/seller",
            icon: Settings,
          },
          {
            title: "Consumer",
            href: "/users/consumer",
            icon: Settings,
          },
          {
            title: "Financier",
            href: "/users/financier",
            icon: Settings,
          },
        ],
      },
      {
        title: "Orders",
        href: "/order",
        icon: Settings,
      },
      {
        title: "Revenue",
        href: "/revenue",
        icon: Settings,
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        child: [
          {
            title: "Global Setting",
            href: "/setting/global-setting",
            icon: Settings,
          },
          {
            title: "Manage Shipping",
            href: "/setting/manage-shipping",
            icon: Settings,
          },
          {
            title: "Email Templates",
            href: "/setting/email-template",
          },
          {
            title: "Payment Mode",
            href: "/setting/payment-mode",
            icon: Settings,
          },
        ],
      },
      {
        title: "Masters",
        icon: Settings,
        child: [
          {
            title: "Industry",
            href: "/industry",
            icon: Settings,
          },
          {
            title: "Category",
            href: "/category",
            icon: Settings,
          },
          {
            title: "Brand",
            href: "/brand",
            icon: Settings,
          },
          {
            title: "Attribute",
            href: "/attribute",
            icon: Settings,
          },
          {
            title: "Attribute Value",
            href: "/attribute-value",
            icon: Settings,
          },
          {
            title: "Country",
            href: "/country",
            icon: Settings,
          },
          {
            title: "State",
            href: "/state",
            icon: Settings,
          },
          {
            title: "City",
            href: "/city",
            icon: Settings,
          },
          {
            title: "UOM",
            href: "/uom",
            icon: Settings,
          },
          {
            title: "Tax",
            href: "/tax",
            icon: Settings,
          },
        ],
      },
      {
        title: "Cms",
        icon: Settings,
        child: [
          {
            title: "Cms",
            href: "/cms",
            icon: Settings,
          },
          {
            title: "Social Media",
            href: "/cms/social-media",
            icon: Settings,
          },
          {
            title: "Testimonial",
            href: "/cms/testimonial",
            icon: Settings,
          },
          {
            title: "FAQ",
            href: "/cms/faq",
            icon: Settings,
          },
        ],
      },
      {
        title: "Contact Us",
        href: "/contact-us",
        icon: Settings,
      },
      {
        title: "Users",
        icon: Settings,
        child: [
          {
            title: "Admin",
            href: "/users/admin",
            icon: Settings,
          },
          {
            title: "Seller",
            href: "/users/seller",
            icon: Settings,
          },
          {
            title: "Consumer",
            href: "/users/consumer",
            icon: Settings,
          },
          {
            title: "Financier",
            href: "/users/financier",
            icon: Settings,
          },
        ],
      },
      // {
      //   title: "Orders",
      //   href: "/order",
      //   icon: Settings,
      // },
      {
        title: "Revenue",
        href: "/revenue",
        icon: Settings,
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
