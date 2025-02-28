import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";


interface IProfileTabsProps {
    children: React.ReactNode;
    tabs: { label: string; value: string }[];
}

const ProfileTabs: React.FC<IProfileTabsProps> = ({ children, tabs }) => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?.value || "");

    useEffect(() => {
        // Extract the tab value from the pathname and set the active tab accordingly
        const currentTab = pathname.split("/").pop();
        if (currentTab && tabs.some((tab) => tab.value === currentTab)) {
            setActiveTab(currentTab);
        }
    }, [pathname, tabs]);

    return (
        <Tabs defaultValue={tabs[0].value} value={activeTab} className="p-0 px-1">
            <TabsList className="bg-card flex-1 overflow-x-auto md:overflow-hidden w-full px-5 pt-6 pb-2.5 h-fit border-b border-default-200 rounded-none justify-start gap-12 rounded-t-md">
                {tabs.map((tab: any, index: any) => (
                    <TabsTrigger
                        key={`tab-${index}`}
                        className="capitalize px-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:-bottom-[11px] before:h-[2px] before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full"
                        value={tab?.value}
                    >
                        <Link href={tab?.value}> {tab.label}</Link>
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
                <Card className="rounded-t-none pt-2">
                    <CardContent>{children}</CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default ProfileTabs;
