import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { closePopup } from "@/service/modal.service";
import DeleteSvg from "@/public/delete-icon.svg";
import Image from "next/image";

type DeleteConfirmationModalProps = {};

// Define the type for the data object
type DeleteConfirmationPayload = {
  uuid: string;
  handleRecordDelete: (uuid: string) => Promise<void>;
};

// Define the type for the modal state from Redux
type ModalState = {
  isOpen: boolean;
  modalName: string;
  modalTitle: string;
  action: string;
  data?: DeleteConfirmationPayload;
};

const DeleteConfirmationModel: React.FC<
  DeleteConfirmationModalProps
> = ({}) => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal as ModalState
  );

  const [isPending, startTransition] = useTransition();

  // Function to handle the deletion confirmation..
  const onConfirmDelete = async () => {
    await data?.handleRecordDelete(data?.uuid);
  };

  const handleConfirm = async () => {
    await onConfirmDelete();
    await closePopup();
  };

  const handleCancel = async () => {
    await closePopup();
  };
  return (
    <>
      {isOpen && action == "delete" && (
        <>
          <div className="modal-overlay flex justify-center text-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-50">
            <div className="modal-content bg-[#fff] p-8 rounded-md w-[400px] shadow-lg">
              <svg
                className="inline-block w-20 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                width="110"
                height="110"
                viewBox="0 0 110 110"
              >
                <g
                  id="Group_5218"
                  data-name="Group 5218"
                  transform="translate(-905 -355)"
                >
                  <circle
                    id="Ellipse_208"
                    data-name="Ellipse 208"
                    cx="55"
                    cy="55"
                    r="55"
                    transform="translate(905 355)"
                    fill="rgba(255,87,87,0.08)"
                  />
                  <circle
                    id="Ellipse_207"
                    data-name="Ellipse 207"
                    cx="46"
                    cy="46"
                    r="46"
                    transform="translate(914 364)"
                    fill="rgba(255,87,87,0.14)"
                  />
                  <circle
                    id="Ellipse_206"
                    data-name="Ellipse 206"
                    cx="37"
                    cy="37"
                    r="37"
                    transform="translate(923 373)"
                    fill="#ff5757"
                  />
                  <path
                    id="Icon_material-delete-outline"
                    data-name="Icon material-delete-outline"
                    d="M9.34,33.937a3.69,3.69,0,0,0,3.68,3.68H27.738a3.69,3.69,0,0,0,3.68-3.68V11.859H9.34Zm3.68-18.4H27.738v18.4H13.019Zm13.8-9.2L24.978,4.5h-9.2l-1.84,1.84H7.5v3.68H33.257V6.34Z"
                    transform="translate(939.621 388.942)"
                    fill="#fff"
                    stroke="#ff5757"
                    stroke-width="0.6"
                  />
                </g>
              </svg>
              <h3 className="mb-4 text-[#132C51] text-lg font-bold">Delete</h3>
              <p>Are you sure you want to delete this record?</p>
              <div className="flex items-center mt-5 gap-5 text-center">
                <button
                  onClick={handleCancel}
                  className="bg-[#fff] text-[#132C51] text-sm py-[7px] px-5 border border-[#000] rounded inline-block w-full"
                >
                  No
                </button>
                <button
                  onClick={() => startTransition(handleConfirm)}
                   className="bg-[#132C51] text-[#fff] text-sm py-[7px] px-5 border border-[#000] rounded inline-block w-full"
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Deleting.." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteConfirmationModel;
