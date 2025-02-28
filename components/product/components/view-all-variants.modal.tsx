import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks';
import { closePopup } from '@/service/modal.service';
import toast from 'react-hot-toast';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableCell, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { fetchProductVariant } from '@/service/product.service';
import { getS3BasePath } from '@/config/aws';
import { getInitials } from '@/utils/general';


interface PageProps {
    productUuid: string
}

export const ViewAllVariantsModal: React.FC<PageProps> = ({ productUuid }) => {
    const AWS_URL = getS3BasePath();
    const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
        (state: RootState) => state.modal
    );
    const [isPending, startTransition] = React.useTransition();
    const [variants, setVariants] = useState<any[]>([]);
    useEffect(() => {
        if (action === "view") {
            fetchProductVariantsHandler(productUuid);
        }
    }, [action]);

    //Function to fetch variants
    const fetchProductVariantsHandler = async (uuid: any) => {
        startTransition(async () => {
            try {
                const response = await fetchProductVariant(uuid);
                if (response?.status !== true && response?.statusCode !== 200) {
                    toast.error(response?.message);
                }
                setVariants(response?.data);
            } catch (error: any) {
                toast.error(error?.message);
            }
        })
    };

    //Function to close the model
    const handleModalClose = async () => {
        await closePopup();
    };
    return (
        <Dialog open={modalName === "variant" && isOpen}>
      <DialogContent size="xl" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Variants
          </DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-[20px] w-[20px] animate-spin" />
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="h-[500px]">
              {variants?.length > 0 ? (
                variants?.map((variant: any) => {
                  return (
                    <div className=" shadow-lg m-3">
                      <div className="space-y-3 max-h-[400px]">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white flex flex-col items-center justify-center text-center rounded-lg p-3">
                            <Avatar className="  w-full h-[150px] ">
                              <AvatarImage
                                src={
                                  AWS_URL +
                                  `/products/${variant.user_id}/` +
                                  variant?.image
                                }
                              />
                              <AvatarFallback>
                                {variant?.title
                                  ? getInitials(variant?.title)
                                  : ""}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-2 space-y-2">
                            <div className="bg-white p-3 rounded-lg">
                              <h3 className="text-gray-800 text-[18px] font-bold mt-2 mb-5">
                                {variant?.title}
                              </h3>
                              <hr className="mb-3" />
                              {variant?.attributes?.map(
                                (attribute: any, index: number) => (
                                  <TableRow
                                    key={index}
                                    className="border-none "
                                  >
                                    <TableCell className="text-base p-2 font-medium text-gray-500">
                                      {attribute?.name}
                                    </TableCell>
                                    <TableCell className="p-2 text-base font-semibold text-gray-800 last:text-left">
                                      {attribute?.value}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                              <hr className="mt-3 mb-2" />
                              <TableRow className="border-none">
                                <TableCell className="text-base p-2 font-medium text-gray-500">
                                  Price{" "}
                                </TableCell>
                                <TableCell className="p-2 text-base font-semibold text-gray-800 last:text-left">
                                  ₹ {variant?.price}
                                </TableCell>
                              </TableRow>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-[500px]">
                  <h3 className="text-2xl font-bold">No Variants Available!</h3>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
    )
}
