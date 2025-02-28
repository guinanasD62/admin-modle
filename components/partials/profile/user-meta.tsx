"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import Image from "next/image";

interface IUserMetaProps {
  basicinformation?: any;
}

const UserMeta: React.FC<IUserMetaProps> = ({ basicinformation }) => {
  return (
    // <Card>
    //   <CardContent className="p-6 flex flex-col items-center">
    //     <div className="w-[124px] h-[124px] relative rounded-full">
    //       <Image
    //         src={avatar6}
    //         alt="avatar"
    //         className="w-full h-full object-cover rounded-full"
    //         priority={true}
    //       />
    //       <Button
    //         asChild
    //         size="icon"
    //         className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0"
    //       ></Button>
    //       <Input type="file" className="hidden" id="avatar" />
    //     </div>
    //     <div className="mt-4 text-xl font-semibold text-default-900">
    //       {basicinformation?.first_name} {basicinformation?.last_name}
    //     </div>
    //     <div className="mt-1.5 text-sm font-medium text-default-500">
    //       {basicinformation?.email}
    //     </div>
    //   </CardContent>
    // </Card>
    <>
      <Card className="relative w-full h-[450px] mt-6 rounded-xl ">
        <CardContent className="p-4 text-center flex flex-col justify-center">
          <Image
            src={avatar6}
            alt="avatar"
            className="h-20 w-20 lg:w-32 lg:h-32 mx-auto rounded-full"
            priority={true}
          />
          <div className="mt-4">
            <div className="text-xl  font-semibold text-default-800">
              {basicinformation?.first_name} {basicinformation?.last_name}
            </div>
            <div className="text-xs lg:text-sm font-medium text-default-600 pb-1.5">
              {basicinformation?.mobile_number}
            </div>
            <div className="text-xs lg:text-sm font-medium text-default-600 pb-1.5">
              {basicinformation?.email}
            </div>
          </div>
        </CardContent>
        {/* <EditProfile /> */}
      </Card>
    </>
  );
};

export default UserMeta;
